angular
  .module('Feed')
  .controller('IndexController', function($scope, $interval, supersonic) {
    // Controller functionality here
  	$scope.curr_loc = 'No nearby wall';
    $scope.contents = undefined;

    var getContent = function() {
      $scope.curr_loc = 'Tech';
      $scope.contents = ['Memory 1', 'Memory 2', 'Memory 3', 'Memory 4'];
  	};
  	getContent();

  	$interval(getContent, 5000);
});
