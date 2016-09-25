angular
  .module('location')
  .controller("ShowController", function ($scope, Location, supersonic) {
    $scope.location = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;

    var _refreshViewData = function () {
      Location.find($scope.dataId).then( function (location) {
        $scope.$apply( function () {
          $scope.location = location;
          $scope.showSpinner = false;
        });
      });
    }

    supersonic.ui.views.current.whenVisible( function () {
      if ( $scope.dataId ) {
        _refreshViewData();
      }
    });

    supersonic.ui.views.current.params.onValue( function (values) {
      $scope.dataId = values.id;
      _refreshViewData();
    });

    $scope.remove = function (id) {
      $scope.showSpinner = true;
      $scope.location.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    }
  });