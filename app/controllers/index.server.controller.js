// Invoke 'strict' JavaScript mode
'use strict';

// Create a new 'render' controller method
exports.render = function(req, res) {
	// Check if a user is logged in
	if (req.user) {
		// Use the 'response' object to render the 'index' view with a 'title' and a stringified 'user' properties
		res.render('index', {
			title: 'Dashboard',
			user: JSON.stringify(req.user)
		});
	} else {
		res.render('signin', {
			// Set the page title variable
			title: 'Login',
			headerText: 'Bem vindo de volta!',
			// Set the flash message variable
			messages: req.flash('error') || req.flash('info')
		});
	}
};
