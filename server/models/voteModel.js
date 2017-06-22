import mongoose from 'mongoose';

var createPoll = mongoose.Schema({
	question: {
		type: String,
		index: true
	},
	options: {
		type: Array
	},
	voteCount: {
		type: Array
	}
})

let Poll = module.exports = mongoose.model('Poll', createPoll);
