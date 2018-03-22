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
		'create_time':{type:Number,default:Date.now},
		'update_time':{type:Number,default:Date.now},
		'watching_user_ids':{type:String},
		'followed_user_ids':{type:String}
	},

	// note model definition
	'note':{
		'title':{type:String, require:true, default:''},
		'public':{type:Boolean, require:true,default:true},
		'userid':{type:String, require:true},
		'sub_title':{type:String},
		'content':{type:String, default:''},
		'tags':{type:String},
		'create_time':{type:Number,default:Date.now},
		'update_time':{type:Number,default:Date.now}
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


