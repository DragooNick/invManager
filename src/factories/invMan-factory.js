import angular from 'angular';

const invManFactory = angular.module('app.invManFactory', [])

.factory('invManFactory', ($http) => {

	function login() {
		$http.post('/login').success(response => {
			
		});
	}

	function getSets($scope) {
		$http.get('/invMan/stuff').success(response => {
			$scope.invMan = response.sets;
			console.log(response.sets);
			$scope.sets = response.sets[0].cards;
			console.log(response.sets[0].cards);
		});
	}

	function makeSetCollection($scope, set) {
		console.log(set);
		$http.put('/invMan/stuff/sets', {
			name: set.name,
			code: set.code
		}).success(response => {
			alert(response);
		});
	}

	function getCard($scope) {
		
	}

	return {
		login,
		getSets,
		makeSetCollection,
		getCard
	};
});

export default invManFactory;