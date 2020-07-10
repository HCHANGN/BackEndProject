var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo", {useNewUrlParser: true, useUnifiedTopology: true});

//POST - title , content
var postSchema = new mongoose.Schema({
	title:String,
	content:String
});

var Post = mongoose.model("Post",postSchema);

//USER - email , name
var userSchema = new mongoose.Schema({
	email:String,
	name:String,
	//need to have define postSchema first
	posts:[postSchema]
});

var User = mongoose.model("User",userSchema);



//Create new user manually

// var newUser = new User({
// 	email:"hermione@hogwarts.edu",
// 	name:"Hermione Granger"
// });

// newUser.posts.push({
// 	title:"How to bre ployjuice potion",
// 	content:"Just kidding, go to potion class to learn it"
// });

// newUser.save(function(err,user){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(user);
// 	}
// });

//Create new post manually

// var newPost = new Post({
// 	title:"Reflections from Apples",
// 	content:"They are delicious"
// });

// newPost.save(function(err,post){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(post);
// 	}
// })

User.findOne({name:"Hermione Granger"},function(err,user){
	if(err){
		console.log(err);
	}
	else{
		user.posts.push({
			title:"Three things that I really hate",
			content:"Voldemort Voldemort Voldemort"
		});
		user.save(function(err,user){
			if(err){
				console.log(err);
			}
			else{
				console.log(user);
			}
		})
	}
});

