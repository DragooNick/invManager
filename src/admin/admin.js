import _ from 'lodash';

export default function($scope, $http, invManFactory) {
	$scope.getNames = _.partial(invManFactory.getNames, $scope);
}