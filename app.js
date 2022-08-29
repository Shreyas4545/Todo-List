//jshint esversion:6
const express=require("express");
const https=require("https");
// const request=require("request");
const app=express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
var items=["Get up","Do workout","Go for work its workday !"];
var b="";
let workitems=[];
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  var a=new Date();
  var options={
    weekday:"long",
    day:"numeric",
    month:"long"
  };
  // var currentdate=a.getDay();
  // switch (currentdate) {
  //     case 0:
  //     x="Sunday";
  //     break;
  //     case 1:
  //     x="Monday";
  //     break;
  //     case 2:
  //     x="Tuesday";
  //     break;
  //     case 3:
  //     x="Wednesday";
  //     break;
  //     case 4:
  //     x="Thursday";
  //     break;
  //     case 5:
  //     x="Friday";
  //     break;
  //     case 6:
  //     x="Saturday";
  //     break;
  //     default:
  //     console.log("Error ! The day is " + x);

  var day=a.toLocaleDateString("en-US",options);
  res.render('list', {ListTitle: day,newitem: items});
});
app.post("/",function(req,res){
  // console.log(req.body);
let b=req.body.newone;
  if(req.body.List==="Work"){
    workitems.push(b);
    res.redirect("/work");
  }
  else{
    items.push(b);
     res.redirect("/");
  }
});
app.get("/work",function(req,res){
  res.render("list",{ListTitle:"Work List",newitem:workitems});
});
app.get("/about",function(req,res){
   res.render("about");
});
app.listen(process.env.PORT || 3000,function(){
  console.log("hello");
});
