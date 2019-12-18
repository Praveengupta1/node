const express = require("express");
const bodyParser = require("body-parser");
const requests = require("request");
const path = require("path");

const app = express();


app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname+"/public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});


app.post("/",function(req,res){

  var firstName = req.body.name;

  var pass = req.body.Password;

  var emailAdress = req.body.emailid;

  var data = {

  email_address: emailAdress,

  status: "subscribed",

  merge_fields:{

      FNAME:firstName,

      LNAME:pass

    }

};



var jsonData = JSON.stringify(data);



var options = {

  url: "https://(last 3 digiit of api).api.mailchimp.com/3.0/lists/(apiid)/members",

  method: "POST",

  headers: {

    "Authorization": "praveen1 apikey"

  },

  body: jsonData

};
  requests(options,function(error,response,body){
    if(error){

        res.sendFile(__dirname+"/failure.html");
    }else {

        res.sendFile(__dirname+"/success.html");
    }

  });
});
app.listen(process.env.PORT || 3000,function(){
  console.log("I am work at 3000 Port");
});
