//debugging wrapper
var logVar = function(x, name) {
    var string =  name + ': ' + x;
    supersonic.logger.log(string);
};

//location finding functions
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

var setNearestLocation = function(locations, myLat, myLong) {
  var dist = Number.MAX_VALUE;
  var feed = [];

  for (var key in locations) {
    var lat = locations[key].latitude;
    var long = locations[key].longitude;
    var temp_dist = distance(lat, long, myLat, myLong);

    if (temp_dist < dist) {
      feed[0] = key;
      dist = temp_dist;
      feed[1] = locations[key].content;
    }
  }
  return feed;
};

function convertTimestamp(num) {
  // some code
}

angular
  .module('Feed')
  .controller('IndexController', function($scope, $interval, supersonic) {
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
    $scope.test = undefined;


    firebase.initializeApp(config);
    var database = firebase.database();

    $scope.sendData = function() {
      var id = this.content.id;
      supersonic.logger.log("Inside sendData: " + id);
      supersonic.logger.log("Current Location: " + $scope.curr_loc);
      database.ref('/location/' + $scope.curr_loc + '/content/' + id).once('value').then(function(snapshot) {
        var data = snapshot.val();
        supersonic.logger.log("is this working?");
        supersonic.logger.log(data);
        // $scope.detail = data;
        supersonic.data.channel('events').publish(data);
      });
    };

    // Initial Database Setting
    database.ref('location/' + 'Foster-Walker').set({
      latitude: -42.05295,
      longitude: -87.672645
    });

    var postData1 = [
      "http://i.imgur.com/mv9n9vX.jpg",
      "Screening room's marathoning every season of Gossip Girl: BEST NIGHT EVER!",
      "Room 306"
    ];
    var postData2 = [
      "http://i.imgur.com/EwpVDKq.gif",
      "We are dancing like this dude",
      "Room 404"
    ];
    var postData3 = [
      "http://i.imgur.com/h1Sy3z6.jpg",
      "Come celebrate Lenny's birthday!",
      "Room 201"
    ];
    var postData4 = [
      "http://i.imgur.com/Srx2uhN.jpg",
      "Listen to some jazz played by us!",
      "Basement"
    ];
    var postData5 = [
      "http://i.imgur.com/Jc3yOMw.jpg",
      "hang out some real DJs in the basement",
      "Basement 101"
    ];

    var finalData = [postData1, postData2, postData3, postData4, postData5];

    var ref = database.ref().child('location/Foster-Walker/content');
    for (var i = 0 ; i < finalData.length; i++) {
      var timestamp = firebase.database.ServerValue.TIMESTAMP;
      // finalData[i].timestamp = convertTimestamp(timestamp);
      finalData[i].timestamp = timestamp;
      ref.push(finalData[i]);
    }

    var getPosition = function() {
      supersonic.device.geolocation.getPosition().then( function(position){
        $scope.position = position;
      });
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

        var content = setNearestLocation(locations,
          $scope.position.coords.latitude,
          $scope.position.coords.longitude
        );

        $scope.curr_loc = content[0];

        /*
          object with timestamp key
          timestamp
            array
              0: url
              1: text
              2: location
        */
        var contents = content[1];
        var contents_array = [];
        for (var content in contents) {
          // supersonic.logger.log(contents[content]);
          contents[content].id = content;
          contents_array.push(contents[content]);
        }
        $scope.contents = contents_array;
      });

    };

    getPosition();
    getAllData();

    $interval(getPosition, 5000);
    $interval(getAllData, 5000);

  });
