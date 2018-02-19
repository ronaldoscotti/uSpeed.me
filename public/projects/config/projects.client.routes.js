// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'projects' module routes
angular.module('projects').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/projects', {
      templateUrl: 'projects/views/list-projects.client.view.html'
    }).
    when('/projects/create', {
      templateUrl: 'projects/views/create-project.client.view.html'
    }).
    when('/projects/:projectId', {
      templateUrl: 'projects/views/view-project.client.view.html'
    }).
    when('/projects/:projectId/edit', {
      templateUrl: 'projects/views/edit-project.client.view.html'
    });
  }
]);
