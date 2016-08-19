var express = require('express');
var path = require('path');
var app = express();
var mongoose = require('mongoose');

mongoose.connect("mongodb://mongo:mongo01@ds051923.mlab.com:51923/mymongo");
var db = mongoose.connection;
db.once("open", function(){
  console.log("DB connected!");
});
db.on("error", function(err){
  console.log("DB ERROR :", err);
});
var dataSchema = mongoose.Schema({
  name:String,
  count:Number
});
var Data = mongoose.model('data', dataSchema);
Data.findOne({name:"myData"},function(err,data){
  if(err) return console.log("Data Error:",err);
  if(!data){
    Data.create({name:"myData", count:0}, function(err,data){
      if(err) return console.log("Data Error:", err);
      console.log("Connter initialized:", data);
    });
  }
});

app.set("view engine", 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.render('first_ejs!');
});



app.listen(3000, function(){
  console.log('Server On!');
});
