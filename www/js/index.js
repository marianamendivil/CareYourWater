window.onload = init;

function init(){

    //Navigtion

    document.getElementById("loginP").style.display = "block";

    var signButton = document.getElementById("signButton");
    signButton.addEventListener('click', navigate("loginP","formP"));

    var formButton = document.getElementById("formButton");
    formButton.addEventListener('click', ()=>{
        navigate("formP","mainP")();
        document.getElementById("navBar").style.display = "block";   
    });

    var hidriButton = document.getElementById("hidriButton");
    hidriButton.addEventListener('click', hiding("hidriP"));

    var mainButton = document.getElementById("mainButton");
    mainButton.addEventListener('click', hiding("mainP"));

    var profileButton = document.getElementById("profileButton");
    profileButton.addEventListener('click', hiding("profileP"));
}

var form = document.getElementById("formButton");
    form.addEventListener('click', function(){
        form();
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