const mongoose= require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/testingthedatabase");

const userSchema= mongoose.Schema({
  username:String,
  email:String,
  age:Number,
  posts:[
    {
      //this lines tells that the posts are set of id's and its next line say that this id's belongs to which model
      type:mongoose.Schema.Types.ObjectId,
      ref:'post'
    }
  ]
})

module.exports = mongoose.model('user',userSchema);