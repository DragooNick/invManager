export default function($scope, $rootScope, loginFactory) {
	
	$scope.login = _.partial(loginFactory.login, $scope, $rootScope);
	$scope.register = _.partial(loginFactory.register, $scope, $rootScope);
	$scope.logout = _.partial(loginFactory.logout, $scope, $rootScope);

}