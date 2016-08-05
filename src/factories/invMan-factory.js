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
			$scope.inventory = response.cards;
			console.log($scope.inventory);
		});
	}

	function addDeck($scope, deckToAdd) {
		console.log('add Deck: ' + deckToAdd);
		$http.put('/invMan/addDeck', {
			username: $scope.user.username,
			deckname: deckToAdd			
		}).success(response => {
			console.log(response);
			getDecks($scope);
			$scope.deckToAdd = '';
		});
	}

	function getDecks($scope) {
		console.log($scope.user.username);
		$http.post('/invMan/getDecks', {
			username : $scope.user.username
		}).success(response => {
			$scope.decks = response;
			console.log($scope.decks[0]);
		});
	}

	function delDeck($scope, deckToDelete) {
		console.log(deckToDelete);
		console.log('delete deck: ');
		$http.delete(`/invMan/delDeck/${deckToDelete._id}`).success(response => {
			console.log(response);
			getDecks($scope);
		});
	}

	return {
		getNamesArray,
		searchCard,
		getInventory,
		addDeck,
		getDecks,
		delDeck
	};
});

export default invManFactory;