import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFlashMessage } from '../actions/flashMessagesAction';

export default function(ComposedComponent) {
	class Authenticate extends React.Component {
		componentWillMount() {
			let pollId = this.props.match.params.name
			//console.log(this.props.pollId.indexOf(pollId) == -1)
			if (!(this.props.isAuthenticated) || !(this.props.pollId.indexOf(pollId) == -1) ) {
				this.props.addFlashMessage({
					type: 'error',
					text: 'Access denied'
				});
				this.context.router.history.push('/login');
			}
		}
		render() {
			return(
			<ComposedComponent {...this.props} />
			);
	}
}

Authenticate.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	addFlashMessage: PropTypes.func.isRequired,
	pollId: PropTypes.array.isRequired
}

Authenticate.contextTypes = {
	router: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		pollId: state.auth.user.pollId
	}
}

return connect(mapStateToProps, { addFlashMessage })(Authenticate);
}


