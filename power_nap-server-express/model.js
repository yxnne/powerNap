const mongoose = require('mongoose');

// connect the mongodb
const DB_URL = 'mongodb://127.0.0.1:27017/nap';
mongoose.connect(DB_URL);

// models definition

const models = {
	// user model definition
	'user':{
		'username':{type:String, require:true},
		'pwd':{type:String, require:true},
		'avatar':{type:String},
		'gender':{type:String},
		'desc':{type:String},
		'tags':{type:String},
		'create_time':{type:Number,default:Date.now}
	},

	// note model definition
	'note':{

	},

	// plan model definition
	'plan':{

	}
};

// create models
// m in for-in is obj's name 
for(let m in models){
	mongoose.model(m, new mongoose.Schema(models[m]))
}

// export function to get model by name string
module.exports = {
	getModel:function(name){
		return mongoose.model(name);
	}
};


