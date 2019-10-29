d3.select("#reset").select("svg").remove();
var dataset = [];
var estrato1 = 22986;
var estrato2 = 88022;
var estrato3 = 90195;
var estrato4 = 35872;
var estrato5 = 28156;
var estrato6 = 18225;
var db = firebase.firestore();

function main(){
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        async function graph(){
            var dataset = [120, 180, 30, 40, 120, 160];
            console.log(dataset);

            await db.collection("prueba").doc(firebase.auth().currentUser.uid).get().then(function(doc) {
                if(doc.exists){
                    dataset = doc.data().consumoPrueba;
                    console.log(dataset);
                } else{
                    dataset = [];
                }
            });

            var buttonPrueba = document.getElementById("sendPrueba");
            buttonPrueba.addEventListener('click', addPrueba);

            var svgWidth = window.screen.width*0.8;  
            var svgHeight = window.screen.height*0.5;

            var svg = d3.select('#reset')
            .append('svg')  
            .attr("width", svgWidth)  
            .attr("height", svgHeight)  
            .attr("class", "bar-chart");

            var barPadding = 2;  
            var barWidth = (svgWidth / dataset.length);

            if(dataset.length > 10){
                var newDataset = dataset.slice(dataset.length-10, dataset.length);
                console.log(newDataset);

                var barNewWidth = (svgWidth / newDataset.length);

                var newScaledData = [];

                for(var i = 0; i < newDataset.length; i++){
                    newScaledData[i] = newDataset[i]/300;
                }

                var barChart = svg.selectAll("rect")  
                .data(newScaledData)  
                .enter()  
                .append("rect")  
                .attr("y", function(d) {  
                    return svgHeight - d  
                })  
                .attr("height", function(d) {  
                    return d;  
                })  
                .attr("width", barNewWidth - barPadding)  
                .attr("transform", function (d, i) {  
                    var translate = [barNewWidth * i, 0];  
                    return "translate("+ translate +")";  
                });
            }
            else{

                var newScaledData2 = [];

                for(var i = 0; i < dataset.length; i++){
                    newScaledData2[i] = dataset[i]/300;
                }

                var barChart = svg.selectAll("rect")  
                .data(newScaledData2)  
                .enter()  
                .append("rect")  
                .attr("y", function(d) {  
                    return svgHeight - d  
                })  
                .attr("height", function(d) {  
                    return d;  
                })  
                .attr("width", barWidth - barPadding)  
                .attr("transform", function (d, i) {  
                    var translate = [barWidth * i, 0];  
                    return "translate("+ translate +")";  
                });
            }
        }

function addPrueba(){
    var datoPrueba = document.getElementById("prueba").value;
    console.log(datoPrueba);
    if(datoPrueba==""){
        document.getElementById("prueba").style.border = "red solid 5px";
        console.log("datoPrueba validate");
    }
    else{
        document.getElementById("prueba").style.border = "0";
        d3.select("#reset").select("svg").remove();
        dataset.push(datoPrueba);

        var db = firebase.firestore();
        db.collection("prueba").doc(firebase.auth().currentUser.uid).get().then(function(doc) {
            if (doc.exists) {
                console.log(doc.data());
                var consumoNuevo = doc.data().consumoPrueba; 
                consumoNuevo.push(datoPrueba);

                db.collection("prueba").doc(firebase.auth().currentUser.uid).set({
                    consumoPrueba: consumoNuevo
                })
                .then(function() {
                    console.log("Dato agregado a la bd");
                
                    db.collection("form").doc(firebase.auth().currentUser.uid).get().then(function(stInfo) {
                        console.log(stInfo.data().estrato);
                        var dataStratum = stInfo.data().estrato;
        
                        if(dataStratum == '1'){
                            if(consumoNuevo[consumoNuevo.length-1] >= estrato1){
                                alert("ESTAS GASTANDO MUCHA AGUA!");
                            }
                        }
                        if(dataStratum == '2'){
                            if(consumoNuevo[consumoNuevo.length-1] >= estrato2){
                                alert("ESTAS GASTANDO MUCHA AGUA!");
                            }
                        }
                        if(dataStratum == '3'){
                            if(consumoNuevo[consumoNuevo.length-1] >= estrato3){
                                alert("ESTAS GASTANDO MUCHA AGUA!");
                            }
                        }
                        if(dataStratum == '4'){
                            if(consumoNuevo[consumoNuevo.length-1] >= estrato4){
                                alert("ESTAS GASTANDO MUCHA AGUA!");
                            }
                        }
                        if(dataStratum == '5'){
                            if(consumoNuevo[consumoNuevo.length-1] >= estrato5){
                                alert("ESTAS GASTANDO MUCHA AGUA!");
                            }
                        }
                        if(dataStratum == '6'){
                            if(consumoNuevo[consumoNuevo.length-1] >= estrato6){
                                alert("ESTAS GASTANDO MUCHA AGUA!");
                            }
                        }
                    });
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
            
            } else {
                db.collection("prueba").doc(firebase.auth().currentUser.uid).set({
                    consumoPrueba: [datoPrueba]
                })
                .then(function() {
                    console.log("Dato agregado a la bd");
                    db.collection("form").doc(firebase.auth().currentUser.uid).get().then(function(stInfo) {
                        console.log(stInfo.data().estrato);
                        var dataStratum = stInfo.data().estrato;
        
                        if(dataStratum == '1'){
                            if(datoPrueba[datoPrueba.length-1] >= estrato1){
                                alert("ESTAS GASTANDO MUCHA AGUA!");
                            }
                        }
                        if(dataStratum == '2'){
                            if(datoPrueba[datoPrueba.length-1] >= estrato2){
                                alert("ESTAS GASTANDO MUCHA AGUA!");
                                console.log("que sueño");
                            }
                            else{
                                console.log("relax");
                            }
                        }
                        if(dataStratum == '3'){
                            if(datoPrueba[datoPrueba.length-1] >= estrato3){
                                alert("ESTAS GASTANDO MUCHA AGUA!");
                            }
                        }
                        if(dataStratum == '4'){
                            if(datoPrueba[datoPrueba.length-1] >= estrato4){
                                alert("ESTAS GASTANDO MUCHA AGUA!");
                            }
                        }
                        if(dataStratum == '5'){
                            if(datoPrueba[datoPrueba.length-1] >= estrato5){
                                alert("ESTAS GASTANDO MUCHA AGUA!");
                            }
                        }
                        if(dataStratum == '6'){
                            if(datoPrueba[datoPrueba.length-1] >= estrato6){
                                alert("ESTAS GASTANDO MUCHA AGUA!");
                            }
                        }
                    });
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
            }
        });

        graph();
    }
}

graph(); //this is for calling the function (itself) for the first time you enter to the app

}
});
}
main();