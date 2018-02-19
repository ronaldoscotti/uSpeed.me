// Invoke 'strict' JavaScript mode
'use strict';

// The controller should be able to provide all the methods needed to perform CRUD operations
angular.module('projects').controller('ProjectsController', ['$scope', '$routeParams', '$location', 'Authentication', 'Projects', 'Tasks',
  function($scope, $routeParams, $location, Authentication, Projects, Tasks) {
    $scope.authentication = Authentication;

    $scope.tasks = Tasks.query();

    // Save the new project document
    $scope.create = function() {
      var project = new Projects({
        title: this.title,
        description: this.description,
        status: this.status,
        deadline: this.deadline
      });
      project.$save(function(response) {
        // If an project was saved successfully, redirect the user to the project's page
        $location.path('projects/' + response._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find all projects
    $scope.find = function() {
      $scope.projects = Projects.query();
    };

    // Find a project by the id
    $scope.findOne = function() {
      $scope.project = Projects.get({
        projectId: $routeParams.projectId
      });
    };

    // Uses the view inputs to update the project
    $scope.update = function() {
      $scope.project.$update(function() {
        // If an project was updated successfully, redirect the user to the project's page
        $location.path('projects/' + $scope.project._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Create a new controller method for deleting a single project
    $scope.delete = function(project) {
      // If an project was sent to the method, delete it
      if (project) {
        project.$remove(function() {
          // Remove the project from the projects list
          for (var i in $scope.projects) {
            if ($scope.projects[i] === projects) {
              $scope.projects.splice(i, 1);
            }
          }
        });
      // Otherwise, use the project '$remove' method to delete the project
      } else {
        $scope.project.$remove(function() {
          $location.path('projects');
        });
      }
    };

  }
]);
