angular
  .module('locationbins')
  .controller("IndexController", function ($scope, Locationbins, supersonic) {
    $scope.locationbinss = null;
    $scope.showSpinner = true;

    Locationbins.all().whenChanged( function (locationbinss) {
        $scope.$apply( function () {
          $scope.locationbinss = locationbinss;
          $scope.showSpinner = false;
        });
    });
  });