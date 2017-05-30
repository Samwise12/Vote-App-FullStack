import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import jwtDecode from 'jwt-decode';

import rootReducer from './rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/authActions';
import App from './App';

const store = createStore(
	rootReducer,
	compose(
	applyMiddleware(thunk),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
		)
	);

if (localStorage.jwtToken) {
setAuthorizationToken(localStorage.jwtToken);
store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

ReactDOM.render(<Provider store={store}><Router>
	<App />
	</Router></Provider>,
	document.getElementById('root'));