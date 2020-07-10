var mongoose = require("mongoose"),
	Campground = require("./models/campground"),
	Comment 	=require("./models/comment"),
	
	data=[
		{
			name:"cloud's rest",
			image:"https://images.unsplash.com/photo-1510711789248-087061cda288?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80",
			description:"Wow Blah Blah Blah"
		},
		{
			name:"Dessert Mesa",
			image:"https://images.unsplash.com/photo-1548167390-863d815de934?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2704&q=80",
			description:"Wow Blah Blah Blah"
		},
		{
			name:"Canyon Floor",
			image:"https://images.unsplash.com/photo-1533647326420-d4097513dc42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80",
			description:"Wow Blah Blah Blah"
		}
	]

function seedDB(){
	//Remove all campgrounds
	Campground.remove({},function(err){
		if(err){
			console.log(err)
		}
		else{
			console.log("Campground Removed!");
				//Add a few campgrounds
			data.forEach(function(seed){
				Campground.create(seed,function(err,campground){
					if(err){
						console.log(err);
					}
					else{
						console.log("Just added a campground");
						//Add a few comments
						Comment.create({
							text:"This place is great but I wish there was internet",
							author:"Homer"
						},function(err,comment){
							if(err){
								console.log(err);
							}
							else{
								campground.comments.push(comment);
								campground.save();
								console.log("Created new comment");
							}
						});
					}
				});
				
			});
		}
	});
	//Add a few campgrounds
	// data.forEach(function(seed){
	// 	Campground.create(seed,function(err,data){
	// 		if(err){
	// 			console.log(err);
	// 		}
	// 		else{
	// 			console.log("Just added a campground");
	// 		}
	// 	});
	// });
	
};

module.exports = seedDB;
