//PollId.js
import express from 'express';

import authenticate from '../middlewares/authenticate';
import User from '../models/userModel';

let router = express.Router();

router.post('/', authenticate, (req,res) => {
	const { id, pollId} = req.body.data;//pollId is username
	//console.log(req.body.data)

User.find({username: pollId}).update({ $addToSet: { pollId: id }}, (err, pollId) => {
		if(err){ return err};
			res.send(pollId)
	})
})

	/*User.find({username: pollId}).update({ pollId: id }, (err, pollId) => {
		if(err){ return err};
			res.send(pollId)
	})
})*/

export default router;

