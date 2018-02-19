// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'tasks' module E2E test suite
describe('Testes End-2-end no módulo Tasks:', function() {
	// Test the new tasks page
	describe('Página de nova tarefa', function() {
		it('Não deve conseguir criar um novo tarefa', function() {
			// Load the new task page
			browser.get('http://localhost:3000/#!/tasks/create');

			// Get the submit button
			element(by.css('button[type=submit]')).click();

			// Get the error message element
			element(by.binding('error')).getText().then(function(errorText) {
				// Check the error message text
				expect(errorText).toBe('O usuário não fez login');
			});
		});
	});
});
