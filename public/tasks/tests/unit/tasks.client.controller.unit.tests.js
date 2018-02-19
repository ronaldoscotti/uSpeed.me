// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'tasks' module unit test suite
describe('Testando o controller dos Projetos', function() {
	// Define global variables
	var _scope, TasksController;

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
			TasksController = $controller('TasksController', {
				$scope: _scope
			});
		});
	});

	// Test the 'find' method
	it('Deve haver um método find que usa o $resource para retornar uma lista de tarefas', inject(function(Tasks) {
		// Use the 'inject' method to inject services
		inject(function($httpBackend) {
			// Create a sample tasks
			var sampleTask = new Tasks({
				title: 'An task about MEAN',
				description: 'MEAN rocks!'
			});

			// Create a sample tasks list
			var sampleTasks = [sampleTask];

			// Define a request assertion
			$httpBackend.expectGET('api/tasks').respond(sampleTasks);

			// Call the controller's 'find' method
			_scope.find();

			// Flush the mock HTTP results
			$httpBackend.flush();

			// Test the results
			expect(_scope.tasks).toEqualData(sampleTasks);
		});
	}));

	// Test the 'findOne' method
	it('Deve haver um método findOne que usa o $resource para retornar um único tarefa', inject(function(Tasks) {
		// Use the 'inject' method to inject services
		inject(function($httpBackend, $routeParams) {
			// Create a sample task
			var sampleTask = new Tasks({
				title: 'An Task about MEAN',
				description: 'MEAN rocks!'
			});

			// Set the 'taskId' route parameter
			$routeParams.taskId = 'abcdef123456789012345678';

			// Define a request assertion
			$httpBackend.expectGET(/api\/tasks\/([0-9a-fA-F]{24})$/).respond(sampleTask);

			// Call the controller's 'findOne' method
			_scope.findOne();

			// Flush the mock HTTP results
			$httpBackend.flush();

			// Test the results
			expect(_scope.task).toEqualData(sampleTask);
		});
	}));
});
