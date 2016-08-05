import _ from 'lodash';

export default function($scope, $http, invManFactory) {

	$scope.user = {
		username : 'nick'
	};

    $scope.getNamesArray = _.partial(invManFactory.getNamesArray, $scope);

	$scope.searchCard = _.partial(invManFactory.searchCard, $scope);

	$scope.getInventory = _.partial(invManFactory.getInventory, $scope);

	$scope.addDeck = _.partial(invManFactory.addDeck, $scope);

	$scope.getDecks = _.partial(invManFactory.getDecks, $scope);

	$scope.delDeck = _.partial(invManFactory.delDeck, $scope);
}