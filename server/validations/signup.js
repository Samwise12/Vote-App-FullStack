import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

//Validate Sign in page
export default function validateInput(data) {
	let errors = {};

	if (Validator.isEmpty(data.username)) {
		errors.username = 'username is required';
	}
	if (!Validator.isEmail(data.email)){
		errors.email = 'Email is invalid'
	}
	if (Validator.isEmpty(data.password)) {
		errors.password = 'password is required';
	}

	if (Validator.isEmpty(data.passwordConfirmation)) {
		errors.passwordConfirmation = 'password is required';
	}
	if (!Validator.equals(data.password, data.passwordConfirmation)) {
		errors.passwordConfirmation = 'password must match'
	}
	if (Validator.isEmpty(data.timezone)) {
		errors.timezone = 'timezone is required';
	}
	//console.log(errors)
	return {
		errors, //dont need this???
		isValid: isEmpty(errors)
	}
}