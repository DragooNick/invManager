export default function($scope, $rootScope, loginFactory) {

	$scope.user = {
		isRegistered: true
	};

	$scope.onRegisterClick = user => {
		user.isRegistered = !user.isRegistered;
	};

	$scope.login = _.partial(loginFactory.login, $scope, $rootScope);
	$scope.register = _.partial(loginFactory.register, $scope, $rootScope);
	$scope.logout = _.partial(loginFactory.logout, $scope, $rootScope);

}