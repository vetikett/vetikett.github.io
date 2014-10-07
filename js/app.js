var joansApp = angular.module('joansApp', ['ngRoute', 'ngAnimate', 'ngTouch']);

joansApp.config(function($routeProvider) {

	$routeProvider
		.when('/', {
			templateUrl: 'templates/home.html',
			controller: 'mainCtrl'
		})
		.when('/historien', {
			templateUrl: 'templates/historien.html',
			controller: 'historienCtrl'
		})
		.when('/media', {
			templateUrl: 'templates/media.html',
			controller: 'mediaCtrl'
		})
		.when('/latarna', {
			templateUrl: 'templates/latarna.html',
			controller: 'latarnaCtrl'
		})
		.when('/medverkande', {
			templateUrl: 'templates/medverkande.html',
			controller: 'medverkandeCtrl'
		})
		.when('/kontakt', {
			templateUrl: 'templates/kontakt.html',
			controller: 'kontaktCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
});

// Controllers ==============

joansApp.controller('mainCtrl', function($scope) {
	$scope.pageClass = 'page-home';
});

joansApp.controller('historienCtrl', function($scope) {
	$scope.pageClass = 'page-historien';
});

joansApp.controller('mediaCtrl', function($scope) {
	$scope.pageClass = 'page-media';
});

joansApp.controller('latarnaCtrl', function($scope) {
	$scope.pageClass = 'page-latarna';
});

joansApp.controller('medverkandeCtrl', function($scope) {
	$scope.pageClass = 'page-medverkande';
});

joansApp.controller('kontaktCtrl', function($scope) {
	$scope.pageClass = 'page-kontakt';
});