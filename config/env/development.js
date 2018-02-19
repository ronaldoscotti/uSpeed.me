// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'development' environment configuration object
module.exports = {
	db: 'mongodb://localhost/uspeedme',
	sessionSecret: 'developmentSessionSecret',
	facebook: {
		clientID: '550053705150118',
		clientSecret: 'd041e43a77c7cf0ec4277dab06119bb9',
		callbackURL: 'http://localhost:3000/oauth/facebook/callback'
	},
	twitter: {
		clientID: 'Twitter Application ID',
		clientSecret: 'Twitter Application Secret',
		callbackURL: 'http://localhost:3000/oauth/twitter/callback'
	},
	google: {
		clientID: 'Google Application ID',
		clientSecret: 'Google Application Secret',
		callbackURL: 'http://localhost:3000/oauth/google/callback'
	}
};
