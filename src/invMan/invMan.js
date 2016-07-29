import _ from 'lodash';

export default function($scope, $http, invManFactory) {

	$scope.user = {
		username : 'nick'
	};

	$scope.searchCard = _.partial(invManFactory.searchCard, $scope);

	$scope.getInventory = _.partial(invManFactory.getInventory, $scope);

	$scope.getDecks = _.partial(invManFactory.getDecks, $scope);
}