const express = require('express');
const models = require('../model');
const utility = require('utility');
const Router = express.Router();

// get User DB model
const User = models.getModel('user');

/**
 * @api {get} /user/:id All users information
 * @apiName GetUser
 * @apiGroup User
 * 
 * @apiSuccess {Number} status 0 means ok .
 * @apiSuccess {JSON} data All users JSON objects.
 * @apiVersion 1.0.0
 */
Router.get('/all', function(req, res){
	User.find({}, function(err, doc){
		if (!err){
			return res.json({code:0, data:doc});
		}else{
			return res.json({code:1, msg:err});
		}
	});
});

/**
 * @api {post} /user/register Register a user
 * @apiName Register
 * @apiGroup User
 *
 * @apiParam {String} username  user's name.
 * @apiParam {String} pwd  user setting his password.
 *
 * @apiSuccess {Number} status 0 means ok .
 * @apiSuccess {JSON} data this user info with its mongodb _id param.
 * @apiVersion 1.0.0
 */
Router.post('/register', function(req, res){
	const {username, pwd} = req.body;

	User.findOne({username}, function(err, doc){
		if (doc){ // repeat register
			return res.json({code:1, msg:'user existed'});
		}

		// user not exist this name is usefull
		// create a user in mongodb
		const userModel = new User({username, pwd:md5(pwd)});
		userModel.save(function(err, doc){
			if (err) {
				return res.json({code:1, msg:'insert into db error'});
			}

			const {username, _id} = doc;
			return res.json({code:0, data:{ _id, username}});
		});
	});
});

/**
 * @api {post} /user/delete Delete a user by _id
 * @apiName Delete A User
 * @apiGroup User
 *
 * @apiParam {String} userid  user's _id.
 *
 * @apiSuccess {Number} status 0 means ok .
 * @apiSuccess {JSON} data this user info with its mongodb _id param.
 * @apiVersion 1.0.0
 */
Router.post('/delete', function(req, res){
	const userid = req.body.userid;
	if (!userid) {
		return res.json({code:1, msg:'param userid is need'});
	}

	User.findOne({_id:userid}, function(err, doc){
		if (!doc) {
			return res.json({code:1, msg:'delete error, user may not exist '});
		}

		User.remove({_id:userid}, function(err, doc){
			if (!err) {
				return res.json({code:0, msg:'delete success'});
			} else {
				return res.json({code:1, msg:'delete error'});
			}
		});
	});
});

/**
 * @api {post} /user/update Update a user infomation
 * @apiName Update A User infomation
 * @apiGroup User
 *
 * @apiParam {String} userid  user's _id.
 * @apiParam {String} pwd  user's password.
 * @apiParam {String} avatar  user's avatar.
 * @apiParam {String} gender  user's gender.
 * @apiParam {String} desc  user's desc.
 * @apiParam {String} tags  user's tags.
 * @apiParam {String} watching_user_ids  the others this user is watching  .
 * @apiParam {String} followed_user_ids  others watch this user.
 *
 * @apiSuccess {Number} status 0 means ok .
 * @apiSuccess {JSON} data this user info with its mongodb _id param and your update datas.
 * @apiVersion 1.0.0
 */
Router.post('/update', function(req, res){
	const body =  req.body;
	const { userid } = body;
	if (!userid) {
		return res.json({code:1, msg:'param userid is need'});
	}

	User.findOne({_id:userid}, function(err, doc){

		if(!doc){
			return res.json({code:1, msg:'update error, user may not exist '});
		}

		// update , pwd is different 
		// const newPwd = body.pwd ? md5(body.pwd):doc.pwd;
		const updateData = Object.assign({}, body,{
			update_time:Date.now(),
			pwd:body.pwd ? md5(body.pwd):doc.pwd
		}); 

		User.findByIdAndUpdate({_id:userid}, updateData, function(err, doc){
			if (err) {
				return res.json({code:1, msg:'update err'});
			}
			const rspData = Object.assign({}, {
				_id: doc._id
			}, updateData); 
			return res.json({code:0, data:rspData});
		});
	});
});

/**
 * @api {post} /user/findById Find a user infomation By userid
 * @apiName Find A User infomation By userid
 * @apiGroup User
 *
 * @apiParam {String} userid  user's _id.
 *
 * @apiSuccess {Number} status 0 means ok .
 * @apiSuccess {JSON} data this user info with its mongodb _id param and your update datas.
 * @apiVersion 1.0.0
 */
Router.post('/findById', function(req, res){
	const body =  req.body;
	const { userid } = body;
	if (!userid) {
		return res.json({code:1, msg:'param userid is need'});
	}

	User.findOne({_id:userid}, function(err, doc){
		if (err){
			return res.json({code:1, msg:'cannot find this user '});
		}

		return res.json({code:0, data:doc});
	});
});

// util function make pwd in md5 function 
function md5(pwd){
	const salt = '*salt*power_nap#@~~8888!';
	return utility.md5(utility.md5(pwd + salt));
}
module.exports = Router;