export const LOGOUT_REQUEST = 'LOGOUT_REQUEST', LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGIN_REQUEST = 'LOGIN_REQUEST', LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const MESSAGE = 'MESSAGE';

import axios from 'axios';

export const authMessage = (message) => ({
	type: MESSAGE,
	message
});

export const loginSuccess = (token) => ({
	type: LOGIN_SUCCESS,
	token
});

export const loginRequest = () => ({
	type: LOGIN_REQUEST
});

export const startLogin = (loginObj) => {
	return (dispatch) => {
		dispatch(loginRequest());
		return axios.post('http://localhost:3000/login', loginObj)
			.then((res) => {
				// TODO: Redirect to Dashboard while storing few creds
				console.log(res);
				dispatch(loginSuccess(res.data.token));
			})
			.catch((err) => {
				console.log('Error');
				console.log(err);
				dispatch(authMessage(err.data.message));
				// TODO: Send Error Message
			});
	};
};

export const logoutSuccess = () => ({
	type: LOGOUT_SUCCESS
});

export const logoutRequest = () => ({
	type: LOGOUT_REQUEST
});

export const startLogout = () => {
	return (dispatch) => {
		dispatch(logoutRequest());
		return axios.get('/api/logout')
			.then((res) => {
				console.log('No Error');
				console.log(res);
				dispatch(logoutSuccess());
			})
			.catch((err) => {
				console.log('Error');
				console.log(err);
				dispatch(authMessage(err.data.message));
			});
	};
};