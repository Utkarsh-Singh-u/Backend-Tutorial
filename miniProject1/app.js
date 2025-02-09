const express= require("express");
const app = express();
const userModel= require('./models/user');
const postModel= require('./models/post');
const cookieParser = require("cookie-parser");
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const post = require("./models/post");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/', (req,res)=>{
  res.render('index');
});

app.post('/register', async (req,res)=>{
  let {username, email, password, age, name} = req.body;

  let user=await userModel.findOne({email});
  if(user) return res.status(500).send("user already exists");

  bcrypt.genSalt(10, (err, salt)=>{ 
    bcrypt.hash(password, salt, async (err, hash)=>{ 
      let user=await userModel.create({
        username,
        email,
        password:hash,
        age,
        name
      });
      let token=jwt.sign({email:email, userid:user._id}, "shhh");
      res.cookie("token",token);
      res.send("registered");
    })
  })
});

app.get('/login', (req,res)=>{
  res.render('login');
});

app.post('/login', async (req,res)=>{
  let {email, password} = req.body;

  let user=await userModel.findOne({email});
  if(!user) return res.status(500).send("Something Went Wrong.");

  bcrypt.compare(password, user.password, (err, result)=>{
    if(result){ 
      let token=jwt.sign({email:email, userid:user._id}, "shhh");
      res.cookie("token",token);
      res.status(200).redirect("/profile")
    }
    else res.redirect("/login");
  });
});

app.get('/logout', (req,res)=>{
  res.cookie("token","");
  res.redirect('/login');
});

app.get('/profile',isLoggedIn ,async (req,res)=>{
  // see that why to use populate here
  let user=await userModel.findOne({email: req.user.email}).populate("posts");
  res.render("profile",{user});
});

app.post('/post',isLoggedIn ,async (req,res)=>{
  let user=await userModel.findOne({email: req.user.email})
  let {content} = req.body;

  let post = await postModel.create({
    content,
    user:user._id
  });
  //telling user that post is created
  user.posts.push(post._id);
  await user.save();
  res.redirect('/profile'); 
});

app.get('/like/:id',isLoggedIn ,async (req,res)=>{
//populate is used here so that on place of post id we get post content/data 
  let post=await postModel.findOne({_id: req.params.id}).populate("user");
  if(post.likes.indexOf(req.user.userid) === -1){
    post.likes.push(req.user.userid);
  }
  else{
    post.likes.splice(post.likes.indexOf(req.user.userid),1);
  }
  await post.save();
  res.redirect("/profile");
});

app.get('/edit/:id',isLoggedIn ,async (req,res)=>{
  //populate is used here so that on place of post id we get post content/data 
    let post=await postModel.findOne({_id: req.params.id}).populate("user");
    res.render("edit",{post});
});

app.post('/update/:id',isLoggedIn ,async (req,res)=>{
  //populate is used here so that on place of post id we get post content/data 
    let post=await postModel.findOneAndUpdate({_id: req.params.id},{content: req.body.content});
    res.redirect("/profile",);
});

function isLoggedIn(req,res,next){
  if(req.cookies.token==="") res.redirect("/login");
  try {
    let data = jwt.verify(req.cookies.token, "shhh");
    req.user = { ...data, userid: data.userid.toString() };
    next();
  } catch (err) {
      res.redirect("/login");
  }
  
}

app.listen(3000);