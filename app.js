const express=require('express');

const https = require('https');

const app=express();
 



app.use(express.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");

    
});
app.post("/",function(req,res){
   console.log(req.body.cityName);
   const query=req.body.cityName;
   const apikey="9760f080ccf7c445aab0cf4c380022a8";
   const unit="metric"
   const url="https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apikey + "&units=" +unit;
  https.get(url,function(response){
  
   console.log(response.statusCode);
  
   response.on("data",function(data){
     const wdata=JSON.parse(data);
     const temp=wdata.main.temp;
     
     const wdes= wdata.weather[0].description;
     const icon=wdata.weather[0].icon;
     const imgURL="http://openweathermap.org/img/wn/" + icon + "@2x.png"
     res.write("<p>The weather is currently "+ wdes + "<p>")
     res.write("<h1>The temperature in "+ query + " is " + temp + "degree Celcius.</h1>")
     res.write("<img src=" + imgURL + ">");
     res.send();
  })
    })
})






app.listen(3000,function(){
    console.log("server is running on port 3000");
})