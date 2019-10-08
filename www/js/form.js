function form(){
    
    var neighborhood = document.getElementById("neighborhood").value;
    var stratum = document.getElementById("stratum").value;
    var validate = validateNulls(neighborhood,stratum);

    if(validate == true){
        console.log("validation complete");
        var db = firebase.firestore();
        db.collection("form").doc(firebase.auth().currentUser.uid).set({
            barrio: neighborhood,
            estrato: stratum,
            id: firebase.auth().currentUser.uid
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
    return validate;
}

function validateNulls(neighborhood,stratum){
    var validate = true;
    console.log("it validates");
    if(neighborhood==""){
        document.getElementById("neighborhood").style.border = "red solid 5px";
        validate = false;
        console.log("neighborhood validate");
    }
    else{
        document.getElementById("neighborhood").style.border = "0";
    }
    if(stratum==""){
        document.getElementById("stratum").style.border = "red solid 5px";
        validate = false;
        console.log("stratum validate");
    }
    else{
        document.getElementById("stratum").style.border = "0";
    }
    return validate;
}
