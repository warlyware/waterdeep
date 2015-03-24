waterApp.controller('StatusController', function($scope, $rootScope, $firebaseSimpleLogin, $location, $firebase, FIREBASE_URL, Authentication) {




	$scope.logout = function() {
		Authentication.logout();
		$location.path('/login');
	}


	$rootScope.$on('$firebaseSimpleLogin:login', function(e, authUser) {


		var userRef = new Firebase(FIREBASE_URL + '/users/' + authUser.uid);
		var user = $firebase(userRef).$asObject();

		var bankRef = new Firebase(FIREBASE_URL + '/guildbank/');
		var bankAmtObj = $firebase(bankRef).$asObject();

		var usersRef = new Firebase(FIREBASE_URL + '/users'); 
		var usersArray = $firebase(usersRef).$asArray();

		var packRef = new Firebase(FIREBASE_URL + '/packs'); 
		var packArray = $firebase(packRef).$asArray();

		var propRef = new Firebase(FIREBASE_URL + '/properties'); 
		var propertiesArray = $firebase(propRef).$asArray(); // create property array

		var counterRef = new Firebase(FIREBASE_URL + '/packscounter/');
		var counterObj = $firebase(counterRef).$asObject();


		propertiesArray.$loaded().then(function(data) {
			$rootScope.howManyProperties = propertiesArray.length; // load array into rootscope
		}); 

		usersArray.$loaded().then(function(data) {
			$rootScope.howManyMembers = usersArray.length; // load array into rootscope
		}); //array loaded

		counterObj.$loaded().then(function() {
			$rootScope.howManyPacks = counterObj.counter; // load array into rootscope		
		});


		user.$loaded().then(function() {
			$rootScope.currentUser = user;
		});

		bankAmtObj.$loaded().then(function() {
			$rootScope.guildbankAmt = bankAmtObj.guildbankamount;	
		});

	});

	$rootScope.$on('$firebaseSimpleLogin:logout', function(e, authUser) {
			$rootScope.currentUser = null;


	});

}); //StatusController