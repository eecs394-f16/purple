angular
  .module('Feed')
  .controller('IndexController', function($scope, $interval, supersonic) {
    // Controller functionality here
  	// Firebase Setting
    var config = {
        apiKey: "AIzaSyDAuhBy07kgbtxrkWjHu76bS7-Rvsr2Oo8",
        authDomain: "purple-b06c8.firebaseapp.com",
        databaseURL: "https://purple-b06c8.firebaseio.com",
        storageBucket: "purple-b06c8.appspot.com",
        messagingSenderId: "396973912921"
      };
    $scope.curr_loc = 'No nearby wall';
    $scope.contents = undefined;
    firebase.initializeApp(config);
    var database = firebase.database();

    var getAllData = function() {
      
      var locations;

      database.ref('/location').once('value').then(function(snapshot) {
        locations = snapshot.val();
        supersonic.logger.log(locations);
        //find_nearest_location
        $scope.curr_loc = 'Tech';
        $scope.contents = locations[$scope.curr_loc]["content"];
        
      });
      
    };

    getAllData();
    //getContent();
  	$interval(getAllData, 5000);
});
