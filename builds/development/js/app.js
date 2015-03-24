var waterApp = angular.module('waterApp', ['ui.router', 'firebase', 'appControllers', 'timer', 'angular.filter']);

var appControllers = angular.module('appControllers', ['firebase'])
	.constant('FIREBASE_URL', 'thistheFIREBASE_URLiuse');

waterApp.config(function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to /state1
	$urlRouterProvider.otherwise("/properties");

  // States
	$stateProvider
    .state('login', {
		url: '/login',
		controller: 'RegistrationController',
		templateUrl: 'views/login.html'
	})
    .state('tlm', {
		url: '/tlm',
		controller: 'RegistrationController',
		templateUrl: 'views/tlm.html'
	})	
	.state('properties', {
		url: '/properties',
		templateUrl: 'views/properties.html',
		controller: 'PropertiesController'
	})
	.state('guildbank', {
		url: '/guildbank',
		templateUrl: 'views/guildbank.html',
		controller: 'GuildBankController'
	})
	.state('propstats', {
		url: '/propstats/:uId/:cId/:pId',
		templateUrl: 'views/propstats.html',
		controller: 'PropStatsController'
	})
	.state('users', {
		url: '/users/:uId',
		templateUrl: 'views/user.html',
		controller: 'UserController'
	})
	.state('auction', {
		url: '/auction',
		templateUrl: 'views/auction.html',
		controller: 'AuctionController'
	})
	.state('members', {
		url: '/members',
		templateUrl: 'views/members.html',
		controller: 'MembersController'
	})
	.state('allproperties', {
		url: '/allproperties',
		templateUrl: 'views/allproperties.html',
		controller: 'AllPropsController'
	})
	.state('character', {
		url: '/users/:uId/characters/:cId',
		templateUrl: 'views/character.html',
		controller: 'CharStatsController'
	});
});
