angular
  .module('location')
  .controller("IndexController", function ($scope, Location, supersonic) {
    $scope.locations = null;
    $scope.showSpinner = true;

    Location.all().whenChanged( function (locations) {
        $scope.$apply( function () {
          $scope.locations = locations;
          $scope.showSpinner = false;
        });
    });
  });