import express from 'express';
import bcrypt from 'bcrypt';
import isEmpty from 'lodash/isEmpty'

import commonValidations from '../validations/signup';
import User from '../models/userModel';

let router = express.Router();

router.get('/:identifier', (req, res) => {
	User.find(
		// 	$or: [
		// {username: req.params.identifier},
		// {email: req.params.identifier}
		// ]
		{username: req.params.identifier}
	)
		.then(user => {
			//console.log(isEmpty(user[0]));
			//console.log(isEmpty(user[0] === true));
			if(isEmpty(user[0]) === true ) {
						res.json({ user: null });
					}
			else {res.json({ user });}
		});
});
/////
function validateInput(data, otherValidations) {
	let { errors } = otherValidations(data);
	return User.find({
		$or: [
		{username: data.username},
		{email: data.email}
		]
	})
	.then(user => {
		if(user.length){
			if(user[0].username === data.username) {
				errors.username = 'Sorry, username has been taken';
			}
			if (user[0].email === data.email) {
				errors.email = 'Email is already registered.';
			}
		}
		return {
			errors,
			isValid: isEmpty(errors)
		}
	});
}

router.post('/', (req,res) => {
	validateInput(req.body, commonValidations).then(({ errors,isValid }) => {
	//console.log(errors) 
	if(isValid) { 
		const { username, password, timezone, email } = req.body;
		const password_hash = bcrypt.hashSync(password, 10);
		//console.log( req.body );
		const NewUser = new User({
			username: username,
			email: email,
			password: password_hash,
			//password: password,
			timezone: timezone
		});
		// User.createUser(NewUser, function(err, user){ //SECOND WAY OF DOING IT
		// 	if(err) throw err;
		// 	console.log(NewUser);
		// });
		NewUser.save()
			.then(newUser => res.json({ success: true }))
			.catch(err => res.status(500).json({ error: err }))
		}		
		//res.json({ success: true }); } 
		else { 
			res.status(400).json(errors)
		}
	//console.log(!isValid)		
	})
});

export default router;