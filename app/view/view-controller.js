(function(window,angular, undefined) 
{
	angular.module('app')
	.controller('viewCtrl',['$scope', '$http', function($scope,$http){
		$http.get('/getNewPhoto').then(function(response){
			$scope.pics=response.data;
			 $scope.like = 0;
			console.log(' ',$scope.pics);
		}, function(error){
			console.log('error!');
		})
	}])
	.controller('userCtrl',['$scope',function($scope) 
	{
		$scope.user=user;
		// body...
	}])
})(window,window.angular)