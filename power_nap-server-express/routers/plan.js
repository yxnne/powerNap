const express = require('express');
const Router = express.Router();
const models = require('../model');
const Plan = models.getModel('plan');
const User = models.getModel('user');

/**
 * @api {post} /plan/new Create a new Plan
 * @apiName Create Plan
 * @apiGroup Plan
 *
 * @apiParam {String} userid  the user's id who is belong to this plan.
 * @apiParam {String} name  name
 * @apiParam {String} desc  this plan's description
 * @apiParam {String} target_desc  the target of plan
 * @apiParam {String} state  how about this plan now
 * @apiParam {Boolean} public  if public to others
 * @apiParam {String} tags  tags of plan
 * @apiParam {String} category  category of plan
 * @apiParam {String} praised_users  user ids about who praised this plan
 * @apiParam {String} relative_notes  some notes refer to this plan
 * @apiParam {String} stages  stages of this plan
 * @apiParam {Number} finish_time  finish time of this plan 
 *
 * @apiSuccess {Number} status 0 means ok .
 * @apiSuccess {JSON} data this note infomation.
 * @apiVersion 1.0.0
 */
Router.post('/new', function(req, res){
	const body = req.body;
	const userid = body.userid;
	// a note cannot without an user id
	if (!userid){
		return res.json({code:1, msg:"plan cannot be created without user_id"});
	}

	// with this user but cannot find user
	User.findOne({_id:userid}, function(err, doc){
		if (!doc) {
			return res.json({code:1, msg:"no user found with this user_id"});
		}

		const planModel = new Plan(body);
		planModel.save(function(err, doc){
			if (err) {
				return res.json({code:1, msg:'new plan error'});
			}
			return res.json({code:0, data:doc});
		});
	});
});

/**
 * @api {post} /plan/delete Delete Note by planid
 * @apiName delete
 * @apiGroup Plan
 *
 * @apiParam {String} planid id of the user
 *
 * @apiSuccess {Number} status 0 means ok .
 * @apiSuccess {JSON} data this plan infomation.
 * @apiVersion 1.0.0
 */
Router.post('/delete', function(req, res){
	const planid = req.body.planid;
	if (!planid) {
		return res.json({code:1, msg:"no planid param"});
	}

	Plan.findOne({_id:planid}, function(err, doc){

		if(!doc){
			return res.json({code:1, msg:"find no plan as this id"});
		}
		Plan.remove({_id:planid}, function(err, doc){
			if(err){
				return res.json({code:1, msg:"delete error"});
			}
			return res.json({code:0, msg:"delete success"});
		});
	});
});

/**
 * @api {post} /plan/update Update a Plan
 * @apiName Update Plan
 * @apiGroup Plan
 *
 * @apiParam {String} userid  the user's id who is belong to this plan.
 * @apiParam {String} name  name
 * @apiParam {String} desc  this plan's description
 * @apiParam {String} target_desc  the target of plan
 * @apiParam {String} state  how about this plan now
 * @apiParam {Boolean} public  if public to others
 * @apiParam {String} tags  tags of plan
 * @apiParam {String} category  category of plan
 * @apiParam {String} praised_users  user ids about who praised this plan
 * @apiParam {String} relative_notes  some notes refer to this plan
 * @apiParam {String} stages  stages of this plan
 * @apiParam {Number} finish_time  finish time of this plan 
 *
 * @apiSuccess {Number} status 0 means ok .
 * @apiSuccess {JSON} data this plan infomation.
 * @apiVersion 1.0.0
 */
Router.post('/update', function(req, res){
	const body = req.body;
	const planid = body.planid;
	if (!planid) {
		return res.json({code:1, msg:"no planid param"});
	}

	Plan.findOne({_id:planid}, function(err, doc){
		if (!doc) {
			return res.json({code:1, msg:"cannot find note by this planid"});
		}

		const updateData = Object.assign({}, body,{
			update_time:Date.now()
		}); 
		// find and update it
		// there is an option setting in 3rd param means doc data is after you update
		Plan.findByIdAndUpdate({_id:planid}, updateData, {new:true}, function(err, doc){

			if (err) {
				return res.json({code:1, msg:"update error"});
			}

			return res.json({code:0, data:doc});
		});
	});

});

/**
 * @api {post} /plan/findAllByUserId Get Plans Belong To One User
 * @apiName findAllByUserId
 * @apiGroup Plan
 *
 * @apiParam {String} userid id of the user
 *
 * @apiSuccess {Number} status 0 means ok .
 * @apiSuccess {JSON} data this plans infomation.
 * @apiVersion 1.0.0
 */
Router.post('/findAllByUserId', function(req, res){
	const body = req.body;
	const userid = body.userid;
	// a note cannot without an user id
	if (!userid){
		return res.json({code:1, msg:"note cannot be created without user_id"});
	}

	// with this user but cannot find user
	User.findOne({_id:userid}, function(err, doc){
		if (!doc) {
			return res.json({code:1, msg:"no user found with this user_id"});
		}

		// according to the userid find the user's note
		Plan.find({userid:doc._id}, function(err, doc){
			
			return res.json({code:0, data:doc});
		}); 
	});

});

/**
 * @api {post} /plan/findOneById Get One plan By Plan id
 * @apiName findOneById
 * @apiGroup Plan
 *
 * @apiParam {String} planid  id of note
 *
 * @apiSuccess {Number} status 0 means ok .
 * @apiSuccess {JSON} data this plan infomation.
 * @apiVersion 1.0.0
 */
Router.post('/findOneById', function(req, res){
	const planid = req.body.planid;
	if (!planid) {
		return res.json({code:1, msg:"no planid param"});
	}

	Plan.findOne({_id:planid}, function(err, doc){
		if (!doc) {
			return res.json({code:1, msg:"cannot find note by this planid"});
		}
		return res.json({code:0, data:doc});
	});
});

/**
 * @api {post} /plan/all Get All Plans In System For Debug
 * @apiName All Plans
 * @apiGroup Plan
 *
 * @apiSuccess {Number} status 0 means ok .
 * @apiSuccess {JSON} data this plans infomation.
 * @apiVersion 1.0.0
 */
Router.get('/all', function(req, res){
	Plan.find({}, function(err, doc){
		if (err) {
			return res.json({code:1, msg:"find all plans error"});
		}

		return res.json({code:0, data:doc});
	});
});

module.exports = Router;