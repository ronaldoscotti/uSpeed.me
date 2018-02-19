// Invoke 'strict' JavaScript mode
'use strict';

// Load the test dependencies
var app = require('../../server.js'),
should = require('should'),
mongoose = require('mongoose'),
User = mongoose.model('User'),
Project = mongoose.model('Project');

// Define global test variables
var user, project;

describe('Project Model Unit Tests:', function() {
  // Define a pre-tests function
  beforeEach(function(done) {
    // Create a new 'User' model instance
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    // Save the new 'User' model instance
    user.save(function() {
      project = new Project({
        title: 'Project Title',
        description: 'Project Content',
        user: user
      });
      done();
    });
  });

	// Test the 'Project' model save method
  describe('Testing the save method', function() {
    it('Should be able to save without problems', function() {
      project.save(function(err) {
        should.not.exist(err);
      });
    });

    it('Should not be able to save an project without a title', function() {
      project.title = '';
      project.save(function(err) {
        should.exist(err);
      });
    });
  });

  // Define a post-tests function
  afterEach(function(done) {
    // Clean the database
    Project.remove(function() {
      User.remove(function() {
        done();
      });
    });
  });

});
