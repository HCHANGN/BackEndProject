var express		=require("express"),
	app	      	=express(),
	bodyParser	=require("body-parser"),
	mongoose	=require("mongoose")

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

//schema setup
var campgroundSchema = new mongoose.Schema({
	name:String,
	image:String,
	discription:String
});

var Campground = mongoose.model("Campground",campgroundSchema);

//Manually add Campground
// Campground.create({
// 	name:"Granite Hill",
// 	image:"https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402_1280.jpg",
// 	discription:"This is a huge Granite Hill, no bathroom, no water, beautiful Granite!"
	
// },function(err,campground){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log("you just add a new campground: ");
// 		console.log(campground);
// 	}
// })


//INDEX - show all campgrounds
app.get("/",function(req,res){
	res.render("landing");
});

app.get("/campgrounds",function(req,res){
	//Get campgrounds from DB
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log(err);
		}
		else{
			//Render campgrounds in DB
			res.render("index",{campgrounds:allCampgrounds});
		}
	});
	
});

//CREATE - add new data to DB 
app.post("/campgrounds",function(req,res){
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
app.get("/campgrounds/new", function(req,res){
	res.render("new.ejs");
})

//SHOW - shows info about one campground
app.get("/campgrounds/:id", function(req,res){
	//find campground with provided id
	Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			console.log(err);
		}
		else{
			console.log("find:");
			console.log(foundCampground);
			//render show template with that campground
			res.render("show",{campground:foundCampground});
			
		}
	})
})

app.listen(3000,function(){
	console.log("YelpCamp Server jas started");
});