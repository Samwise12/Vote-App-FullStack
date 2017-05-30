import React from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { userSignupRequest, isUserExists } from './../actions/signupActions';
import PropTypes from 'prop-types';
import { addFlashMessage } from '../actions/flashMessagesAction';

class SignupPage extends React.Component {
	render() {
		const { userSignupRequest, addFlashMessage, isUserExists } = this.props;
		return (
			<SignupForm 
			isUserExists={isUserExists}
			userSignupRequest={userSignupRequest} 
			addFlashMessage={addFlashMessage} />
			)
	}
}

SignupPage.propTypes = {
	userSignupRequest: PropTypes.func.isRequired,
	addFlashMessage: PropTypes.func.isRequired,
	isUserExists: PropTypes.func.isRequired		
}

export default connect(null, { userSignupRequest, addFlashMessage, isUserExists })(SignupPage);

//to NavigationBar.js
