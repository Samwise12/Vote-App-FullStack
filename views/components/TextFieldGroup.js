import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextFieldGroup = ({ name, value, label, error, type, checkUserExists }) => {
	return (
		<div className={classnames("form-group", { 'has-error': error })}>
			<label>{label}</label>
			<input type={type} name={name} className="form-control"
			onBlur={checkUserExists}/>
			{error && <span className="help-block">{error}</span>}
			</div>
		)
}

TextFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	error: PropTypes.string,
	type: PropTypes.string.isRequired,
	checkUserExists: PropTypes.func
}

TextFieldGroup.defaultProps = {
	type: 'text'
}

export default TextFieldGroup;

