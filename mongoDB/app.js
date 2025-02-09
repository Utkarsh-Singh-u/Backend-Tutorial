const express = require('express');
const app=express();

const userModel = require('./usermodel');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req,res)=>{
  res.send("hey");
});

app.get('/create', async (req,res) =>{
  let createduser=await userModel.create({
    name:"utkarsh",
    email:"utkarsh@gmail.com",
    username:"utkarsh"
  });
  res.send(createduser);
});

app.get('/update', async (req,res) =>{
  let updateduser = await userModel.findOneAndUpdate({username:"utkarsh"}, {name:"UTKARSH SINGH"}, {new :true})
  res.send(updateduser);
});
// to read more than one 
app.get('/read' , async (req,res) =>{
  let users =await userModel.find();
  res.send(users);
});
// to read only once this wilkl give array
app.get('/read' , async (req,res) =>{
  let users =await userModel.find({username:"utkarsh"});
  res.send(users);
});
// also one more way to read once this will give you object and also return first persoini with that id 
app.get('/read' , async (req,res) =>{
  let users =await userModel.findOne({username:"utkarsh"});
  res.send(users);
});

app.get('/delete' , async (req,res) =>{
  let users =await userModel.findOneDelete({username:"utkarsh"});
  res.send(users);
});

app.listen(3000);

