import { Route, NavLink, withRouter } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { connect }  from 'react-redux';

import { logout } from '../actions/authActions';
import SignupPage from './SignupPage';
import LoginPage from './login/LoginPage';
//Higher-order components
import requireAuth from '../utils/requireAuth';
import requireOneVote from '../utils/reqOneVote';

import PollPage from './voteApp/PollPage';
import VotePoll from './voteApp/VotePoll';
import ListPolls from './voteApp/ListPolls';
import ResultPoll from './voteApp/ResultPoll';

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
	<div>
		<div className="ui four item menu">
			<NavLink className="item" exact to='/'>Home</NavLink>
			<NavLink className="item" to="/signup">signup</NavLink>
			<NavLink className="item" to="/login">Login</NavLink>
			<NavLink className="item" to="/ListPolls">ListPolls</NavLink>
			</div>
			<Route path='/Signup' component={SignupPage} />
			<Route path='/login' component={LoginPage} />
		</div>
		)

	const userLinks = (
		<div>
		<div className="ui three item menu">
		<NavLink className="item" exact to='/'>Home</NavLink>
		<NavLink className="item" to='/PollPage'>PollPage</NavLink>
		<NavLink className="item" to='/ListPolls'>ListPolls</NavLink>
		</div>
		<ul className="navbar-right">
			<li><a href="#" 
			onClick={this.logout.bind(this)}>Logout</a></li>
		</ul>
		<Route exact path='/' />
		{/*<Route path='/login' component={LoginPage} />*/}
		{/*<Route path='/PollPage' component={PollPage} />*/}
		</div>
		)

	return(
		<div className="ui container">
			{/*guestlinks*/}
			{ isAuthenticated ? userLinks : guestLinks }
			<Route exact path='/' component={Home} />
{/*			<Route path='/Signup' component={SignupPage} />
			<Route path='/login' component={LoginPage} />*/}		
			<Route path='/PollPage' component={PollPage} />
			<Route path='/ListPolls' component={ListPolls} />
			<Route path="/v/:name" component={requireOneVote(VotePoll)} />
			<Route path="/r/:name" component={ResultPoll} />
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
