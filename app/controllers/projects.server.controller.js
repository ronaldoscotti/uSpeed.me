// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
    Project = mongoose.model('Project');

// Create a new error handling controller method
var getErrorMessage = function(err) {
  if (err.errors) {
    for (var errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return 'Erro desconhecido no servidor';
  }
};

// The create method is used to add a new project
exports.create = function(req, res) {
  var project = new Project(req.body);
  project.creator = req.user;

  project.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(project);
    }
  });
};

// The list method is used to query all the projects
exports.list = function(req, res) {
  Project.find().sort('-created').populate('creator', 'firstName lastName fullName').exec(function(err, projects) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(projects);
    }
  });
};

// Find a specific project using the id
exports.projectByID = function(req, res, next, id) {
  Project.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, project) {
    if (err) return next(err);
    if (!project) return next(new Error('Não foi possível carregar o projeto ' + id));

    req.project = project;
    next();
  });
};

// Get one project
exports.read = function(req, res) {
  res.json(req.project);
};

// The update method is used to update the info's about one project
exports.update = function(req, res) {
  var project = req.project;
  project.title = req.body.title;
  project.description = req.body.description;
  project.status = req.body.status;
  project.deadline = req.body.deadline;
  project.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(project);
    }
  });
};

// Remove a specific project
exports.delete = function(req, res) {
  var project = req.project;
  project.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(project);
    }
  });
};

// This method validate whether the current project is being edited by its creator
exports.hasAuthorization = function(req, res, next) {
  if (req.project.creator.id !== req.user.id) {
    return res.status(403).send({
      message: 'Você não tem autorização para fazer isso'
    });
  }
  next();
};
