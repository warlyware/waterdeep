waterApp.controller('GuildBankController', function($scope, $rootScope, $firebase, $firebaseSimpleLogin, FIREBASE_URL) {

	var ref = new Firebase(FIREBASE_URL); // base url
	var simpleLogin = $firebaseSimpleLogin(ref); // run simpleLogin on url 

	simpleLogin.$getCurrentUser().then(function(authUser) { // get current user then...

		if (authUser !== null) { // if passed in authUser exists then...

			var bankRef = new Firebase(FIREBASE_URL + '/guildbank');
			var logRef = new Firebase(FIREBASE_URL + '/guildbank/log');


			var guildbanklog = $firebase(logRef);
//			var guildbankRef = ref.child('guildbankamount')		
			var guildbanklogObj = $firebase(logRef).$asObject(); 
			var guildbanklogArray = $firebase(logRef).$asArray(); 

			guildbanklogObj.$loaded().then(function(data) { // wait til properties object is loaded then...
				$scope.guildbanklog = guildbanklogObj; // load object into scope
			}); //properties object loaded






		}// user exists



	});//getCurrentUser

}); // GuildBankController