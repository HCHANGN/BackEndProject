var mongoose = require("mongoose"),
	Campground = require("./models/campground"),
	Comment 	=require("./models/comment"),
	
	data=[
		{
			name:"cloud's rest",
			image:"https://images.unsplash.com/photo-1510711789248-087061cda288?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80",
			description:"AppWorks School 重視實戰經驗，將透過專案的階段性目標，引導你循序漸進地自學，從實作各種功能到獨立自主完成專案，累積大量開發經驗並建立個人作品集，從中培養出「解決問題」與「自主學習」的能力。"
		},
		{
			name:"Dessert Mesa",
			image:"https://images.unsplash.com/photo-1548167390-863d815de934?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2704&q=80",
			description:"AppWorks School 的目標在幫助你投身網路業，除了紮實的技術力養成，我們也將協助你透過履歷與面試，展現個人特質，並在畢業前安排就業媒合活動，協助你找到理想舞台，一展長才。"
		},
		{
			name:"Canyon Floor",
			image:"https://images.unsplash.com/photo-1533647326420-d4097513dc42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80",
			description:"由活躍於業界第一線的 AppWorks Startups 技術長與資深工程師組成的業師群，直接與你分享網路公司的技術架構、組織文化、工作方法，讓你更快了解業界實務。"
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
