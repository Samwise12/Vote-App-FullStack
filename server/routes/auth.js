import express from 'express';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config'

let router = express.Router();

router.post('/', (req,res) => {
	const { identifier, password } = req.body;
	 return User.find({
		$or: [
		{username: identifier},
		{email: identifier}
		]
	}).then(user => {
		if (user) {
			// console.log(user[0].password);
			// console.log(password);
			if(bcrypt.compareSync(password, user[0].password )){
				const token = jwt.sign({
					id: user[0].id,
					username: user[0].username
				}, config.jwtSecret);
				res.json({ token });
			} else {
				res.status(401).json({ errors: { form: 'Invalid Credentials' } });	
			}//note double } - all other cases
		} else {
			res.status(401).json({ errors: { form: 'Invalid Credentials' } });
		}
	})

});

export default router;
