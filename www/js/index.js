window.onload = init;

function init(){

    //Authentication with google

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.

            document.getElementById("formP").style.display = "block"; 

            var formButton = document.getElementById("formButton");
            formButton.addEventListener('click', ()=>{
                form();
                navigate("formP", "mainP")();
                document.getElementById("navBar").style.display = "block";
            });
            
            //Navigtion

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
            var signButton = document.getElementById("signButton");
            signButton.addEventListener('click', ()=>{
                auth();
            });
        }
      });
}

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