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
router.post("/",isLoggedIn,function(req,res){
	var name=req.body.name;
	var image=req.body.image;
	var description=req.body.description;
	var author={
		id:req.user._id,
		username:req.user.username
	};
	var newCampground={name:name,image:image,description:description,author:author};
	//Crate a new campground and save it to database
	Campground.create(newCampground,function(err,newlyCreated){
		if(err){
			console.log(err);
		}
		else{
			console.log("New campground added");
			console.log(newlyCreated);
			//redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});	
});

//NEW - show form to let user create new campground
router.get("/new",isLoggedIn, function(req,res){
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

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", checkCampgroundOwnership, function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		res.render("campgrounds/edit",{campground:foundCampground});
	});
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id",checkCampgroundOwnership,function(req,res){
	//find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			//redirect to somewhere (usually the show page)
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id",checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			res.redirect("/campgrounds");
		}
	});
});

//==============
//Middleware
//==============
//logged in check
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

//Authorization
function checkCampgroundOwnership(req,res,next){
	//is logged in?
	if(req.isAuthenticated()){
		
		Campground.findById(req.params.id,function(err,foundCampground){
			if(err){
				res.redirect("back");
			}
			else{
				//does user own the campground post?
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				}
				else{
					console.log("No permission!");
					res.redirect("back");
				}
			}
		});
	}
	else{
		console.log("You need to log in to do it!");
		res.redirect("back");
	}
}



module.exports = router;