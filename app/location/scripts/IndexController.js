angular
  .module('location')
  .controller("IndexController", function ($scope, Location, supersonic) {

    /* Supersonic */
    $scope.locations = null;
    $scope.showSpinner = true;



    supersonic.device.geolocation.getPosition().then( function(position){
          $scope.position = position;

        });

    Location.all().whenChanged( function (locations) {
        $scope.$apply( function () {
          $scope.locations = locations;
          $scope.showSpinner = false;
          console.log(locations);
        });
    });
  });