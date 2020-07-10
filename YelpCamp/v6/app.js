var express		=require("express"),
	app	      	=express(),
	bodyParser	=require("body-parser"),
	mongoose	=require("mongoose"),
	passport    =require("passport"),
	LocalStrategy=require("passport-local"),
	User		=require("./models/user"),
	Campground  =require("./models/campground"),
	Comment		=require("./models/comment"),
	seedDB		=require("./seeds");
	

mongoose.connect("mongodb://localhost:27017/yelp_camp_v3", {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

app.use(express.static(__dirname+"/public"));

seedDB();

//==================
//passport configuration
//==================
app.use(require("express-session")({
	secret:"Rusty",
	resave:false,
	saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	next();
});

//schema setup
// var campgroundSchema = new mongoose.Schema({
// 	name:String,
// 	image:String,
// 	discription:String
// });
// var Campground = mongoose.model("Campground",campgroundSchema);


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
			res.render("campgrounds/index",{campgrounds:allCampgrounds});
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
	res.render("campgrounds/new.ejs");
});

//SHOW - shows info about one campground
app.get("/campgrounds/:id", function(req,res){
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

//==========================
//COMMENTS ROUTES
//==========================
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		}
		else{
			res.render("comments/new",{campground:campground});
		}
	});
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req,res){
	//look up campground using id
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/");
		}
		else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err);
				}
				else{
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/"+campground._id);
				}
			});
		}
	});
	//create new comment
	//connect new comment to campground
	//redirect to campground show page
});

//============================
//AUTH ROUTES
//============================
//show register form
app.get("/register",function(req,res){
	res.render("register");
});
//handle sign up logic
app.post("/register",function(req,res){
	var newUser = new User({username:req.body.username});
	User.register(newUser, req.body.password, function(err,user){
		if(err){
			console.log(err);
			return res.render("/register");
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/campgrounds");
		});
	});
});

//show login form
app.get("/login",function(req,res){
	res.render("login");
});

//handling login logic
app.post("/login", passport.authenticate("local", {
	successRedirect:"/campgrounds",
	failureRedirect:"/login"
}), function(req,res){
});

//Logout Route
app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


app.listen(3000,function(){
	console.log("YelpCamp Server jas started");
});