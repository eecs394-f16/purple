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
    $scope.position = undefined;
    firebase.initializeApp(config);
    var database = firebase.database();

    var findNearestLocation = function(obj) {
      var myLat = $scope.position.coords.latitude;
      var myLong = $scope.position.coords.longitude;
      var nearestLocation = '';
      var nearestLocationDistance = INF;
      supersonic.logger.log(obj);
      for (item in obj['location']) {
       var lat = item['latitude'];
       var long = item['longitude'];
       var dist = distance(myLat, myLong, lat, long);
       if (dist < nearestLocationDistance) {
         nearestLocation = item;
         nearestLocationDistance = dist;
        }
      }
      return nearestLocation;
    };

    var distance = function(lat1, long1, lat2, long2) {
      var R = 6371e3; // radius of Earth, meters
      var φ1 = lat1 * Math.PI/180.;
      var φ2 = lat2 * Math.PI/180;
      var Δφ = (lat2-lat1) * Math.PI/180;
      var Δλ = (lon2-lon1) * Math.PI/180;

      var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
             Math.cos(φ1) * Math.cos(φ2) *
             Math.sin(Δλ/2) * Math.sin(Δλ/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      return R * c;
     };

    var getPosition = function() {
      supersonic.device.geolocation.getPosition().then( function(position){
        $scope.position = position;
        supersonic.logger.log(locations);
      });
    };

    var getAllData = function() {
      
      var locations;

      database.ref('/location').once('value').then(function(snapshot) {
        locations = snapshot.val();
        supersonic.logger.log(locations);
        //find_nearest_location
        var data = findNearestLocation(locations);
        $scope.curr_loc = Object.keys(data)[0];
        $scope.contents = locations[$scope.curr_loc]["content"];
        
      });
      
    };

    getPosition();
    getAllData();
    //getContent();
    $interval(getPosition, 5000);
  	$interval(getAllData, 5000);
});
