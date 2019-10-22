function auth() {

    console.log("entra");

    //angular.module('app.controllers.login', ['firebase'])
    //.controller('LoginController', LoginController);

    //function LoginController($scope, $firebaseAuth) {
    var provider = new firebase.auth.GoogleAuthProvider();
    console.log("PROVODER"+JSON.stringify(provider));
    // for Facebook -> prov = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function() {
    console.log("entrax2");
        
        return firebase.auth().getRedirectResult();
      }).then(function(response) {
        // This gives you a Google Access Token.
        // You can use it to access the Google API.
        console.log("AAAA"+response);
        console.log("AAAAZZZ"+response.user);
        var token = response.credential.accessToken;
        console.log("BBBBB"+token);
        // The signed-in user info.
        var user = response.user;
        console.log("CCCCCCCCCCC"+user);
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });;
    console.log("You're in");
    //}
}
