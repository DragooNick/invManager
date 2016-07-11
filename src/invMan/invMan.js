export default function($scope, $http, invManFactory) {

	let selectedCard = {
		name: undefined
	};

	// $scope.invMan = [
	// {
	// 	name: 'Test Set',
	// 	code: 'TS1'
	// },
	// {
	// 	name: 'T. Set2',
	// 	code: 'TS2'
	// }
	// ];

	$scope.importDatabase = msg => {
		console.log('ich tue was: ' + msg);
	};

	invManFactory.getSets($scope);

	$scope.getLocation = function(val) {
    return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: val,
        sensor: false
      }
    }).then(function(response){
      return response.data.results.map(function(item){
        return item.formatted_address;
      });
    });
  };
}