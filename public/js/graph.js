d3.select("#reset").select("svg").remove();
var dataset = [120, 180, 30, 40, 120, 160];
console.log(dataset);

function graph(){
    var buttonPrueba = document.getElementById("sendPrueba");
    buttonPrueba.addEventListener('click', addPrueba);
    var svgWidth = window.screen.width*0.8;  
    var svgHeight = window.screen.height*0.4;

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

        var barChart = svg.selectAll("rect")  
        .data(newDataset)  
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
        var barChart = svg.selectAll("rect")  
        .data(dataset)  
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
        graph();
    }
}
graph(); //this is for calling the function (itself) for the first time you enter to the app