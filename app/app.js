(function(window,angular,undefined){
	angular.module('app', ['ui.router','ngFileUpload']);
	angular.module('app').config(['$urlRouterProvider','$stateProvider', function($urlRouterProvider,$stateProvider){
		$urlRouterProvider.otherwise('/');

		$stateProvider
		.state('view',{
			url:'/',
			templateUrl:'app/view/view.html',
			controller:'viewCtrl'
		})
		.state('share',
		{
			url:'/share',
			templateUrl:'app/share/share.html',
			controller:'shareCtrl'
		})
		.state('stream',
		{
			url:'/stream',
			templateUrl:'app/live/stream.html'
		})
		.state('index',
		{
			url:'index',
			templateUrl:'app/reviews/www/index.html'
		})
		.state('embed',{
			url:'/embed',
			templateUrl:'app/live/embed.html'
		})	
	}]);
		

})(window,window.angular);