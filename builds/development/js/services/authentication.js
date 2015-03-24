waterApp.factory('Authentication', function($rootScope, $firebase, $firebaseSimpleLogin, $location, FIREBASE_URL) {

	var ref = new Firebase(FIREBASE_URL);
	var simpleLogin = $firebaseSimpleLogin(ref);

	var myObject = {
		login: function(user) {

			var userRef = new Firebase(FIREBASE_URL + '/users/' + user.uid);
			var userObj = $firebase(userRef).$asObject();

			userObj.$loaded()
			.then(function() {
				$rootScope.currentUser = userObj;
			});

			return simpleLogin.$login('password', {
				email: user.email,
				password: user.password
			});
		}, //login

		register: function(user) {
			return simpleLogin
			.$createUser(user.email, user.password)
			.then(function(regUser) {
				var ref = new Firebase(FIREBASE_URL +'users');
				var firebaseUsers = $firebase(ref);

				var userInfo = {

					datecreated: Firebase.ServerValue.TIMESTAMP,
					regUser: regUser.uid,
					mainChar: user.mainChar,
					charName1: user.mainChar,
					email: user.email
				}

				firebaseUsers.$set(regUser.uid, userInfo);

			});
			
		}, //register


		logout: function() {
			return simpleLogin.$logout();
		}, //logout

		signedIn: function() {
			return simpleLogin.user != null;
		},

		//Add signedIn() to rootScope


		}
	
		$rootScope.signedIn = function() {
			return myObject.signedIn();

	}

	return myObject;

});