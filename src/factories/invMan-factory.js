import angular from 'angular';
import _ from 'lodash';

const invManFactory = angular.module('app.invManFactory', [])

.factory('invManFactory', ($http) => {

	function getNamesArray($scope) {
		console.log('start getting Names');
		$http.get('/invMan/getNamesArray').success(response => {
			console.log(response[0].names);
			$scope.cards = response[0].names;
		});
	}

	function searchCard($scope) {
		console.log($scope.cards);
		console.log({"cards.name": $scope.cardSearch.card });
		$http.post('/invMan/cardSearch', {
			name : $scope.cardSearch.card
		}).success(response => {
			console.log(response);
			$scope.cardsFound = response.cards;
			console.log($scope.cardsFound);
		});
	}

	function getInventory($scope) {
		console.log($scope.user.username);
		$http.post('/invMan/getInventory', {
			username : $scope.user.username
		}).success(response => {
			$scope.inventory = response.cards.inventory;
			console.log($scope.inventory[0]);
		});
	}

	function getDecks($scope) {
		console.log($scope.user.username);
		$http.post('/invMan/getDecks', {
			username : $scope.user.username
		}).success(response => {
			$scope.decks = response.cards.decks;
			console.log($scope.decks[0]);
		});
	}

	return {
		getNamesArray,
		searchCard,
		getInventory,
		getDecks
	};
});

export default invManFactory;