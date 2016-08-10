import _ from 'lodash';

export default function($scope, $http, invManFactory) {

	$scope.user = {
		username : 'nick'
	};

	$scope.inventory = [];

    invManFactory.getNamesArray($scope); 

	$scope.searchCard = _.partial(invManFactory.searchCard, $scope);

	$scope.addCard = _.partial(invManFactory.addCard, $scope);

	$scope.subtractCard = _.partial(invManFactory.subtractCard, $scope);

	$scope.delCard = _.partial(invManFactory.delCard, $scope);

	$scope.getInventory = _.partial(invManFactory.getInventory, $scope);

	$scope.getTotal = toBeCounted => {
    	var total = 0;
    	for(var i = 0; i < toBeCounted.length; i++){
        	total += toBeCounted[i].amount;
    	}
    	return total;
	};

	$scope.addDeck = _.partial(invManFactory.addDeck, $scope);

	$scope.getDecks = _.partial(invManFactory.getDecks, $scope);

	$scope.delDeck = _.partial(invManFactory.delDeck, $scope);

	$scope.addCardToDeck = _.partial(invManFactory.addCardToDeck, $scope);

	$scope.getDeckList = deck => {
		var list = "";
		for(var i = 0; i < deck.length; i++){
        	list += deck[i].amount + " " + deck[i].name;
    	}
    	return list;
	};
}