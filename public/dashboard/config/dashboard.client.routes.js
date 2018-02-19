// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'example' module routes
angular.module('dashboard').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'dashboard/views/dashboard.client.view.html'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]);
