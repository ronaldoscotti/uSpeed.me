// Invoke 'strict' JavaScript mode
'use strict';

angular.module('users').factory('Users', ['$resource', function($resource) {
  return $resource('api/users/:userId', {
    userId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
}]);

// Create the 'Authentication' service
angular.module('users').factory('Authentication', [
	function() {
		// Use the rendered user object
		this.user = window.user;

		// Return the authenticated user data
		return {
			user: this.user
		};
	}
]);
