import _ from 'lodash';

export default function($scope, $http, invManFactory) {

	$scope.user = {
		username : 'nick'
	};

	$scope.inventory = [];

    $scope.getNamesArray = _.partial(invManFactory.getNamesArray, $scope);

	$scope.searchCard = _.partial(invManFactory.searchCard, $scope);

	$scope.addCard = _.partial(invManFactory.addCard, $scope);

	$scope.subtractCard = _.partial(invManFactory.subtractCard, $scope);

	$scope.delCard = _.partial(invManFactory.delCard, $scope);

	$scope.getInventory = _.partial(invManFactory.getInventory, $scope);

	$scope.getTotal = () => {
    	var total = 0;
    	for(var i = 0; i < $scope.inventory.length; i++){
        	total += $scope.inventory[i].amount;
    	}
    	return total;
	};

	$scope.addDeck = _.partial(invManFactory.addDeck, $scope);

	$scope.getDecks = _.partial(invManFactory.getDecks, $scope);

	$scope.delDeck = _.partial(invManFactory.delDeck, $scope);
}