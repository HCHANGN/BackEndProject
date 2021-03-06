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

//Requiring routes
var campgroundRoutes=require("./routes/campgrounds");
var commentRoutes= require("./routes/comments");
var indexRoutes =require("./routes/index");
	
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

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000,function(){
	console.log("YelpCamp Server jas started");
});