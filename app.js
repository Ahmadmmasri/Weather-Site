//jshint eversion:6
const express = require("express");
const https=require("https");
const app= express();
var path = require('path');
const bodyParser = require("body-parser");
app.get("/",(req,res)=>{
res.sendFile(__dirname+"/index.html");
})
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/img'));

app.use(bodyParser.urlencoded({extended: true}));

app.post("/",(req,res)=>{
const city= req.body.CityInput.toUpperCase();
    // put your api key here
const idKey="";
if (city===Number(city)){
    res.write("enter city name")
}
else{
const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+idKey +"&units=metric";
    https.get(url,(response)=>{
        console.log("weather api working well");
        console.log(response.statusCode);
        response.on("data",(data)=>{
           const weatherFormat=JSON.parse(data);

            const temp= Math.floor(weatherFormat.main.temp);
           const desc=weatherFormat.weather[0].description;
           const icon=weatherFormat.weather[0].icon;
           const imgUrl="https://openweathermap.org/img/wn/"+icon+"@4x.png";
           console.log(weatherFormat,temp);
           console.log(temp);
           console.log(desc);

           function details(){
               res.write("<div> <h1 style=background:'red'>the weather in "+city +" is "+temp+" Degrees "+"</h1>");
               res.write("<p> and the weather look like "+desc+"today </p>")
               res.write("<img src="+imgUrl +"> <hr> </div>");
               res.write("<style>div{color:#fff; text-align:center; margin-top:7%;} body{background-color:#87ceeb; font-size:1.5rem;} hr{width:20%; background-color:#000;}}</style>")
           }
           res.send(details());
        });
    });
}
});

app.listen(3000,()=>{
    console.log("working on 3000 portal");
})


