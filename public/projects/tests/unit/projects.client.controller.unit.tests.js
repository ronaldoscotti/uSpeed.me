// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'projects' module unit test suite
describe('Testando o controller dos Projetos', function() {
	// Define global variables
	var _scope, ProjectsController;

	// Define a pre-tests function
	beforeEach(function() {
		// Load the 'uspeedme' module
		module('uspeedme');

		// Add a new Jasmine matcher
		jasmine.addMatchers({
			toEqualData: function(util, customEqualityTesters) {
				return {
					compare: function(actual, expected) {
						return {
							pass: angular.equals(actual, expected)
						};
					}
				};
			}
		});

		// Use the 'inject' method to inject services
		inject(function($rootScope, $controller) {
			// Create a mock scope object
			_scope = $rootScope.$new();

			// Create a new mock controller
			ProjectsController = $controller('ProjectsController', {
				$scope: _scope
			});
		});
	});

	// Test the 'find' method
	it('Deve haver um método find que usa o $resource para retornar uma lista de projetos', inject(function(Projects) {
		// Use the 'inject' method to inject services
		inject(function($httpBackend) {
			// Create a sample projects
			var sampleProject = new Projects({
				title: 'An project about MEAN',
				description: 'MEAN rocks!'
			});

			// Create a sample projects list
			var sampleProjects = [sampleProject];

			// Define a request assertion
			$httpBackend.expectGET('api/projects').respond(sampleProjects);

			// Call the controller's 'find' method
			_scope.find();

			// Flush the mock HTTP results
			$httpBackend.flush();

			// Test the results
			expect(_scope.projects).toEqualData(sampleProjects);
		});
	}));

	// Test the 'findOne' method
	it('Deve haver um método findOne que usa o $resource para retornar um único projeto', inject(function(Projects) {
		// Use the 'inject' method to inject services
		inject(function($httpBackend, $routeParams) {
			// Create a sample project
			var sampleProject = new Projects({
				title: 'An Project about MEAN',
				description: 'MEAN rocks!'
			});

			// Set the 'projectId' route parameter
			$routeParams.projectId = 'abcdef123456789012345678';

			// Define a request assertion
			$httpBackend.expectGET(/api\/projects\/([0-9a-fA-F]{24})$/).respond(sampleProject);

			// Call the controller's 'findOne' method
			_scope.findOne();

			// Flush the mock HTTP results
			$httpBackend.flush();

			// Test the results
			expect(_scope.project).toEqualData(sampleProject);
		});
	}));
});
