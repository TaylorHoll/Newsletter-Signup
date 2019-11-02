//jshint esversion:6


const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");

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

  var options = {
    url: "https://us5.api.mailchimp.com/3.0/lists/2035911bd3",
    method: "POST",
    headers: {
      "Authorization": "taylorholl 7f26e6fbd9dcbcb2746afc6ea18598a1-us5 "

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

//API Key
//7f26e6fbd9dcbcb2746afc6ea18598a1-us5



//listID
//2035911bd3
