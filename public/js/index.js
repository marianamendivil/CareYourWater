window.onload = init;

function init(){
    //Authentication with google
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            firebase.firestore().collection("form").doc(firebase.auth().currentUser.uid).get().then(function(doc) {
                //Checking if the uid exist in the collection form of the db
                if (doc.exists) {
                    document.getElementById("mainP").style.display = "block";
                    document.getElementById("navBar").style.display = "block";
                    document.getElementById("logoMini").style.display = "block";
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    document.getElementById("formP").style.display = "block"; 

                    var formButton = document.getElementById("formButton");
                    formButton.addEventListener('click', ()=>{
                        validate = form();
                        if(validate){
                            navigate("formP", "mainP")();
                            document.getElementById("navBar").style.display = "block";
                            document.getElementById("logoMini").style.display = "block";
                        }
                    });
                }

                //NavBar
                var hidriButton = document.getElementById("hidriButton");
                hidriButton.addEventListener('click', hiding("hidriP"));

                var mainButton = document.getElementById("mainButton");
                mainButton.addEventListener('click', ()=>{
                    d3.select("#reset").select("svg").remove();
                    main();
                    hiding("mainP")();
                });

                var profileButton = document.getElementById("profileButton");
                profileButton.addEventListener('click', ()=>{
                    hiding("profileP")();
                    profile();
                    document.getElementById("userName").textContent = "";
                    document.getElementById("userEmail").textContent = "";
                    document.getElementById("userNe").textContent = "";
                    document.getElementById("userSt").textContent = "";
                });
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
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