//jshint esversion:6


const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
require('dotenv').config();

console.log(process.env);

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {

  //console.log(req.body.crypto);

  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var emailName = req.body.ename;

  var data = {
    members: [{
      email_address: emailName,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      }
    }]
  };

  var jsonData = JSON.stringify(data);
  var api_key = process.env.API_KEY;
  var list_key = process.env.LIST_KEY;
  var options = {
    url: "https://us5.api.mailchimp.com/3.0/lists/" + list_key,
    method: "POST",
    headers: {
      "Authorization": "taylorholl " + api_key,

    },
    body: jsonData
  };

  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

  });

  console.log(firstName, lastName, emailName);

});

app.post("/failure", function(req, res) {
  res.redirect("/");
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000.");
});
