waterApp.controller('AuctionController', function($scope, $state, $stateParams, $rootScope, $timeout, $firebase, $firebaseSimpleLogin, FIREBASE_URL) {
	
	var usersRef = new Firebase(FIREBASE_URL + '/users/'); 
	var usersInfo = $firebase(usersRef); 
	var usersObj = $firebase(usersRef).$asObject(); //create userObj object
	var usersArray = $firebase(usersRef).$asArray(); //create userObj array


	var auctionRef = new Firebase(FIREBASE_URL + '/auction/'); 
	var auctionInfo = $firebase(auctionRef); 
	var auctionObj = $firebase(auctionRef).$asObject(); //create object
	var auctionArray = $firebase(auctionRef).$asArray(); //create array


	var auctionTypeRef = new Firebase(FIREBASE_URL + '/auction/type/'); 
	var auctionTypeInfo = $firebase(auctionTypeRef); 
	var auctionTypeObj = $firebase(auctionTypeRef).$asObject(); //create object
	var auctionTypeArray = $firebase(auctionTypeRef).$asArray(); //create array


	var counterRef = new Firebase(FIREBASE_URL + '/packscounter/');
	var counterInfo = $firebase(counterRef);
	var counterObj = $firebase(counterRef).$asObject();

	usersObj.$loaded().then(function() {
		$scope.users = usersObj;
	});

	auctionArray.$loaded().then(function(data) {
		$scope.auctions = auctionArray;
	});

	auctionObj.$loaded().then(function() {
		$rootScope.auctionObj = auctionObj;

		$scope.addAuction = function() { // add addPackType() to scope
			if ($scope.itemvalueg == null) {
				$scope.itemvalueg = 0;
			}
			if ($scope.itemvalues == null) {
				$scope.itemvalues = 0;
			}
			if ($scope.itemvalueb == null) {
				$scope.itemvalueb = 0;	
			}
			var gold =  $scope.itemvalueg * 1000;
			var silver = $scope.itemvalues * 100;
			var bronze = $scope.itemvalueb;						
			var itemvalue = gold + silver + bronze;
			console.log(itemvalue);
			var formattedvalue = $scope.itemvalueg + 'g ' + $scope.itemvalues + 's ' + $scope.itemvalueb + 'b ';

			if ($scope.itemtype!=='custom') {
				var ref = new Firebase(FIREBASE_URL + '/auction/' + $scope.itemtype); 
				var saveInfo = $firebase(ref);
				saveInfo.$push({ 
					itemvalue: itemvalue,
					itemvalueg: $scope.itemvalueg,
					itemvalues: $scope.itemvalues,
					itemvalueb: $scope.itemvalueb,
					formattedvalue: formattedvalue,					
					created: Firebase.ServerValue.TIMESTAMP
				}).then(function() {
					$scope.itemtype = '';
					$scope.itemtypeadd = '';
					$scope.itemvalueg = '';
					$scope.itemvalues = '';
					$scope.itemvalueb = '';
				});
			} else {
				var ref = new Firebase(FIREBASE_URL + '/auction/' + $scope.itemtypeadd); 
				var saveInfo = $firebase(ref);
				saveInfo.$push({ 
					itemvalue: itemvalue,
					formattedvalue: formattedvalue,
					itemvalueg: $scope.itemvalueg,
					itemvalues: $scope.itemvalues,
					itemvalueb: $scope.itemvalueb,
					created: Firebase.ServerValue.TIMESTAMP
				}).then(function() {
					$scope.itemtype = '';
					$scope.itemtypeadd = '';
					$scope.itemvalueg = '';
					$scope.itemvalues = '';
					$scope.itemvalueb = '';
				});				
			}
	
		}// add auction


		$scope.deleteAuction = function(key,val) { // add deleteProperty to scope
			var r = confirm('are you sure you want to delete this auction?');
			if (r == true) {
				var ref =  new Firebase(FIREBASE_URL + '/auction/' + val.$id + '/');
				var refInfo = $firebase(ref); 
				console.log(key + " " + val.$id);
				refInfo.$remove(key);
			}
		}
	});



});