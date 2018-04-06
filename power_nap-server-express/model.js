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
		'name':{type:String, require:true, default:''},
		'userid':{type:String, require:true},
		'isPublic':{type:Boolean, require:true,default:true},
		'desc':{type:String},
		'target_desc':{type:String},
		'tags':{type:String},
		'state':{type:String},
		'category':{type:String},
		'praised_users':{type:String},
		'relative_notes':{type:String},
		'stages':{type:String},
		'create_time':{type:Number,default:Date.now},
		'update_time':{type:Number,default:Date.now},
		'start_time':{type:Number,default:0},
		'plan_time':{type:Number,default:0},
		'finish_time':{type:Number,default:0}
	},
	'stage':{
		'name':{type:String, require:true, default:''},
		'planid':{type:String, require:true},
		'desc':{type:String},
		'target_desc':{type:String},
		'state':{type:String},
		'relative_notes':{type:String},
		'stages':{type:String},
		'create_time':{type:Number,default:Date.now},
		'update_time':{type:Number,default:Date.now},
		'start_time':{type:Number,default:0},
		'plan_time':{type:Number,default:0},
		'finish_time':{type:Number,default:0}
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


