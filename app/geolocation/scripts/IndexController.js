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

  $scope.database = database;

  $scope.locations = undefined;

  database.ref('/location').once('value').then(function(snapshot) {
    $scope.locations = snapshot.val();
    //supersonic.logger.log($scope.locations);
    //$scope.locations = "this is dumb.";
    $scope.locations = snapshot.val()["Tech"]["longitude"];
  });





  $scope.position = undefined;
  $scope.nearestLocation = undefined;

  //$scope.nearestLocation = {"placeholder"};

  supersonic.device.geolocation.getPosition().then( function(position){
        $scope.position = position;
      });


  function findNearestLocation(){
      //Needs to be filled in
  }




  });