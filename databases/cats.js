var mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/cat_app");


var catSchema = new mongoose.Schema({
	name:String,
	age:Number,
	temperament:String	
})

var Cat = mongoose.model("Cat",catSchema);
//add new cat to data base

// var george = new Cat({
// 	name:"Mrs. Norris",
// 	age:7,
// 	temperament:"Evil"
// }
// );

// george.save(function(err, cat){
// 	if(err){
// 		console.log("Something went wrong!!");
// 	}
// 	else{
// 		console.log("We just add a cat \n"+cat);
// 		console.log("We just add a george \n"+george);
// 	}
// });

Cat.create({
	name:"Snow white",
	age:15,
	temperament:"Bland"
},function(err,cat){
	if(err){
		console.log(err);
	}
	else{
		console.log(cat);
	}
});

//retrieve all cat in database and console.log each one

Cat.find({},function(err,cats){
	if(err){
		console.log("Oh no \n"+err);
	}
	else{
		console.log("All the cats: \n"+cats+"\n");
	}
	
});