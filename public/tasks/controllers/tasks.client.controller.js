// Invoke 'strict' JavaScript mode
'use strict';

// The controller should be able to provide all the methods needed to perform CRUD operations
angular.module('tasks').controller('TasksController', ['$scope', '$routeParams', '$location', 'Authentication', 'Tasks', 'Projects', 'Users', 'moment',
function($scope, $routeParams, $location, Authentication, Tasks, Projects, Users, moment) {
   $scope.authentication = Authentication;
   $scope.projects = Projects.query();
   $scope.users = Users.query();
   $scope.tasks = Tasks.query();
   $scope.kanban = false;
   $scope.list = true;

   // Save the new task document
   $scope.create = function() {

      var dataDeEntrega = this.deadline;
      
      console.log(dataDeEntrega);

      var task = new Tasks({
         title: this.title,
         description: this.description,
         deadline: this.deadline,
         designated: this.designated,
         project: this.project,
         status: this.status,
         being: this.being,
         iCan: this.iCan,
         soThat: this.soThat
      });
      task.$save(function(response) {
         // If an task was saved successfully, redirect the user to the task's page
         $location.path('tasks/' + response._id);
      }, function(errorResponse) {
         $scope.error = errorResponse.data.message;
      });
   };

   // Find all tasks
   $scope.find = function() {
      $scope.tasks = Tasks.query();
   };

   // Find a task by the id
   $scope.findOne = function() {
      $scope.task = Tasks.get({
         taskId: $routeParams.taskId
      });
   };

   // Uses the view inputs to update the task
   $scope.update = function() {
      $scope.task.$update(function() {
         // If an task was updated successfully, redirect the user to the task's page
         $location.path('tasks/' + $scope.task._id);
      }, function(errorResponse) {
         $scope.error = errorResponse.data.message;
      });
   };

   // Create a new controller method for deleting a single task
   $scope.delete = function(task) {
      // If an task was sent to the method, delete it
      if (task) {
         task.$remove(function() {
            // Remove the task from the tasks list
            for (var i in $scope.tasks) {
               if ($scope.tasks[i] === tasks) {
                  $scope.tasks.splice(i, 1);
               }
            }
         });
         // Otherwise, use the task '$remove' method to delete the task
      } else {
         $scope.task.$remove(function() {
            $location.path('tasks');
         });
      }
   };

   $scope.orderingBy = function (field) {
      $scope.sortingRule = field;
      $scope.sortingDirection = !$scope.sortingDirection;
   };

   $scope.showKanban = function () {
      $scope.kanban = !$scope.kanban;
      console.log($scope.kanban);
   }

   $scope.showList = function () {
      $scope.list = !$scope.list;
      console.log($scope.list);
   }


}
]);
