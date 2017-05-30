import React from 'react';
import timezones from './timeZones';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import validateInput from '../../server/validations/signup';
import TextFieldGroup from './TextFieldGroup';
import { Redirect } from 'react-router-dom';

class SignupForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			passwordConfirmation: '',
			timezone: '',
			errors: {},
			isLoading: false, //disables button 
			redirect: null,
			invalid: false
		}
	this.onSubmit = this.onSubmit.bind(this);
	this.onChange = this.onChange.bind(this);
	this.checkUserExists = this.checkUserExists.bind(this);
	}
	//methods
	isValid() {
		const { errors, isValid } = validateInput(this.state);
		if(!isValid) {
			this.setState({ errors });
		}
		return isValid;
	}
	checkUserExists(e) {
		const field = e.target.name;
		const val = e.target.value;
		if (val !== '') {
			this.props.isUserExists(val).then(res => {
				let errors = this.state.errors;
				let invalid;
				if (res.data.user) {
					errors[field] = 'There is user with such ' + field;
					invalid = true;
				} else {
					errors[field] = '';
					invalid = false;
				}
				this.setState({ errors, invalid })
			});
		}
	}
	onSubmit(e){
		e.preventDefault();
		if (this.isValid()) {
		this.setState({ errors: {}, isLoading: true });//reset state every submit
		this.props.userSignupRequest(this.state).then(
			() => {
			this.props.addFlashMessage({
				type: 'success FlashMessage',
				text: 'You\'ve Signed up!'
			});
				this.setState({ redirect: '/' });
			},
			({ response }) => this.setState({ errors: response.data, isLoading: false })
			);
		}
	}
	onChange(e){
		//console.log(e.target.value);
		this.setState({[e.target.name]: e.target.value})
	}
	render(){
		const { errors } = this.state;
		const options = map(timezones, (val, key) =>
		<option key={val} value={val}>{key}</option>
			);
		//meat
		return ( 
			//router
			<div>
			{this.state.redirect ?
	<Redirect to={{ pathname: this.state.redirect }} /> : //Redirect
			<form onSubmit={this.onSubmit} 
			onChange={this.onChange}>
			<h1>Sign Up!</h1>

			<TextFieldGroup 
			error={errors.username}
			label="Username"
			checkUserExists={this.checkUserExists}
			value={this.state.username}
			name="username"
			/>

			<TextFieldGroup 
			error={errors.email}
			label="Email"
			checkUserExists={this.checkUserExists}
			value={this.state.email}
			name="email"
			/>			

			<TextFieldGroup 
			error={errors.password}
			label="Password"
			value={this.state.password}
			name="password"
			type="password"
			/>

			<TextFieldGroup 
			error={errors.passwordConfirmation}
			label="PasswordConfirmation"
			value={this.state.passwordConfirmation}
			name="passwordConfirmation"
			type="password"
			/>

<div className={classnames("form-group", { 'has-error': errors.timezone })}>
				<label>Timezone</label>
				<select type="password" name="timezone" className="form-control" onChange={this.onChange} value={this.state.timezone}>
				<option value="" disabled>Choose your Timezone</option>
				{options}
				</select>
				{errors.timezone && <span className="help-block">{errors.timezone}</span>}
				</div>

				<button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-lg">Sign Up</button>
			</form>
		}
		</div>
			)
	}
}

SignupForm.propTypes = {
	userSignupRequest: PropTypes.func.isRequired,
	addFlashMessage: PropTypes.func.isRequired,
	isUserExists: PropTypes.func.isRequired
}

export default SignupForm;

//to SignupPage.js
