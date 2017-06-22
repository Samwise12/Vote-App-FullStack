import express from 'express';

import Poll from '../models/voteModel.js'
import authAlreadyVoted from '../middlewares/authAlreadyVoted';
import authenticate from '../middlewares/authenticate';

let router = express.Router();

router.post('/', authenticate, (req, res) => {
	//console.log(req.body.data);
	//console.log(req.body.data.question);
	const { question, options, voteCount } = req.body.data;
	//console.log(options)
	const NewPoll = new Poll({
		question: question,
		options: options,
		voteCount: voteCount
	})
	//console.log(NewPoll._id);
	NewPoll.save()
		.then(newPoll => res.json( newPoll ))
		.catch(err => res.status(500).json({ error: err }))		
});

router.put('/', authAlreadyVoted, (req, res) => {
	const { id, voteId } = req.body.data;
	//console.log(req.body.data)
	// console.log(voteId)
	let y = 'voteCount.'+ voteId
	let x = { [y] : 1 }
	Poll.update( {_id: id}, {$inc: x }, (err, poll) => {
		if (err) { return err};
		res.send(poll)
	});
});

router.get('/', (req,res) => {
	//console.log(req.headers.referer.slice(-24));
	let id = req.headers.referer.slice(-24);
	let less = req.headers.referer.slice(-9);
 	Poll.count({"_id": id}, function( err, count) {
     if (count === undefined && less === 'ListPolls') {
		Poll.find().then(data => { 
		{ res.json({ data }) }		
	});     	
     } else {
     Poll.find( { "_id": id } ).then(data => { 
		if(true){ res.json({ data }) }		
	});
     }
 })
});

export default router;


