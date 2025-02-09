const express = require('express')
const app = express();

app.get("/", function(req,res){
  res.send("champion m era anuj");
});

app.get("/Profile", function(req,res){
  res.send("champion uska coach");
}); 

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(3000);
  