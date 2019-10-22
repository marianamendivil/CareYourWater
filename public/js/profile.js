function profile(){
    firebase.firestore().collection("form").doc(firebase.auth().currentUser.uid).get().then(function(doc) {
        if (doc.exists) {
            document.getElementById("userName").append(firebase.auth().currentUser.displayName);
            document.getElementById("userEmail").append(firebase.auth().currentUser.email);            
            document.getElementById("userNe").append(doc.data().barrio); 
            document.getElementById("userSt").append(doc.data().estrato);                        
            console.log("Document data:", doc.data());
            var editProfile = document.getElementById("editProfile");
            editProfile.addEventListener('click', edit);
            
            var saveChanges = document.getElementById("saveChanges");
            saveChanges.addEventListener('click', save);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}

function edit(){
    document.getElementById("userNeighborhood").removeAttribute("disabled");
    document.getElementById("userStratum").removeAttribute("disabled");
    document.getElementById("saveChanges").style.display = "block";
}

function save(){
    var db = firebase.firestore();
    var updateForm = db.collection("form").doc(firebase.auth().currentUser.uid);
    userNeighborhood = document.getElementById("userNeighborhood").value;
    userStratum = document.getElementById("userStratum").value;
    var validateProfile = validateNullsProfile(userNeighborhood,userStratum);

    if(validateProfile == true){
        console.log("validation complete");
        updateForm.update({
            barrio: userNeighborhood,
            estrato: userStratum,
        })
        .then(function() {
            console.log("Document successfully updated!");
            alert("Tus datos fueron actualizados");
            document.getElementById("saveChanges").style.display = "none";
            document.getElementById("userNeighborhood").disabled = "true";
            document.getElementById("userStratum").disabled = "true";
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            alert("Error actualizando tus datos, intenta nuevamente");
        });
    }
    return validateProfile;
}

function validateNullsProfile(userNeighborhood, userStratum){
    var validateProfile = true;
    console.log("it validates profile");
    if(userNeighborhood==""){
        document.getElementById("userNeighborhood").style.border = "red solid 5px";
        validateProfile = false;
        console.log("userNeighborhood validate");
    }
    else{
        document.getElementById("userNeighborhood").style.border = "0";
    }
    if(userStratum==""){
        document.getElementById("userStratum").style.border = "red solid 5px";
        validateProfile = false;
        console.log("userStratum validate");
    }
    else{
        document.getElementById("userStratum").style.border = "0";
    }
    return validateProfile;
}
