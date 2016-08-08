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
		console.log({"cards.name": $scope.cardSearch.card });
		$http.post('/invMan/cardSearch', {
			name : $scope.cardSearch.card
		}).success(response => {
			console.log(response);
			$scope.cardsFound = response;
		});
	}

	function addCard($scope, cardToAdd) {
		console.log('add Card: ' + cardToAdd.name);
		$http.put('/invMan/addCard', {
			username: $scope.user.username,
			name: cardToAdd.name,
			language: 'en',
			condition: 'nm',
			foil: false,
			signed: false,
			altered: false,
			multiverseid: cardToAdd.multiverseid
		}).success(response => {
			console.log(response);
			getInventory($scope);
		});
	}

	function subtractCard($scope, cardToSubtract) {
		console.log('subtract Card: ' + cardToSubtract.name);

		if(cardToSubtract.amount == 1) {
			delCard($scope, cardToSubtract);
		} else {
			$http.put('/invMan/subtractCard', {
				username: $scope.user.username,
				name: cardToSubtract.name,
				language: 'en',
				condition: 'nm',
				foil: false,
				signed: false,
				altered: false,
				multiverseid: cardToSubtract.multiverseid
			}).success(response => {
				console.log(response);
				getInventory($scope);
			});
		}	
	}

	function delCard($scope, cardToDelete) {
		console.log('delete Card: ' + cardToDelete.name);
		$http.post('/invMan/delCard', {
			username: $scope.user.username,
			name: cardToDelete.name,
			multiverseid: cardToDelete.multiverseid
		}).success(response => {
			console.log(response);
			getInventory($scope);
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
			deckname: deckToAdd,
			format: 'Casual'			
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
		console.log('delete deck: ' + deckToDelete);
		$http.delete(`/invMan/delDeck/${deckToDelete._id}`).success(response => {
			console.log(response);
			getDecks($scope);
		});
	}

	function addCardToDeck($scope, cardToAdd, deckname) {
		console.log('add Card: ' + cardToAdd.name + ' to Deck: ' + deckname);
		$http.put('/invMan/addCardToDeck', {
			username: $scope.user.username,
			deckname: deckname,
			name: cardToAdd.name,
			language: 'en',
			condition: 'nm',
			foil: false,
			signed: false,
			altered: false,
			multiverseid: cardToAdd.multiverseid
		}).success(response => {
			console.log(response);
			getDecks($scope);
		});
	}

	return {
		getNamesArray,
		searchCard,
		addCard,
		subtractCard,
		delCard,
		getInventory,
		addDeck,
		getDecks,
		delDeck,
		addCardToDeck
	};
});

export default invManFactory;