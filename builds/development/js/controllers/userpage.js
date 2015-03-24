waterApp.controller('UserController', function($state, $stateParams, $scope, $rootScope, $firebase, $location, $firebaseSimpleLogin, FIREBASE_URL) {

	$scope.whichuser = $stateParams.uId; // add whichuser to scope


	var userRef = new Firebase(FIREBASE_URL + '/users/' + $scope.whichuser); //get userObj->currentUser ref
	var charRef = new Firebase(FIREBASE_URL + '/users/' + $scope.whichuser + '/characters'); //get userCharacter ref
	var bankRef = new Firebase(FIREBASE_URL + '/guildbank'); //get guildbank ref

	var userObj = $firebase(userRef).$asObject(); //create userObj object

	var userCharactersInfo = $firebase(charRef);
	var userCharactersArray = $firebase(charRef).$asArray();
	var userCharactersObj = $firebase(charRef).$asObject();

	var logRef = new Firebase(FIREBASE_URL + '/guildbank/log');

	var packTypeRef = new Firebase(FIREBASE_URL + '/packtypes');
	var packTypeInfo =  $firebase(packTypeRef);
	var packTypeArray = $firebase(packTypeRef).$asArray();
	var packTypeObj = $firebase(packTypeRef).$asObject();


	var guildbanklog = $firebase(logRef);
//			var guildbankRef = ref.child('guildbankamount')		
	var guildbanklogObj = $firebase(logRef).$asObject(); 
	var guildbanklogArray = $firebase(logRef).$asArray(); 

	guildbanklogObj.$loaded().then(function(data) { // wait til properties object is loaded then...
		$scope.guildbanklog = guildbanklogObj; // load object into scope
	}); //properties object loaded



	userObj.$loaded().then(function() {
		$rootScope.currentUser = userObj; // add currentUser to rootScope
	});

	userCharactersObj.$loaded().then(function() {
		$scope.characters = userCharactersObj; //add characters to scope
	});

	userCharactersArray.$loaded().then(function() {
		$scope.charactersArr = userCharactersArray; //add characters to scope
	});


	//ADMIN CODE

		//Guild Bank
		bankRef.on("value", function(snapshot) { 
			var newAmount = snapshot.val()
			$rootScope.guildbankAmt = newAmount.guildbankamount;
		}, function (err) {
			console.log("Fail " + err.code);
		});//update guildbank amount on change


		$scope.editGuildBank = function() { // add editGuildBank() to scope
			bankRef.set({
				guildbankamount: $scope.newBankAmount
			});
			guildbanklog.$push({ // push info below as object to db
				guildbankamount: $scope.newBankAmount,
				postTime: Firebase.ServerValue.TIMESTAMP
			})
			.then(function() { // once data is saved to db...
				$scope.newAmount = '';
			});


		}

	packTypeObj.$loaded().then(function() {
		$rootScope.packtypes = packTypeObj;

		$scope.addPackType = function() { // add addPackType() to scope

			packTypeInfo.$push({ 
				packtype: $scope.packtype,
				packvalue: $scope.packvalue,
				packorigin: $scope.packorigin
			});

		}
	});


	$scope.addCharacter = function() {
		var userCharactersInfo = $firebase(charRef);

		var newData = {
			charname: $scope.user.character.charname,
//			packamount: $scope.pack.packamount,
			charlvl: $scope.user.character.charlvl,
//			created: Firebase.ServerValue.TIMESTAMP
		}

		userCharactersInfo.$push(newData).then(function(){
			$location.path('/users/' + $scope.whichuser);
		});

	}

	$scope.deleteCharacter = function(key) { 
		var r = confirm('are you sure you want to delete this character?');
		if (r == true) {
			userCharactersInfo.$remove(key); // remove key of base property item clicked on, deleteing obj from db
		}
	}	

}); 