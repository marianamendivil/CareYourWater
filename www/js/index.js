window.onload = init;

function form(){
    var commune = document.getElementById("commune").value;
    var neighborhood = document.getElementById("neighborhood").value;
    var stratum = document.getElementById("stratum").value;
    var user = firebase.auth().currentUser.uid;
    //var validate = validateNulls(commune,neighborhood,stratum);

    console.log("firebase here");
    var db = firebase.firestore();
    db.collection("form").add({
        comuna: commune,
        barrio: neighborhood,
        estrato: stratum,
        id: user
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
    navigate("formP","mainP")();
}

function init(){

    //Authentication with google

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            document.getElementById("formP").style.display = "block";
            console.log("You're in");
            
            //Navigtion

            var signButton = document.getElementById("signButton");
            signButton.addEventListener('click', navigate("loginP","formP"));

            var formButton = document.getElementById("formButton");
            formButton.addEventListener('click', ()=>{
                form();
                console.log("arrived here");
                document.getElementById("navBar").style.display = "block";   
            });

            var hidriButton = document.getElementById("hidriButton");
            hidriButton.addEventListener('click', hiding("hidriP"));

            var mainButton = document.getElementById("mainButton");
            mainButton.addEventListener('click', hiding("mainP"));

            var profileButton = document.getElementById("profileButton");
            profileButton.addEventListener('click', hiding("profileP"));

        } else {
          // No user is signed in.
          document.getElementById("loginP").style.display = "block";
            console.log("Not logged in");
        }
      });
}

var auth = document.getElementById("signButton");
auth.addEventListener('click', function(){
    auth();
});

//This function shows the page that you select in the nav bar, and hides the other pages

function hiding (id){
    return function(){
        var elements = document.getElementsByClassName("hiding");
        [].forEach.call(elements, function (el) {
            el.style.display = "none";
        });
        document.getElementById(id).style.display = "block";
    }
}

function show (id) {
    document.getElementById(id).style.display = "block";
}

function hide (id) {
    document.getElementById(id).style.display = "none";
}

var navigate = function(actual, next){
    return function(){
        hide(actual);
        show(next);
    }
}