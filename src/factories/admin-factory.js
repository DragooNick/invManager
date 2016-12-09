import angular from 'angular';
import _ from 'lodash';

const adminFactory = angular.module('app.adminFactory', [])

.factory('adminFactory', ($http) => {

	function getNames($scope) {
		console.log('start getNames');
		$http.get('/admin/getNames').success(response => {
			console.log('show response');
			console.log(response);
			var namesJson = [];
			for (var set in response) {
				for (var card in response[set].cards) {
					namesJson.push(response[set].cards[card].name);
				}
			}
			console.log(namesJson.length);
			var uniqJson = _.uniq(namesJson);
			console.log(uniqJson.length);
			console.log('for done');
			var orderJson = _.orderBy(uniqJson)
			saveNames($scope, orderJson);
		});
	}

	function saveNames($scope, names) {
		console.log('start saveNames');
		console.log(names);
		$http.post('/admin/saveNames', names).success(response => {
			$scope.cards = names;
			console.log(response);
		});
	}

	return {
		getNames,
		saveNames
	};
});

export default adminFactory;