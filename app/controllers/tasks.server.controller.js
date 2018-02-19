// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
    Task = mongoose.model('Task');

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

// The create method is used to add a new task
exports.create = function(req, res) {
  var task = new Task(req.body);
  task.creator = req.user;

  console.log(task);

  task.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(task);
    }
  });
};

// The list method is used to query all the tasks
exports.list = function(req, res) {
  Task.find().sort('+deadline')
      .populate('creator', 'firstName lastName fullName')
      .populate('project', 'title')
      .populate('designated', 'firstName lastName fullName')
      .exec(function(err, tasks) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(tasks);
    }
  });
};

// Find a specific task using the id
exports.taskByID = function(req, res, next, id) {
  Task.findById(id)
      .populate('creator', 'firstName lastName fullName')
      .exec(function(err, task) {
    if (err) return next(err);
    if (!task) return next(new Error('Não foi possível carregar a tarefa ' + id));
    req.task = task;
    task.deadline = new Date(task.deadline);
    next();
  });
};

// Get one task
exports.read = function(req, res) {
  res.json(req.task);
};

// The update method is used to update the info's about one task
exports.update = function(req, res) {
  var task = req.task;
  task.title = req.body.title;
  task.description = req.body.description;
  task.deadline = req.body.deadline;
  task.designated = req.body.designated;
  task.project = req.body.project;
  task.status = req.body.status;
  task.being = req.body.being;
  task.iCan = req.body.iCan;
  task.soThat = req.body.soThat;

  task.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(task);
    }
  });
};

// Remove a specific task
exports.delete = function(req, res) {
  var task = req.task;
  task.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(task);
      console.log('Tarefa ' + task._id + ' apagada.');
    }
  });
};

// This method validate whether the current task is being edited by its creator
exports.hasAuthorization = function(req, res, next) {
  if (req.task.creator.id !== req.user.id) {
    return res.status(403).send({
      message: 'Você não tem autorização para fazer isso'
    });
  }
  next();
};
