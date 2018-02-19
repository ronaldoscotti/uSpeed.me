// Invoke 'strict' JavaScript mode
'use strict';

// This service provides everything needed to communicate with the server endpoints
angular.module('projects').factory('Projects', ['$resource', function($resource) {
  return $resource('api/projects/:projectId', {
    projectId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
}]);
