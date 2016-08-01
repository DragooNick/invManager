import _ from 'lodash';

export default function($scope, $http, adminFactory) {
	$scope.getNames = _.partial(adminFactory.getNames, $scope);
}