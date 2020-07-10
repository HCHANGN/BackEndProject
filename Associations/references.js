var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo_2", {useNewUrlParser: true, useUnifiedTopology: true});

//POST - title , content
// var postSchema = new mongoose.Schema({
// 	title:String,
// 	content:String
// });
// var Post = mongoose.model("Post",postSchema);

var Post = require("./models/post");



//USER - email , name
// var userSchema = new mongoose.Schema({
// 	email:String,
// 	name:String,
// 	posts:[{
// 		type:mongoose.Schema.Types.ObjectId,
// 		ref:"Post"
// 	}]
// });

// var User = mongoose.model("User",userSchema);

var User = require("./models/user");

///create post manually
Post.create({
	title:"How to cook the best burger part 3",
	content:"Blah Blah Blah NO NO !! YESYES"
},function(err,post){
	User.findOne({email:"bob@gmail.com"},function(err,foundUser){
		if(err){
			console.log(err);
		}
		else{
			foundUser.posts.push(post);
			foundUser.save(function(err, data){
				if(err){
					console.log(err);
				}
				else{
					console.log(data);
				}
			})
		}
	})
});
///////////////////ceate user manually
// User.create({
// 	email:"bob@gmail.com",
// 	name:"Bob Belcher"
// });


///find user
///find all posts of that user
// User.findOne({email:"bob@gmail.com"}).populate("posts").exec(function(err,user){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(user);
// 	}
// });