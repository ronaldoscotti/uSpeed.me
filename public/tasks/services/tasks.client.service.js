// Invoke 'strict' JavaScript mode
'use strict';

// This service provides everything needed to communicate with the server endpoints
angular.module('tasks').factory('Tasks', ['$resource', function($resource) {
  return $resource('api/tasks/:taskId', {
    taskId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
}]);
