export const REGISTER_REQUEST = 'REGISTER_REQUEST', REGISTER_SUCCESS = 'REGISTER_SUCCESS', REGISTER_MESSAGE = 'REGISTER_MESSAGE';

import axios from 'axios';

export const registerSuccess = () => ({
	type: REGISTER_SUCCESS
});

export const registerMessage = (message) => ({
	type: REGISTER_MESSAGE,
	message
});

export const registerRequest = () => ({
	type: REGISTER_REQUEST
});

export const startRegister = (registerObj) => {
	return (dispatch) => {
		dispatch(registerRequest());
		axios.post('http://localhost:3000/signup', registerObj)
			.then((res) => {
				console.log('NO error');
				if (res.data.status) {
					console.log(res.data);
					dispatch(registerSuccess());
					dispatch(registerMessage('Registeration Successful!'));
				} else {
					// Some error but statuscode is 200
					console.log(res.data);
					dispatch(registerMessage(res.data.message));
				}
			})
			.catch((err) => {
				console.log('error');
				console.log(err);
				dispatch(registerMessage(err.data.message));
			});
	};
};