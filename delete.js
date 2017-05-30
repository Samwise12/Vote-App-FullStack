// import Validator from 'validator';
// import isEmpty from 'lodash/isEmpty';

// let x = { email: 'Email is invalid',
//   password: 'Email is required',
//   passwordConfirmation: 'Email is required',
//   timezone: 'Email is required' };

// //Validator.isEmpty(x)

// console.log(Validator.isEmpty(x));



import { Route, NavLink } from 'react-router-dom';
import React from 'react';

import SignupPage from './SignupPage';
import LoginPage from './login/LoginPage';

const Home = () => {
	return (<h1>Home</h1>)
}

export default () => {
	return(
		<div className="ui container">
			<div className="ui three item menu">
			<NavLink className="item" exact to='/'>Home</NavLink>
			<NavLink className="item" to="/signup">signup</NavLink>
			<NavLink className="item" to="/login">Login</NavLink>
			</div>
			<Route exact path='/' component={Home} />
			<Route path='/Signup' component={SignupPage} />
			<Route path='/login' component={LoginPage} />
		</div>
		)
}

//to App.js
