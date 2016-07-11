import angular from 'angular';

const invManFactory = angular.module('app.invManFactory', [])

.factory('invManFactory', ($http) => {

	function getSets($scope) {
		$http.get('/invMan/stuff').success(response => {
			$scope.invMan = response.sets;
		});
	}

	function getCard($scope) {
		$http.get('/invMan/stuff').success(response => {

		});
	}

	return {
		getSets
	};
});

export default invManFactory;