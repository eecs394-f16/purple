angular
  .module('location')
  .controller("EditController", function ($scope, Location, supersonic) {
    $scope.location = null;
    $scope.showSpinner = true;

    // Fetch an object based on id from the database
    Location.find(steroids.view.params.id).then( function (location) {
      $scope.$apply(function() {
        $scope.location = location;
        $scope.showSpinner = false;
      });
    });

    $scope.submitForm = function() {
      $scope.showSpinner = true;
      $scope.location.save().then( function () {
        supersonic.ui.modal.hide();
      });
    }

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });
