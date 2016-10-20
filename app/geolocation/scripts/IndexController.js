angular
  .module('geolocation')
  .controller('IndexController', function($scope, $interval, supersonic) {
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
    $scope.distances = [];
    $scope.test = undefined;

    firebase.initializeApp(config);
    var database = firebase.database();

    var getPosition = function() {
      supersonic.device.geolocation.getPosition().then( function(position){
        $scope.position = position;
      });
    };

    var distance = function(lat1, lon1, lat2, lon2) {
      var R = 6371e3; // radius of Earth, meters
      var phi1 = lat1 * Math.PI / 180;
      var phi2 = lat2 * Math.PI / 180;

      var deltaphi = (lat2-lat1) * Math.PI / 180;
      var deltalambda = (lon2-lon1) * Math.PI / 180;

      var a = Math.sin(deltaphi / 2) * Math.sin(deltaphi / 2) +
          Math.cos(phi1) * Math.cos(phi2) *
          Math.sin(deltalambda / 2) * Math.sin(deltalambda / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      d = R * c;
      return d;
    };

    $scope.pushData = function() {
      var ref = database.ref().child('location/' + $scope.curr_loc + '/content');
      ref.push("temporary data");
    }

    var setNearestLocation = function(locations, myLat, myLong) {
      var dist = Number.MAX_VALUE;

      for (var key in locations) {
        var lat = locations[key].latitude;
        var long = locations[key].longitude;
        var temp_dist = distance(lat, long, myLat, myLong);

        if (temp_dist < dist) {
          $scope.curr_loc = key;
          dist = temp_dist;
          $scope.contents = locations[key].contents;
        }
      }
    };

    var getAllData = function() {

      var locations;

      database.ref('/location').once('value').then(function(snapshot) {
        locations = snapshot.val();
        $scope.locations = locations;

        var keys = [];
        for(var k in locations) {
          keys.push([ k, locations[k]["longitude"], locations[k]["latitude"] ]);
        }
        $scope.locations = keys;

        setNearestLocation(locations,
          $scope.position.coords.latitude,
          $scope.position.coords.longitude);
      });

    };

    getPosition();
    getAllData();

    $interval(getPosition, 5000);
    $interval(getAllData, 5000);

  });
