angular
  .module('locationbins')
  .controller("NewController", function ($scope, Locationbins, supersonic) {
    $scope.locationbins = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newlocationbins = new Locationbins($scope.locationbins);
      newlocationbins.save().then( function () {
        supersonic.ui.modal.hide();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });