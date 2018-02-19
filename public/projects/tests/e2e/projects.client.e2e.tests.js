// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'projects' module E2E test suite
describe('Testes End-2-end no módulo Projects:', function() {
	// Test the new projects page
	describe('Página de novo projeto', function() {
		it('Não deve conseguir criar um novo projeto', function() {
			// Load the new project page
			browser.get('http://localhost:3000/#!/projects/create');

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
