var express=require("express");
var app=express();
var bodyParser= require("body-parser");
var campgrounds=[
		{name:"Mojave", image:"https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402_1280.jpg"},
		{name:"Capital", image:"https://cdn.pixabay.com/photo/2020/02/04/10/42/camping-4817872_1280.jpg"},
		{name:"Geeek hill", image:"https://cdn.pixabay.com/photo/2016/02/09/16/35/night-1189929_1280.jpg"}
	];


app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

app.get("/",function(req,res){
	res.render("landing");
});

app.get("/campgrounds",function(req,res){

	res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds",function(req,res){
	var name=req.body.name;
	var image=req.body.image;
	var newCampground={name:name,image:image};
	campgrounds.push(newCampground);
	//get data from form and add it to campgrounds array
	//redirect back to campgrounds page
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req,res){
	res.render("new.ejs");
})

app.listen(3000,function(){
	console.log("YelpCamp Server jas started");
});