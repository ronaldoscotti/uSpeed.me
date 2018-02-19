// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var users = require('../../app/controllers/users.server.controller'),
    tasks = require('../../app/controllers/tasks.server.controller'),
    projects = require('../../app/controllers/projects.server.controller');

// Uses the Express app.route() method to define the base routes for CRUD operations
module.exports = function(app) {
  app.route('/api/projects')
     .get(projects.list)
     .get(tasks.list)
     .post(users.requiresLogin, projects.create);

  app.route('/api/projects/:projectId')
     .get(projects.read)
     .put(users.requiresLogin, projects.hasAuthorization, projects.update)
     .delete(users.requiresLogin, projects.hasAuthorization, projects.delete);

  app.param('projectId', projects.projectByID);
};
