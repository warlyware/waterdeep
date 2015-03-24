waterApp.controller('MembersController', function($scope, $state, $stateParams, $rootScope, $timeout, $firebase, $firebaseSimpleLogin, FIREBASE_URL) {
	
	var usersRef = new Firebase(FIREBASE_URL + '/users'); 

	var usersInfo = $firebase(usersRef); 
	var usersObj = $firebase(usersRef).$asObject(); //create userObj object
	var usersArray = $firebase(usersRef).$asArray(); //create userObj object


	usersObj.$loaded().then(function() {
		$scope.users = usersObj;
	});

			usersArray.$loaded().then(function(data) {
				$rootScope.howManyMembers = usersArray.length; // load array into rootscope
			}); //properties array loaded

			usersArray.$watch(function(event) { // watch array for changes
				$rootScope.howManyMembers = usersArray.length; // update prop number
			}); // prop number update


});