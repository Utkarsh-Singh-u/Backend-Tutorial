const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function(req,res){
  res.send("champion mera anuj");
});

app.get("/Profile", function(req,res){
  res.send("about page ha yai");
}); 

app.get("/Profile", function(req,res){
  res.send("Profile page ha yai");
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(3000);
  