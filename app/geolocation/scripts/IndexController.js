angular
  .module('geolocation')
  .controller('IndexController', function($scope, supersonic) {
/*
  // Firebase Setting
  var config = {
        apiKey: "AIzaSyDAuhBy07kgbtxrkWjHu76bS7-Rvsr2Oo8",
        authDomain: "purple-b06c8.firebaseapp.com",
        databaseURL: "https://purple-b06c8.firebaseio.com",
        storageBucket: "purple-b06c8.appspot.com",
        messagingSenderId: "396973912921"
      };

  firebase.initializeApp(config);
  var database = firebase.database();

  function saveData(name, long, lat) {
    firebase.database().ref('/location/' + name).set({
      longitude: long,
      langitude: lat
    })
  }

  var locations;

  firebase.database().ref('/location').once('value').then(function(snapshot) {
    locations = snapshot.val();
  });

  // Controller functionality here
	$scope.position = undefined;

	$scope.getPosition = function() {
	  supersonic.device.geolocation.getPosition().then( function(position){
	    $scope.position = position;
      supersonic.logger.log(locations);
	  });
	};
*/
  });