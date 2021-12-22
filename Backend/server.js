var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var cors = require('cors');
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ethercrash');
var upload = multer();
var app = express();
app.use(cors());
// for parsing application/json
app.use(bodyParser.json()); 
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded
// for parsing multipart/form-data
// app.use(upload.array()); 
// app.use(express.static('public'));

var userSchema = mongoose.Schema({
   mail: String,
   username: String,   
   password: String,   
   level: Number,  
});
var User = mongoose.model("User", userSchema);
app.get('/test', function(req,res){
  res.end("testing ok");
})

app.post('/register', function(req, res){  
  userInfo = req.body;
  userInfo.level=1;
  User.find({mail: userInfo.mail}, "mail", function(err, response){
    if(response.length>0){
      res.end("Mail already exists.")
    }else{    
      const password = bcrypt.hashSync(userInfo.password, 10);
      var newUser = new User({
        mail: userInfo.mail,
        username: userInfo.username,
        password: password,
        level : userInfo.level
      });	

      newUser.save(function(err, User){
        if(err)
          res.end("Database error");
        else{
          // res.end(JSON.stringify(userInfo));
          res.end("Registration Success")
        }
      });
    }
  });   
});
app.post('/login', function(req, res){  
  userInfo = req.body;
  console.log(userInfo)
  userInfo.level=1;
  User.find({mail: userInfo.mail}, "password", function(err, response){
    console.log(response[0])
    if(response.length>0){
      const password = response[0].password;
      console.log(password)
      console.log(bcrypt.compareSync(userInfo.password, password))
      if(bcrypt.compareSync(userInfo.password, password))
        res.end("matching")
      else
        res.end("Wrong password please try again.")
    }else{
      res.end("This mail does not exist.")
    }
  });   
});
app.listen(8080);