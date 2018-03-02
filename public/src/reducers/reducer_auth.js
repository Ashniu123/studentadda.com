import { LOGIN_REQUEST, LOGIN_SUCCESS, MESSAGE, LOGOUT_REQUEST, LOGOUT_SUCCESS } from '../actions/auth';

const defaultAuthState = { isLogging: false, isLoggedIn: false, message: '' };

export default (state = defaultAuthState, action) => {
	switch (action.type) {
	case LOGIN_REQUEST:
		return {
			...state,
			isLogging: true
		};
	case LOGIN_SUCCESS: 
		return {
			...state,
			isLogging: false,
			isLoggedIn: true
		};
	case LOGOUT_REQUEST: 
		return {
			...state,
			isLogging: true
		};
	case LOGOUT_SUCCESS: 
		return {
			...state,
			isLoggedIn: false,
			isLogging: false
		};
	case MESSAGE: 
		return {
			...state,
			message: action.message
		};
	default:
		return state;
	}
};