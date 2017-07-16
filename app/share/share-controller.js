(function(window,angular, undefined){
	angular.module('app')
	.controller('shareCtrl',['$scope','$http','$window','Upload', function($scope,$http,$window,Upload)
	{
		$scope.upload=function()
		{
			console.log('This is upload Function')
			var request={
				 description:$scope.description
			}
			Upload.upload({
				url:'/share',
				data: {file: $scope.file, data:request}
			}).then(function(response){
				console.log('Hello');
				$window.location.reload();
			}, function(err){
				console.error('Error' + err)
			})
		}
		$scope.$watch(function(){
			return $scope.file;
		}, function() {
			console.log($scope.file);
		})
		$scope.test= 'sharing'
	}])
})(window, window.angular)