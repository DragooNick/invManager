import _ from 'lodash';

export default function($scope, $http, invManFactory) {

	//TEST
	$scope.data = {
    availableOptions: [
      {id: '1', name: 'Option A'},
      {id: '2', name: 'Option B'},
      {id: '3', name: 'Option C'}
    ],
    selectedOption: {id: '3', name: 'Option C'} //This sets the default value of the select in the ui
    };


	$scope.user = {
		username : 'nick'
	};

	$scope.decknames = [];

	$scope.importList = [];

	$scope.parseUploadList = _.partial(invManFactory.parseUploadList, $scope);

	$scope.importInventory = _.partial(invManFactory.importInventory, $scope);

	$scope.getDecknames = decks => {
		for(var i = 0; i < decks.length; i++) {
			$scope.decknames[i] = JSON.parse('{"deckname": "' + decks[i].deckname + '", "format": "' + decks[i].format + '" }');
		}
		return;
	};

	$scope.inventory = [];

    invManFactory.getNamesArray($scope); 

	$scope.searchCard = _.partial(invManFactory.searchCard, $scope);

	$scope.addCard = _.partial(invManFactory.addCard, $scope);

	$scope.subtractCard = _.partial(invManFactory.subtractCard, $scope);

	$scope.delCard = _.partial(invManFactory.delCard, $scope);

	invManFactory.getInventory($scope);

	$scope.getTotal = toBeCounted => {
    	var total = 0;
    	for(var i = 0; i < toBeCounted.length; i++){
        	total += toBeCounted[i].amount;
    	}
    	return total;
	};

	$scope.addDeck = _.partial(invManFactory.addDeck, $scope);

	invManFactory.getDecks($scope);

	$scope.delDeck = _.partial(invManFactory.delDeck, $scope);

	$scope.addCardToDeck = _.partial(invManFactory.addCardToDeck, $scope);

	$scope.subtractCardFromDeck = _.partial(invManFactory.subtractCardFromDeck, $scope);

	$scope.delCardFromDeck = _.partial(invManFactory.delCardFromDeck, $scope);

	$scope.getDeckList = deck => {
		var list = "";
		for(var i = 0; i < deck.length; i++){
        	list += deck[i].amount + " " + deck[i].name;
    	}
    	return list;
	};
}