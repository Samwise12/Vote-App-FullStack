import React from 'react';
import LoginForm from './LoginForm';

class LoginPage extends React.Component {
	render() {
		return (
			<div className="row">
			<div>
				<LoginForm />
			</div>
			</div>
			);
	}
}

export default LoginPage;