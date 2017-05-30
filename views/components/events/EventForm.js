import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createEvent } from '../../actions/eventActions';
import TextFieldGroup from '../TextFieldGroup';


class EventForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			errors: {},
			isLoading: false
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e){
		e.preventDefault();
		this.props.createEvent(this.state);
	}

	render(){
		const { title, errors, isLoading } = this.state;

		return (
			<form onSubmit={this.onSubmit}>
				<h1>Create New Game Event </h1>

				<TextFieldGroup
					name="title"
					label="Event Title"
					value={title}
					onChange={this.onChange}
					error={errors.title}
					/>
	<button type="submit" className="btn btn-primary">Create</button>
			</form>
			)

	}//end-render
}

EventForm.propTypes = {
	createEvent: PropTypes.func.isRequired
}

export default connect(null, { createEvent })(EventForm);

