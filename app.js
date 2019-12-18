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

  url: "https://us4.api.mailchimp.com/3.0/lists/13e381a5b2/members",

  method: "POST",

  headers: {

    "Authorization": "praveen1 a5ec9c7a5ab85d776ae1d4b6849a8e1d-us4"

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
