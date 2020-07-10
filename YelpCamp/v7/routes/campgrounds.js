var express= require("express");
var router=express.Router();
var Campground=require("../models/campground");

//INDEX - show all campgrounds
router.get("/",function(req,res){
	//Get campgrounds from DB
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log(err);
		}
		else{
			//Render campgrounds in DB
			res.render("campgrounds/index",{campgrounds:allCampgrounds});
		}
	});
	
});

//CREATE - add new data to DB 
router.post("/",function(req,res){
	var name=req.body.name;
	var image=req.body.image;
	var discription=req.body.discription;
	var newCampground={name:name,image:image,discription:discription};
	//Crate a new campground and save it to database
	Campground.create(newCampground,function(err,createdCampground){
		if(err){
			console.log(err);
		}
		else{
			console.log("New campground added");
			console.log(createdCampground);
			//redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});	
});

//NEW - show form to let user create new campground
router.get("/new", function(req,res){
	res.render("campgrounds/new.ejs");
});

//SHOW - shows info about one campground
router.get("/:id", function(req,res){
	//find campground with provided id
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
		}
		else{
			// console.log("find:");
			// console.log(foundCampground);
			//render show template with that campground
			res.render("campgrounds/show",{campground:foundCampground});
			
		}
	})
});

module.exports = router;