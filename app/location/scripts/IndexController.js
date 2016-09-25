angular
  .module('location')
  .controller("IndexController", function ($scope, Location, supersonic) {
    $scope.locations = null;
    $scope.showSpinner = true;



    supersonic.device.geolocation.getPosition().then( function(position){
          $scope.position = position;


              Location.findAll().then(function(locations){
              var allLocs = [];
              supersonic.logger.debug(locations);
              for (var i = 0; i < locations.length; i++) {
                supersonic.logger.debug(locations[i]["Longitude"]);
                allLocs.push([locations[i].longitude, locations[i].latitude, locations[i].name])
              }

              var closestLoc = allLocs[0];
              supersonic.logger.debug(closestLoc);

              for (var i = 0; i < allLocs.length; i++){
                supersonic.logger.debug(allLocs[i]);
              }

            });

        });

    Location.all().whenChanged( function (locations) {
        $scope.$apply( function () {
          $scope.locations = locations;
          $scope.showSpinner = false;
          console.log(locations);
        });
    });
  });