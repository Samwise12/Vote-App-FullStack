import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class FlashMessage extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}
	onClick() {
		this.props.deleteFlashMessage(this.props.message.id);
	}
	render() {
		const { text } = this.props.message;
		return (
			<div className={classnames('alert', {
				'alert-success' : 'success'
			})}>
			<button onClick={this.onClick} className="close"><span>&times;</span></button>
				{text}
			</div>
			);
	}
}

FlashMessage.propTypes = {
	message: PropTypes.object.isRequired,
	deleteFlashMessage: PropTypes.func.isRequired,
}

export default FlashMessage;

//to FlashMessagesList.js