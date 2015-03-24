waterApp.controller('CharStatsController', function($location, $scope, $state, $stateParams, $rootScope, $timeout, $firebase, $firebaseSimpleLogin, FIREBASE_URL) {
	
	$scope.whichuser = $stateParams.uId; // add whichuser to scope
	$scope.whichchar = $stateParams.cId // add whichchar

	var userRef = new Firebase(FIREBASE_URL + '/users/' + $scope.whichuser); 
	var charBaseRef = new Firebase(FIREBASE_URL + '/users/' + $scope.whichuser + '/characters/');
	var charRef = new Firebase(FIREBASE_URL + '/users/' + $scope.whichuser + '/characters/' + $scope.whichchar);
	var profRef = new Firebase(FIREBASE_URL + '/users/' + $scope.whichuser + '/characters/' + $scope.whichchar + '/prof');


	var profInfo = $firebase(profRef);
	var profArray = $firebase(profRef).$asArray();
	var profObj = $firebase(profRef).$asObject();

	var userObj = $firebase(userRef).$asObject(); //create userObj object

	var charInfo = $firebase(charRef);
	var charBaseInfo = $firebase(charBaseRef);
	var charArray = $firebase(charRef).$asArray();
	var charObj = $firebase(charRef).$asObject();


	userObj.$loaded().then(function() {
		$rootScope.currentUser = userObj; // add currentUser to rootScope
	});


	charObj.$loaded().then(function() {
		$scope.character = charObj;
	});

	profObj.$loaded().then(function() {
		$scope.profs = profObj;
		console.log($scope.profs);
	});


	$scope.addProf = function() {
		if ($scope.profname && $scope.proflvl) {
			profInfo.$set( $scope.profname , $scope.proflvl ).then(function() {
				$scope.profname = '';
				$scope.proflvl = '';
				$scope.charlvl = '';
			});
		}
		if ($scope.charlvl) {
			charInfo.$update( {charlvl: $scope.charlvl} ).then(function() {
				$scope.profname = '';
				$scope.proflvl = '';
				$scope.charlvl = '';
			});

		}

		// angular.forEach($scope.profs, function(key,val) {
		// 	console.log(key + ' ' + val);
		// });
	}

	$scope.deleteProf = function(key) { 
		profInfo.$remove(key);
	}

	$scope.deleteCharacter = function(data) { 
		var r = confirm('are you sure you want to delete this character?');
		if (r == true) {

			charBaseInfo.$remove(data).then(function() {
				$location.path('/users/' + $scope.whichuser);
			}); 
		}
	}	

});