import React from 'react';

import NavigationBar from './components/NavigationBar';
import FlashMessagesList from './components/flash/FlashMessagesList';

class App extends React.Component {
	render() {
		return (
				<div className="container">
					<NavigationBar />
					<FlashMessagesList />
					{this.props.children}
				</div>
			)
	}
}

export default App;

//to index.js
