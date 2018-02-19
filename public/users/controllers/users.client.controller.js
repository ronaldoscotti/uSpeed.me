// Invoke 'strict' JavaScript mode
'use strict';

// The controller should be able to provide all the methods needed to perform CRUD operations
angular.module('users').controller('UsersController', ['$scope', '$routeParams', '$location', 'Authentication', 'Users',
  function($scope, $routeParams, $location, Authentication, Users) {
    $scope.authentication = Authentication;

    // Find all users
    $scope.find = function() {
      $scope.users = Users.query();
    };

    // Find a user by the id
    $scope.findOne = function() {
      $scope.user = Users.get({
        userId: $routeParams.userId
      });
    };

    // Uses the view inputs to update the user
    $scope.update = function() {
      $scope.user.$update(function() {
        // If an user was updated successfully, redirect the user to the user's page
        $location.path('users/' + $scope.user._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Create a new controller method for deleting a single user
    $scope.delete = function(user) {
      // If an user was sent to the method, delete it
      if (user) {
        user.$remove(function() {
          // Remove the user from the users list
          for (var i in $scope.users) {
            if ($scope.users[i] === users) {
              $scope.users.splice(i, 1);
            }
          }
        });
      // Otherwise, use the user '$remove' method to delete the user
      } else {
        $scope.user.$remove(function() {
          $location.path('users');
        });
      }
    };


  }
]);
