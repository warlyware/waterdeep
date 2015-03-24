waterApp.controller('PropStatsController', function($scope, $rootScope, $firebase, $location, $firebaseSimpleLogin, $state, $stateParams, FIREBASE_URL) {


	var ref = new Firebase(FIREBASE_URL); // base url
	var simpleLogin = $firebaseSimpleLogin(ref); // run simpleLogin on url 

	$scope.whichproperty = $stateParams.pId;
	$scope.whichowner = $stateParams.cId;	
	$scope.whichuser = $stateParams.uId;

	simpleLogin.$getCurrentUser().then(function(authUser) { // get current user then...
		if (authUser !== null) { // if passed in authUser exists then...
			$rootScope.currentUser = authUser;

			var propRef = new Firebase(FIREBASE_URL + '/users/' + $scope.whichuser + '/properties/' + $scope.whichowner + '/' + $scope.whichproperty + '/'); // new ref for userID + properties
			var propInfo = $firebase(propRef);
			var propObj = $firebase(propRef).$asObject();

			var packTypeRef = new Firebase(FIREBASE_URL + '/packtypes');
			var packTypeInfo =  $firebase(packTypeRef);
			var packTypeArray = $firebase(packTypeRef).$asArray();
			var packTypeObj = $firebase(packTypeRef).$asObject();

			// var counterRef = new Firebase(FIREBASE_URL + '/packscounter/');
			// var counterInfo = $firebase(counterRef);
			// var counterObj = $firebase(counterRef).$asObject();



			propObj.$loaded().then(function() {
				$scope.property = propObj; 
				console.log($scope.property);

				var packRef = new Firebase(FIREBASE_URL + '/users/' + $scope.whichuser + '/properties/' + $scope.whichowner + '/' + $scope.whichproperty + '/packs/');
				var packInfo = $firebase(packRef);
				var packArray = $firebase(packRef).$asArray();
				var packObj = $firebase(packRef).$asObject();

				var packBaseRef = new Firebase(FIREBASE_URL + '/packscounter/');
				var packBaseInfo = $firebase(packBaseRef);
				var packBaseObj = $firebase(packBaseRef).$asObject();

				packArray.$loaded().then(function(data) {
					$scope.packs = packArray;
				}); //properties array loaded


				packObj.$loaded().then(function() {
					$scope.packsObj = packObj; 
				});

				// var counter
				// if (packBaseObj.counter) {
				// 	counter = packBaseObj.counter;
				// 	console.log(counter);
				// } else {
				// 	counter = 0;
				// 	packBaseObj.counter = counter;
				// }

				$scope.addPack = function() {
					var packtimermoment = moment().add(6, 'days');
					var packtimer = packtimermoment.toISOString();

					var ref = new Firebase(FIREBASE_URL + '/users/' + $scope.whichuser + '/properties/' + $scope.whichowner + '/' + $scope.whichproperty + '/packs/' + $scope.packtype + '/');
					var saveInfo = $firebase(ref);

					var newData = {
						property: $scope.whichproperty,
						owner: $scope.property.propowner,
						location: $scope.property.proplocation,
						packtype: $scope.packtype,
						packtimer: packtimer,
						created: Firebase.ServerValue.TIMESTAMP	
					}
					saveInfo.$push(newData).then(function(){
						var howmanypacks = $scope.property.howmanypacks;
						console.log($scope.property);
						howmanypacks = howmanypacks + 1;

						propInfo.$update({ howmanypacks: howmanypacks });
//						counter = counter + 1;
//						packBaseInfo.$update({ counter: counter });
					});
				}


				$scope.deletePack = function(key, packtype) {

					console.log(packtype); 

					var ref = new Firebase(FIREBASE_URL + '/users/' + $scope.whichuser + '/properties/' + $scope.whichowner + '/' + $scope.whichproperty + '/packs/' + packtype + '/');
					var saveInfo = $firebase(ref);

					console.log(key);					
					saveInfo.$remove(key).then(function() {
						var howmanypacks = $scope.property.howmanypacks;
						console.log($scope.property);
						howmanypacks = howmanypacks - 1;
						propInfo.$update({ howmanypacks: howmanypacks });
					}); // remove key of base property item clicked on, deleteing obj from db
				}



			});


			packTypeObj.$loaded().then(function() {
				$scope.packtypes = packTypeObj; 
			});







		}	
	});


});  // PropStatsController