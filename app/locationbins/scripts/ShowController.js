angular
  .module('locationbins')
  .controller("ShowController", function ($scope, Locationbins, supersonic) {
    $scope.locationbins = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;

    var _refreshViewData = function () {
      Locationbins.find($scope.dataId).then( function (locationbins) {
        $scope.$apply( function () {
          $scope.locationbins = locationbins;
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
      $scope.locationbins.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    }
  });