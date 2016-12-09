import _ from 'lodash';

export default function($scope, $http, invManFactory) {

	let selectedCard = {
		name: undefined
	};

	$scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

	$scope.getSets = _.partial(invManFactory.getSets, $scope);

	$scope.makeSetCollection = _.partial(invManFactory.makeSetCollection, $scope);

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

 //  	$scope.getSomething= function(query) {
 //  		console.log(query);
	//   var promise = $http.get('/invMan/stuff/cards', {
	//     params: {
	//       queryName: query
	//     }
	//   });
	//   console.log(promise);
	//   return promise;
	// };

	$scope.searchCard = _.partial(invManFactory.searchCard, $scope);
}