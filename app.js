//jshint esversion:8
const express=require("express");
const https=require("https");
// const request=require("request");
const app=express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
var b="";
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const _=require("lodash");
mongoose.connect("mongodb+srv://ShreyasJakati:20169361Shreyas@cluster0.m7dbtps.mongodb.net/todoListDB",{useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended:true}));
const listschema=new mongoose.Schema({
name:String
});
const Item=new mongoose.model("Item",listschema);
const ListSchema1=new mongoose.Schema({
  name:String,
  items:[listschema]
});
const List=new mongoose.model("List",ListSchema1);
const item1=new Item({
  name:"Welcome"
});
const item2=new Item({
  name:"Get started"
});
const item3=new Item({
  name:"<-- Press to delete this one !"
});
const itemss=[item1,item2,item3];
app.get("/",function(req,res){
  Item.find({},function(err,founditems){
    if(founditems.length===0)
    {
      Item.insertMany(itemss,function(err){
        if(err) console.log(err);
        else console.log("Saved Successfully");
      });
      res.redirect("/");
    }
    else{
    res.render('list', {ListTitle:"Today",newitem: founditems});
  }
  });
});
app.post("/",function(req,res){
let b=req.body.newone;
let c=req.body.List;
const a=new Item({
  name:b
});
if(c==="Today")
{
  a.save();
  res.redirect("/");
}
else{
  List.findOne({name:c},function(err,foundlist){
    foundlist.items.push(a);
    foundlist.save();
    res.redirect("/"+c);
  });
}
});
app.post("/delete",function(req,res){
  const a=req.body.checkbox;
  const b=req.body.ListName;
  if(b==='Today')
  {
  Item.findByIdAndRemove(a,function(err){
    if(!err) {
        res.redirect("/");
    }
  });
}
else{
  List.findOneAndUpdate({name:b},{$pull:{items:{_id:a}}},function(err,foundlist){
    res.redirect("/"+b);
  });
}
});
app.get('/:dirname', function(req , res){
  let a=req.params.dirname;
//   function jsUcfirst(a)
// {
//     return a.charAt(0).toUpperCase() + a.slice(1);
// }
// a=jsUcfirst(a);
a=_.capitalize(a);
  List.findOne({name:a},function(err,founditem){
    if(!err){
    if(!founditem){
      const itemlist=new List({
        name:a,
        items:itemss
      });
      itemlist.save();
      res.redirect("/"+a);
    }
    else{
      res.render("list",{ListTitle:founditem.name,newitem: founditem.items});
    }
  }
  });
});
// document.querySelector("#abcd").click(function() {
//       document.querySelector("#theform").submit();
// });
let port=process.env.PORT;
if(port==NULL || port=="")
{
  port=3000;
}
app.listen(port,function(){
  console.log("hello");
});


// mongosh "mongodb+srv://cluster0.m7dbtps.mongodb.net/myFirstDatabase" --apiVersion 1 --username ShreyasJakati
