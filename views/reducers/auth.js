import isEmpty from 'lodash/isEmpty';

const initialState = {
	isAuthenticated: false,
	user: {}
};

export default (state= initialState, action = {}) => {
	switch(action.type) {
		case 'SET_CURRENT_USER':
		//let pollId = state.user.pollId 
			return {
				isAuthenticated: !isEmpty(action.user),
				user: action.user
			};
		case 'ADD_POLLID':
	//console.log(state.user)
			//state.user.pollId.push(action.pollId)
			state.user.pollId.push(action.pollId)
			return state
			
		default: return state;
	}
}