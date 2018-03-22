const express = require('express');
const Router = express.Router();
const models = require('../model');
const Note = models.getModel('note');
const User = models.getModel('user');

/**
 * @api {post} /note/new Create a new Note
 * @apiName Create Note
 * @apiGroup Note
 *
 * @apiParam {String} userid  the user's id who is belong to this note.
 * @apiParam {String} title  title
 * @apiParam {String} sub_title  sub title
 * @apiParam {String} content  content
 * @apiParam {Boolean} public  if public,defalut is true.
 * @apiParam {String} tags  tags of note
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
		return res.json({code:1, msg:"note cannot be created without user_id"});
	}

	// with this user but cannot find user
	User.findOne({_id:userid}, function(err, doc){
		if (!doc) {
			return res.json({code:1, msg:"no user found with this user_id"});
		}

		const noteModel = new Note(body);
		noteModel.save(function(err, doc){
			if (err) {
				return res.json({code:1, msg:'new note error'});
			}
			return res.json({code:0, data:doc});
		});
	});
});

/**
 * @api {post} /note/delete Delete Note by noteid
 * @apiName delete
 * @apiGroup Note
 *
 * @apiParam {String} noteid id of the user
 *
 * @apiSuccess {Number} status 0 means ok .
 * @apiSuccess {JSON} data this notes infomation.
 * @apiVersion 1.0.0
 */
Router.post('/delete', function(req, res){
	const noteid = req.body.noteid;
	if (!noteid) {
		return res.json({code:1, msg:"no noteid param"});
	}

	Note.findOne({_id:noteid}, function(err, doc){

		if(!doc){
			return res.json({code:1, msg:"find no note as this id"});
		}
		Note.remove({_id:noteid}, function(err, doc){
			if(err){
				return res.json({code:1, msg:"delete error"});
			}
			return res.json({code:0, msg:"delete success"});
		});
	});
});


/**
 * @api {post} /note/update Update a Note
 * @apiName Update Note
 * @apiGroup Note
 *
 * @apiParam {String} noteid  which note, necessary.
 * @apiParam {String} userid  the user's id who is belong to this note.
 * @apiParam {String} title  title
 * @apiParam {String} sub_title  sub title
 * @apiParam {String} content  content
 * @apiParam {Boolean} public  if public,defalut is true.
 * @apiParam {String} tags  tags of note
 *
 * @apiSuccess {Number} status 0 means ok .
 * @apiSuccess {JSON} data this note infomation.
 * @apiVersion 1.0.0
 */
Router.post('/update', function(req, res){
	const body = req.body;
	const noteid = body.noteid;
	if (!noteid) {
		return res.json({code:1, msg:"no noteid param"});
	}

	Note.findOne({_id:noteid}, function(err, doc){
		if (!doc) {
			return res.json({code:1, msg:"cannot find note by this noteid"});
		}

		const updateData = Object.assign({}, body,{
			update_time:Date.now()
		}); 
		// find and update it
		// there is an option setting in 3rd param means doc data is after you update
		Note.findByIdAndUpdate({_id:noteid}, updateData, {new:true}, function(err, doc){

			if (err) {
				return res.json({code:1, msg:"update error"});
			}

			return res.json({code:0, data:doc});
		});
	});

});

/**
 * @api {post} /note/findAllByUserId Get Notes Belong To One User
 * @apiName findAllByUserId
 * @apiGroup Note
 *
 * @apiParam {String} userid id of the user
 *
 * @apiSuccess {Number} status 0 means ok .
 * @apiSuccess {JSON} data this notes infomation.
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
		Note.find({userid:doc._id}, function(err, doc){
			
			return res.json({code:0, data:doc});
		}); 
	});

});

/**
 * @api {post} /note/findOneById Get One Note By Note id
 * @apiName findOneById
 * @apiGroup Note
 *
 * @apiParam {String} noteid  id of note
 *
 * @apiSuccess {Number} status 0 means ok .
 * @apiSuccess {JSON} data this notes infomation.
 * @apiVersion 1.0.0
 */
Router.post('/findOneById', function(req, res){
	const noteid = req.body.noteid;
	if (!noteid) {
		return res.json({code:1, msg:"no noteid param"});
	}

	Note.findOne({_id:noteid}, function(err, doc){
		if (!doc) {
			return res.json({code:1, msg:"cannot find note by this noteid"});
		}
		return res.json({code:0, data:doc});
	});
});

/**
 * @api {post} /note/all Get All Notes In System For Debug
 * @apiName All Notes
 * @apiGroup Note
 *
 * @apiSuccess {Number} status 0 means ok .
 * @apiSuccess {JSON} data this notes infomation.
 * @apiVersion 1.0.0
 */
Router.get('/all', function(req, res){
	Note.find({}, function(err, doc){
		if (err) {
			return res.json({code:1, msg:"find all notes error"});
		}

		return res.json({code:0, data:doc});
	});
});

module.exports=Router;