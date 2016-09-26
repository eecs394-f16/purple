angular
  .module('geolocation')
  .controller('IndexController', function($scope, supersonic) {

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

  var locations;
  firebase.database().ref('/location').once('value').then(function(snapshot) {
    locations = snapshot.val();
  });



  $scope.position = undefined;
  $scope.nearestLocation = undefined;



  supersonic.device.geolocation.getPosition().then( function(position){
        $scope.position = position;
      });


  function findNearestLocation(){
      //Needs to be filled in
  }




  });