import { combineReducers } from 'redux';

import AuthReducer from './reducer_auth';
import RegisterReducer from './reducer_register';

const rootReducer = combineReducers({
	auth: AuthReducer,
	register: RegisterReducer
});

export default rootReducer;
