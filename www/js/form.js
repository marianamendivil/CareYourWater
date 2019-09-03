function form(){
    
    var commune = document.getElementById("commune").value;
    var neighborhood = document.getElementById("neighborhood").value;
    var stratum = document.getElementById("stratum").value;
    //var validate = validateNulls(commune,neighborhood,stratum);

    var db = firebase.firestore();
    db.collection("form").add({
        comuna: commune,
        barrio: neighborhood,
        estrato: stratum
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

    /*
    if(validate == true){
        console.log("algo");
        var db = firebase.firestore();
        db.collection("form").add({
            comuna: commune,
            barrio: neighborhood,
            estrato: stratum
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }*/
}
/*
function validateNulls(commune,neighborhood,stratum){
    var validate = true;
    console.log("it validates");
    if(commune==""){
        document.getElementById("commune").classList.add("alert-danger");
        validate = false;
        console.log("commune validate");
    }
    if(neighborhood==""){
        document.getElementById("neighborhood").classList.add("alert-danger");
        validate = false;
        console.log("neigh validate");
    }
    if(stratum==""){
        document.getElementById("stratum").classList.add("alert-danger");
        validate = false;
        console.log("stratum validate");
    }
    return validate;
}
*/