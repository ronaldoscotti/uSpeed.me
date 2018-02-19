// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'example' controller
angular.module('dashboard').controller('DashboardController', ['$scope', 'Authentication', 'Projects', 'Users', 'Tasks',
function($scope, Authentication, Projects, Users, Tasks) {

	// Get the user's info
	$scope.authentication = Authentication;

	var myId = $scope.authentication.user._id;

	$scope.usersLength = 0;

	$scope.projects = Projects.query().$promise.then(function(res){
		var projectLength = res.length;
		$scope.projectsLength = projectLength;
	}, function(err){});

	$scope.users = Users.query().$promise.then(function(res){
		var userLength = res.length;
		$scope.usersLength = userLength;
	}, function(err){});

	$scope.tasks = Tasks.query().$promise.then(function(res) {
		var allToDo = 0,
			 allDoing = 0,
			 allDone = 0,
			 allCanceled = 0,
			 myToDo = 0,
			 myDoing = 0,
			 myDone = 0,
			 myCanceled = 0;

		angular.forEach(res.$promise.$$state.value, function(value, key) {

			if (value.designated._id == myId && value.status == "Feito") {
				myDone++;
			} else if (value.designated._id == myId && value.status == "Por fazer") {
				myToDo++;
			} else if (value.designated._id == myId && value.status == "Fazendo") {
				myDoing++;
			} else if (value.designated._id == myId && value.status == "Cancelado") {
			  myCanceled++;
		  }
		});

		angular.forEach(res.$promise.$$state.value, function(value, key) {
			if (value.status == "Feito") {
				allDone++;
			} else if (value.status == "Por fazer") {
				allToDo++;
			} else if (value.status == "Fazendo") {
				allDoing++;
			} else if (value.status == "Cancelado") {
			  allCanceled++;
		  }
		});

		$scope.taskLabels = ["Por fazer", "Fazendo", "Feito", "Cancelado"];
		$scope.tasksData = [allToDo, allDoing, allDone, allCanceled];
		$scope.tasksColors = ['#F4B350', '#5C97BF', '#87D37C', '#D91E18'];

		$scope.myTasksLabels = ["Por fazer", "Fazendo", "Feito", "Cancelado"];
		$scope.myTasksData = [[myToDo, myDoing, myDone, myCanceled],[allToDo, allDoing, allDone, allCanceled]];
		$scope.myTasksSeries = ['Minhas', 'Total'];

		var taskLength = res.length;
		$scope.tasksLength = taskLength;
	}, function(err){});




	function getNumOfTasks(tasks) {
		var numberOfTasks = 0;
		angular.forEach(tasks, function(value, key) {
			numberOfTasks++;
		});
		console.log(numberOfTasks);
		return numberOfTasks;
	};

}
]);
