const express= require('express');
const app = express();
const userModel= require("./models/user");
const postModel= require("./models/post")

app.get("/", (req,res)=>{
  res.send("Hello World");
})

app.get("/create", async (req,res)=>{
  const user = await userModel.create({
    username:"utkarsh",
    age:20,
    email:"utkarsh@gmail.com"
  });
  res.send(user);
})

app.get("/post/create", async (req,res)=>{
  let post= await postModel.create({
    postdata:"heelo bhai kaise ho",
    user:"67a0a67d9904e85758c093e1"
  })

  let user = await userModel.findOne({_id:"67a0a67d9904e85758c093e1"});
  user.posts.push(post._id);
  await user.save();
  res.send({post, user});
})

app.listen(3000);