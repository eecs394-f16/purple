angular
  .module('Feed')
  .controller('IndexController', function($scope, supersonic) {
    // Controller functionality here
  	$scope.curr_loc = 'No nearby wall';
    $scope.contents = undefined;
    $scope.getContent = function() {
      $scope.curr_loc = 'tech';
      $scope.contents = ['123', 'abc', 'last'];
  };
});
