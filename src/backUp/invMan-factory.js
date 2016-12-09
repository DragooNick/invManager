import angular from 'angular';

const invManFactory = angular.module('app.invManFactory', [])

.factory('invManFactory', ($http) => {

	function getSets($scope) {
		$http.get('/invMan/sets').success(response => {
			$scope.invMan = response.sets;
			console.log(response.sets);
			$scope.sets = response.sets[0].cards;
			console.log(response.sets[0].cards);
		});
	}

	function makeSetCollection($scope, set) {
		console.log(set);
		$http.put('/invMan/lolsets', {
			name: set.name,
			code: set.code
		}).success(response => {
			alert(response);
		});
	}

	function getCard($scope) {
		
	}

	function searchCard($scope) {
		console.log({"cards.name": $scope.cardSearch.card });
		$http.post('/invMan/cardSearch', {
			name : $scope.cardSearch.card
		}).success(response => {
			console.log(response);
			$scope.cards = response.cards;
			console.log($scope.cards);
		});
	}

	return {
		getSets,
		makeSetCollection,
		getCard,
		searchCard
	};
});

export default invManFactory;