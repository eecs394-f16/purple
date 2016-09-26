angular
  .module('location')
  .controller("NewController", function ($scope, Location, supersonic) {
    $scope.location = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newlocation = new Location($scope.location);
      newlocation.save().then( function () {
        supersonic.ui.modal.hide();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });