// Invoke 'strict' JavaScript mode
'use strict';

// Load the test dependencies
var app = require('../../server'),
request = require('supertest'),
should = require('should'),
mongoose = require('mongoose'),
User = mongoose.model('User'),
Project = mongoose.model('Project');

// Define global test variables
var user, project;

describe('Projects Controller Unit Tests:', function() {
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

      project.save(function(err) {
        done();
      });
    });
  });

	// Test the 'Project' GET methods
  describe('Testing the GET methods', function() {
    it('Should be able to get the list of projects', function(done){
      // Create a SuperTest request
      request(app).get('/api/projects/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
          res.body.should.be.an.Array.and.have.lengthOf(1);
          res.body[0].should.have.property('title', project.title);
          res.body[0].should.have.property('description', project.description);

          done();
      });
    });

    it('Should be able to get the specific project', function(done) {
      // Create a SuperTest request
      request(app).get('/api/projects/' + project.id)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        res.body.should.be.an.Object.and.have.property('title', project.title);
        res.body.should.have.property('description', project.description);

        done();
      });
    });
  });

  // Define a post-tests function
  afterEach(function(done) {
    // Clean the database
    Project.remove().exec();
    User.remove().exec();
    done();
  });
});
