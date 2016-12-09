import angular from 'angular';

const loginFactory = angular.module('app.loginFactory', [])

.factory('loginFactory', ($http, $rootScope) => {

	function login($scope, $rootScope) {
		console.log('login started');
		console.log($scope.user);
		$http.get('/login/stuff', {
			username: $scope.user.username,
			password: $scope.user.password
		}).success(response => {
			console.log('login done');
			$scope.user = response;
			$rootScope.currentUser = response;
			console.log(response);
		});
	};

	function register($scope, $rootScope) {
		if($scope.user.password == $scope.user.password_confirmation && $scope.user.username != null && $scope.user.email != null) {	
			$http.post('/login/stuff/register', {
				firstname: $scope.user.firstname,
				lastname: $scope.user.lastname,
				username: $scope.user.username,
				password: $scope.user.password,
				email: $scope.user.email
			}).success(response => {
				console.log(response);
				$rootScope.currentUser = response;
				console.log($rootScope.currentUser + ' in rootScope');
			});
		} else if ($scope.user.password != $scope.user.password_confirmation) {
			alert('pw doesnt match');
			return;
		} else {
			alert('pls fill out all required fields');
     		return;
		}
	};

	function logout($scope, $rootScope) {
		$http.get('/login/stuff/logout').success(response => {
			$rootScope.currentUser = null;
			console.log(response);
		});
	};

	return {
		login,
		register,
		logout
	};
});

export default loginFactory;