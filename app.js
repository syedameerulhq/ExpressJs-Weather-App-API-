
const express=require("express");
const https =require("https");
const bodyParser= require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
   res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
const query = req.body.cityName;
const apiKey="6d06081544c5192a494877f9ede51c17";
// const unit="imperial";
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=imperial";
// const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+apiKey+"&units=imperial"

https.get(url, function(response){
  console.log(response.statusCode);

    response.on("data",function(data){
    const weatherData=JSON.parse(data);
    const temp1 = weatherData.main.temp;
    const WeatherDiscription =weatherData.weather[0].description;
    const icon=weatherData.weather[0].icon;
    const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";
    res.write("<h1>temperature in " +query+ " is "+temp1+" degree C</h1>");
    res.write("<p>the weather is currently  "+WeatherDiscription+"<p>");
    res.write("<img src="+imageURL+">");
    res.send();
    // console.log(WeatherDiscription);
    

});
});
});




app.listen(3000,function(){
    console.log("server is running on server 3000");

});