function form(){
    var commune = document.getElementById("commune").value;
    var neighborhood = document.getElementById("neighborhood").value;
    var stratum = document.getElementById("stratum").value;

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
}