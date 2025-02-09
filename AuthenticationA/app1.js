const express= require('express');
const app= express();

const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

app.use(cookieParser());

app.get("/", function(req, res){
  var token = jwt.sign({ email: 'utkarsh@gmail.com' }, 'secret');
  res.cookie("token", token);
  res.send("done");
})


app.get("/read", function(req,res){
  let data=jwt.verify(req.cookies.token, 'secret');
  console.log(data);
})
 
app.listen(3000);