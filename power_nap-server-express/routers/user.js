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
 * @api {post} /user/:id Register a user
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
	console.log(req.body);
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

// make pwd in md5 function 
function md5(pwd){
	const salt = '*salt*power_nap#@~~8888!';
	return utility.md5(utility.md5(pwd + salt));
}
module.exports = Router;