waterApp.controller('RegistrationController', function($scope, $rootScope, $firebaseSimpleLogin, $location, Authentication) {



	$scope.login = function() {
		Authentication.login($scope.user)
		.then(function(user) {
			$location.path('/properties');	
		}, function(error) {
			//Custom error messages
			if ( error == 'Error: FirebaseSimpleLogin: The specified user does not exist.') {
				$scope.message = 'the user does not exist';
			} else if (error == 'Error: FirebaseSimpleLogin: The specified password is incorrect.') {
				$scope.message = 'the password is incorrect';
			} else {
				$scope.message = error.toString();
			}


		});//login error

	} //login


	$scope.register = function() {
		Authentication.register($scope.user)
		.then(function(user) {
			
			alert('thank you for registering, you can now login.')
			$location.path('/login');	


		}, function(error) {
			
			//Custom error messages
			if (error == 'Error: FirebaseSimpleLogin: The specified email address is already in use.') {
				$scope.message = 'a user with that email already exists';
			} else {
				$scope.message = error.toString();
			}


		});//registration error

	} //register


}); //RegistrationController