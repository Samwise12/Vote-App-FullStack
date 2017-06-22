import jwt from 'jsonwebtoken';

import config from '../config';
import User from '../models/userModel';

export default (req, res, next) => {
	const authorizationHeader = req.headers['authorization'];
	let token;
	let id = req.headers.referer.slice(-24);
	//console.log(req.headers.referer.slice(-24))
	if(authorizationHeader) {
		token = authorizationHeader.split(' ')[1]
	}

	if (token) {
		//console.log(id);
		//console.log(req.body.data.pollId);
		let user = req.body.data.pollId;
		jwt.verify(token, config.jwtSecret, (err, decoded) => {
		User.find( { "username": user } ).then(data => {
			 //console.log(data[0])
			 const arr = data[0].pollId;
			 const index = arr.indexOf(id);
			 //console.log(data)
			//console.log(id)
			if (err) {
				res.status(401).json({ error: 'Failed to authenticate'});
			} else if (id == data[0].pollId[index]) {
				//console.log(data[0].pollId[0])
				res.status(401).json({ error: 'Already voted'});
			} else {
				req.userId = decoded.id;
				next();				
			}
		}).catch(
		data => {
			req.userId = decoded.id;
			next();							
		}
		)
		});
	} else {
		res.status(403).json({
			error: 'No token Provided'
		});
	}
}


