import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextFieldGroup from '../TextFieldGroup';
import validateInput from '../../../server/validations/login';
import { login } from '../../actions/authActions';


class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			identifier: '',
			password: '',
			errors: {},
			isLoading: false,
			redirect: null
		}
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	isValid() {
		const { errors, isValid } = validateInput(this.state);

		if(!isValid){
			this.setState({ errors });
		}

		return isValid;
	}

	onSubmit(e) {
		e.preventDefault();
		//console.log(this.state)
		if (this.isValid()) {
			this.setState({ errors: {}, isLoading: true });
			this.props.login(this.state).then(
				(response) => { 
this.context.router.history.push('/PollPage');					
				//this.setState({ redirect: '/PollPage' })
				},
				(err) => this.setState({ errors: err.response.data.errors, isLoading: false })
				);
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { errors, identifier, password, isLoading } = this.state;

		return (
			<div>
			{this.state.redirect ?
	<Redirect to={{ pathname: this.state.redirect }} /> : //Redirect
			<form onSubmit={this.onSubmit} onChange={this.onChange}>
			<h1>Login</h1>

			{ errors.form && <div className="alert alert-danger">{errors.form}</div> }

			<TextFieldGroup
			name="identifier"
			label="Username / Email"
			value={identifier}
			error={errors.identifier}
			/>

			<TextFieldGroup
			name="password"
			label="Password"
			value={password}
			error={errors.password}
			type="password"
			/>

			<button disabled={isLoading}>Login</button>
			</form>
		}
			</div>
			);
	}
}

LoginForm.propTypes = {
	login : PropTypes.func.isRequired
}

LoginForm.contextTypes = {
	router: PropTypes.object.isRequired
}

export default connect(null, { login }) (LoginForm);





