angular
  .module('location')
  .controller('LocationController', function($scope, supersonic) {
    // Controller functionality here
	$scope.position = undefined;

	$scope.getPosition = function() {
	  supersonic.device.geolocation.getPosition().then( function(position){
	    $scope.position = position;
	  });
	};

  });