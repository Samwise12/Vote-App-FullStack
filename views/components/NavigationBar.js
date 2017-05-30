import { Route, NavLink, withRouter } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { connect }  from 'react-redux';

import { logout } from '../actions/authActions';
import SignupPage from './SignupPage';
import LoginPage from './login/LoginPage';
import NewEventPage from './events/NewEventPage';
import requireAuth from '../utils/requireAuth';

class NavigationBar extends React.Component { 
	logout(e){
		e.preventDefault();
		this.props.logout();
	}
	/////render
	render(){
	const { isAuthenticated } = this.props.auth;

	const Home = () => {
	return (<h1>Home</h1>)
}
	
	const guestLinks = (
		<div className="ui three item menu">
			<NavLink className="item" exact to='/'>Home</NavLink>
			<NavLink className="item" to="/signup">signup</NavLink>
			<NavLink className="item" to="/login">Login</NavLink>
			</div>
		)

	const userLinks = (
		<ul className="navbar-right">
			<li><a href="#" 
			onClick={this.logout.bind(this)}>Logout</a></li>
		</ul>
		)

	return(
		<div className="ui container">
			{/*guestlinks*/}
			{ isAuthenticated ? userLinks : guestLinks }
			<Route exact path='/' component={Home} />
			<Route path='/Signup' component={SignupPage} />
			<Route path='/login' component={LoginPage} />
			<Route path='/new-event' component={requireAuth(NewEventPage)} />
		</div>
		);
	}
}

NavigationBar.propTypes = {
	auth: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

export default withRouter(connect(mapStateToProps, { logout } )(NavigationBar));

//to App.js
