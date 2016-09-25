angular
  .module('locationbins')
  .controller("EditController", function ($scope, Locationbins, supersonic) {
    $scope.locationbins = null;
    $scope.showSpinner = true;

    // Fetch an object based on id from the database
    Locationbins.find(steroids.view.params.id).then( function (locationbins) {
      $scope.$apply(function() {
        $scope.locationbins = locationbins;
        $scope.showSpinner = false;
      });
    });

    $scope.submitForm = function() {
      $scope.showSpinner = true;
      $scope.locationbins.save().then( function () {
        supersonic.ui.modal.hide();
      });
    }

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });
