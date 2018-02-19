// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var	config = require('./config'),
	mongoose = require('mongoose');

// Define the Mongoose configuration method
module.exports = function() {
	// Use Mongoose to connect to MongoDB
	var db = mongoose.connect(config.db);

	// Load the 'User' model
	require('../app/models/user.server.model');
	// Load the 'Project' model
	require('../app/models/project.server.model');
	// Load the 'Task' model
	require('../app/models/task.server.model');

	// Return the Mongoose connection instance
	return db;
};
