const express = require('express');
const Router = express.Router();
const models = require('../model');
const Stage = models.getModel('stage');
const Plan = models.getModel('plan');

/**
 * @api {post} /stage/new Create a new Stage
 * @apiName Create Stage
 * @apiGroup Stage
 *
 * @apiParam {String} planid  the plan's id who is belonged to this stage.
 * @apiParam {String} name  name
 * @apiParam {String} desc  this stage's description
 * @apiParam {String} target_desc  the target of stage
 * @apiParam {String} state  how about this stage now
 * @apiParam {String} relative_notes  some notes refer to this plan
 * @apiParam {String} stages  stages of this stage
 * @apiParam {Number} start_time  plan to start this plan time, defalut 0
 * @apiParam {Number} plan_time  plan to end this plan time, defalut 0
 * @apiParam {Number} finish_time  actually, finish time of this plan defalut 0
 *
 * @apiSuccess {Number} status 0 means ok .
 * @apiSuccess {JSON} data this note infomation.
 * @apiVersion 1.0.0
 */
Router.post('/new', function(req, res){
	const body = req.body;
	const planid = body.planid;
	// a note cannot without an user id
	if (!planid){
		return res.json({code:1, msg:"stage cannot be created without planid"});
	}

	// with this user but cannot find Plan
	Plan.findOne({_id:planid}, function(err, doc){
		if (!doc) {
			return res.json({code:1, msg:"no plan found with this planid"});
		}

		const stageModel = new Stage(body);
		stageModel.save(function(err, doc){
			if (err) {
				return res.json({code:1, msg:'new stage error'});
			}
			return res.json({code:0, data:doc});
		});
	});
});

/**
 * @api {post} /stage/delete Delete Stage by stageid
 * @apiName delete
 * @apiGroup Stage
 *
 * @apiParam {String} stage id of the user
 *
 * @apiSuccess {Number} status 0 means ok .
 * @apiSuccess {JSON} data this stage infomation.
 * @apiVersion 1.0.0
 */
Router.post('/delete', function(req, res){
	const stageid = req.body.stageid;
	if (!stageid) {
		return res.json({code:1, msg:"no stageid param"});
	}

	Stage.findOne({_id:stageid}, function(err, doc){

		if(!doc){
			return res.json({code:1, msg:"find no stage as this id"});
		}
		Stage.remove({_id:stageid}, function(err, doc){
			if(err){
				return res.json({code:1, msg:"delete error"});
			}
			return res.json({code:0, msg:"delete success"});
		});
	});
});

/**
 * @api {post} /stage/update Update a Stage
 * @apiName Update Stage
 * @apiGroup Stage
 *
 * @apiParam {String} planid  the plan's id who is belonged to this stage.
 * @apiParam {String} name  name
 * @apiParam {String} desc  this stage's description
 * @apiParam {String} target_desc  the target of stage
 * @apiParam {String} state  how about this stage now
 * @apiParam {String} relative_notes  some notes refer to this plan
 * @apiParam {String} stages  stages of this stage
 * @apiParam {Number} start_time  plan to start this plan time, defalut 0
 * @apiParam {Number} plan_time  plan to end this plan time, defalut 0
 * @apiParam {Number} finish_time  actually, finish time of this plan defalut 0
 *
 * @apiSuccess {Number} status 0 means ok .
 * @apiSuccess {JSON} data this stage infomation.
 * @apiVersion 1.0.0
 */
Router.post('/update', function(req, res){
	const body = req.body;
	const stageid = body.stageid;
	if (!stageid) {
		return res.json({code:1, msg:"no stageid param"});
	}

	Stage.findOne({_id:stageid}, function(err, doc){
		if (!doc) {
			return res.json({code:1, msg:"cannot find stage by this stageid"});
		}

		const updateData = Object.assign({}, body,{
			update_time:Date.now()
		}); 
		// find and update it
		// there is an option setting in 3rd param means doc data is after you update
		Stage.findByIdAndUpdate({_id:stageid}, updateData, {new:true}, function(err, doc){

			if (err) {
				return res.json({code:1, msg:"update error"});
			}

			return res.json({code:0, data:doc});
		});
	});

});

/**
 * @api {post} /stage/findAllByPlanId Get Stage Belong To One User
 * @apiName findAllByPlanId
 * @apiGroup Stage
 *
 * @apiParam {String} planid id of the user
 *
 * @apiSuccess {Number} status 0 means ok .
 * @apiSuccess {JSON} data this plans infomation.
 * @apiVersion 1.0.0
 */
Router.post('/findAllByPlanId', function(req, res){
	const body = req.body;
	const planid = body.planid;
	// a note cannot without an user id
	if (!planid){
		return res.json({code:1, msg:"Plan cannot be created without plan_id"});
	}

	// with this user but cannot find user
	Plan.findOne({_id:planid}, function(err, doc){
		if (!doc) {
			return res.json({code:1, msg:"no plan found with this plan_id"});
		}

		// according to the userid find the user's note
		Stage.find({planid:doc._id}, function(err, doc){
			
			return res.json({code:0, data:doc});
		}); 
	});

});

/**
 * @api {post} /stage/findOneById Get One stage By stage id
 * @apiName findOneById
 * @apiGroup Stage
 *
 * @apiParam {String} stageid  id of note
 *
 * @apiSuccess {Number} status 0 means ok .
 * @apiSuccess {JSON} data this plan infomation.
 * @apiVersion 1.0.0
 */
Router.post('/findOneById', function(req, res){
	const stageid = req.body.stageid;
	if (!stageid) {
		return res.json({code:1, msg:"no stageid param"});
	}

	Stage.findOne({_id:stageid}, function(err, doc){
		if (!doc) {
			return res.json({code:1, msg:"cannot find stage by this stageid"});
		}
		return res.json({code:0, data:doc});
	});
});

/**
 * @api {post} /stage/all Get All Stage In System For Debug
 * @apiName All Stage
 * @apiGroup Stage
 *
 * @apiSuccess {Number} status 0 means ok .
 * @apiSuccess {JSON} data this plans infomation.
 * @apiVersion 1.0.0
 */
Router.get('/all', function(req, res){
	Stage.find({}, function(err, doc){
		if (err) {
			return res.json({code:1, msg:"find all Stage error"});
		}

		return res.json({code:0, data:doc});
	});
});

module.exports = Router;