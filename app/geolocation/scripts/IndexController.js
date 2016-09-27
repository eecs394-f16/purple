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
    $scope.test = undefined;
    firebase.initializeApp(config);
    var database = firebase.database();

//Needs fixing
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

        $scope.locations = locations;
        
        //$scope.locations = Object.keys(locations);

        var keys = [];
        for(var k in locations) {
          keys.push([ k, locations[k]["longitude"], locations[k]["latitude"] ]);
        }

        $scope.locations = keys;


        var myLat = $scope.position.coords.latitude;
        var myLong = $scope.position.coords.longitude;
        var dist = Number.MAX_VALUE;

        for (item in locations) {
          var lat = locations[item]["latitude"];
          var longs = locations[item]["longitude"];
          var temp_dist = Math.abs(lat-myLat);
          if (temp_dist < dist) {
            $scope.curr_loc = item;
            dist = temp_dist;
            $scope.contents = locations[$scope.curr_loc]["content"];
          }
        }

      });
      
    };

    getPosition();
    getAllData();

    $interval(getPosition, 5000);
    $interval(getAllData, 5000);

  });