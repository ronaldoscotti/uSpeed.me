// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var users = require('../../app/controllers/users.server.controller'),
    tasks = require('../../app/controllers/tasks.server.controller'),
    users = require('../../app/controllers/users.server.controller'),
    projects = require('../../app/controllers/projects.server.controller');

// Uses the Express app.route() method to define the base routes for CRUD operations
module.exports = function(app) {
   app.route('/api/tasks')
      .get(tasks.list)
      .post(users.requiresLogin, tasks.create);

   app.route('/api/tasks/:taskId')
      .get(tasks.read)
      .put(users.requiresLogin, tasks.update)
      .delete(users.requiresLogin, tasks.hasAuthorization, tasks.delete);

   app.param('taskId', tasks.taskByID);
};
