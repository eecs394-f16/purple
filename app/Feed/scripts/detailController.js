angular
  .module('Feed')
  .controller('DetailController', function($scope, supersonic) {
      var unsubscribe = supersonic.data.channel('events').subscribe( function(data) {
        // supersonic.logger.log(data);
        // $scope.detail = data;
      });

      supersonic.logger.log("something working?");

    });
