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

	function searchCard($scope, cardToSearch) {
		console.log({"cards.name": cardToSearch });
		$http.post('/invMan/cardSearch', {
			name : cardToSearch
		}).success(response => {
			console.log('CARDSFOUND RESPONSE');
			console.log(response);
			$scope.cardsFound = response;
		});
	}

	function addCard($scope, cardToAdd) {
		console.log('add Card: ' + cardToAdd.name);
		if(cardToAdd.amount == null || cardToAdd.amount == '') {
			cardToAdd.amount = 1;
		}

		$http.put('/invMan/addCard', {
			username: $scope.user.username,
			name: cardToAdd.name,
			language: 'en',
			condition: 'nm',
			foil: false,
			signed: false,
			altered: false,
			multiverseid: cardToAdd.multiverseid,
			amount: cardToAdd.amount
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
				multiverseid: cardToSubtract.multiverseid,
				amount: cardToSubtract.amount
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

	function parseUploadList($scope, uploadList) {
		console.log('PARSEUPLOADLIST');
			console.log('uploadList');
			console.log(uploadList);
			var cards = _.split(uploadList, '\n');
			console.log('cards');
			console.log(cards);
			for (var i = 0; i < cards.length; i++) {
				var card = _.split(cards[i], ';');
				console.log('card');
				console.log(card);
				//TODO REGEX
				// card = _.toString(card);
				// console.log('regex check');
				// var regex = /^[0-9]*/g;
				// var regCheck = card.match(regex);
				// console.log(regCheck);
				// if(/^[1-9]*[\s\D]*/g.test(card)) {
				// 	console.log('regex tut');
				// }
				var cardObj = JSON.parse('{"amount": "' + card[0] + '", "name": "' + card[1] + '", "multiverseid": "' + card[2] + '" }');		
				console.log('cardObj');
				console.log(cardObj);
				//TODO PROMISE
				// if (cardObj.multiverseid == '') {
				// 	searchCard($scope, cardObj.name).then($scope => {
				//		cardObj.multiverseid = $scope.cardsFound[1].cards[0].multiverseid;
				//		console.log(cardObj.name + ' multiverseid = ' + cardObj.multiverseid);
				//		var relDate = new Date($scope.cardsFound.cards[0].releaseDate);
				//		var date = new Date();
				//		var today = date.getTime();
				//		if (relDate < today) {
				//			console.log(relDate);
				//		}
				//	});
				}
				$scope.importList.push(cardObj);
			}
			console.log($scope.importList);
	}

	function importInventory($scope, importList) {
		console.log('IMPORTLIST');
		console.log(importList);
		for (var i = 0; i < importList.length; i++) {
			addCard($scope, importList[i]);
		}
		$scope.uploadList = [];
		$scope.importList = [];
		getInventory($scope);
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

	function addCardToDeck($scope, cardToAdd, deck) {
		console.log('add Card: ' + cardToAdd.name + ' to Deck: ' + deck.deckname);
		$http.put('/invMan/addCardToDeck', {
			username: $scope.user.username,
			deckname: deck.deckname,
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

	function subtractCardFromDeck($scope, cardToSubtract, deck) {
		console.log('subtract Card: ' + cardToSubtract.name + ' from Deck: ' + deck.deckname);

		if(cardToSubtract.amount == 1) {
			delCardFromDeck($scope, cardToSubtract, deck);
		} else {
			$http.post(`/invMan/subtractCardFromDeck/${deck._id}`, cardToSubtract).success(response => {
				getDecks($scope);
			});
		}		
	}

	function delCardFromDeck($scope, cardToDelete, deck) {
		console.log('delete Card: ' + cardToDelete.name + ' from Deck: ' + deck.deckname);
		$http.post(`/invMan/delCardFromDeck/${deck._id}`, cardToDelete).success(response => {
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
		parseUploadList,
		importInventory,
		addDeck,
		getDecks,
		delDeck,
		addCardToDeck,
		subtractCardFromDeck,
		delCardFromDeck
	};
});

export default invManFactory;