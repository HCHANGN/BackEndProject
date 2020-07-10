var bodyParser 		 = require("body-parser"),
	methodOverride	 = require("method-override"),
	expressSanitizer = require("express-sanitizer"),
	mongoose   		 = require("mongoose"),
	express    		 = require("express"),
	app        		 = express();

//APP config
mongoose.connect("mongodb://localhost:27017/restful_blog_app", {useNewUrlParser: true, useUnifiedTopology: true});
app.set("view engine","ejs");
//surf costum style sheet in public
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
//expressSanitizer should be use after bodyParser
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//MONGOOSE model config
var blogSchema=new mongoose.Schema({
	title:String,
	image:String,
	body:String,
	created:{
		type:Date, 
		default:Date.now
	}
});

var Blog=mongoose.model("Blog",blogSchema);
//Blog should have a.title b.image c.body 
//Create data Manually
// Blog.create({
// 	title:"Test Blog",
// 	image:"https://4.bp.blogspot.com/-l_aX0E6Tfhw/WNf2TjlRjJI/AAAAAAABB-Y/ZoaZV_8q05opUDGC2Lno3sWjc-6NwIdAQCEw/s1600/NIER.jpg",
// 	body:"Hello! This is a Blog Post abput Nier:autometa"
// });

//RESTful ROUTES

//IDEX ROUTE
app.get("/", function(req,res){
	res.redirect("/blogs");
});
app.get("/blogs", function(req,res){
	Blog.find({},function(err,blogs){
		if(err){
			console.log(err);
		}
		else{
			res.render("index",{blogs:blogs});
		}
	})
});

//NEW ROUTE
app.get("/blogs/new",function(req,res){
	res.render("new");
});


//CREATE ROUTE
app.post("/blogs",function(req,res){
	//create blog
	console.log(req.body);
	req.body.blog.body = req.sanitize(req.body.blog.body);
	console.log("===============================");
	console.log(req.body);
	Blog.create(req.body.blog, function(err,newBlog){
		if(err){
			res.render("new");
		}
		else{
			//redirect to blogs index
			res.redirect("/");
		}
	})
});

//SHOW ROUTE
app.get("/blogs/:id", function(req,res){
	Blog.findById(req.params.id, function(err,foundBlog){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.render("show",{blog:foundBlog});
		}
	});
});

//EDIT ROUTE
app.get("/blogs/:id/edit",function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err){
			res.redirect("/");
		}
		else{
			res.render("edit",{blog:foundBlog});
		}
	});
});

//UPDATE ROUTE
app.put("/blogs/:id",function(req,res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
		if(err){
			res.redirect("/");
		}
		else{
			res.redirect("/blogs/"+req.params.id);
		}
	});
});

//DELETE ROUTE
app.delete("/blogs/:id",function(req,res){
	//Delete blog
	Blog.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/");
		}
		else{
			//Redirect somewhere
			res.redirect("/");
		}
	});
	
});


app.listen(3000,function(){
	console.log("Server start!");
});
	
