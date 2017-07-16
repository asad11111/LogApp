(function(window,angular, undefined) 
{
	angular.module('app')
	.controller('viewCtrl',['$scope', '$http', function($scope,$http){
		$http.get('/getNewPhoto').then(function(response){
			$scope.pics=response.data;
			console.log('',$scope.pics);
		}, function(error){
			console.log('error!');
		})
	}])
})(window,window.angular)