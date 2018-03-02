import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import AppRouter, { history } from './routes/app_router';
// import LoadingPage from './components/loading_page';
import reducers from './reducers';

import 'bootstrap/scss/bootstrap.scss';
import 'font-awesome/scss/font-awesome.scss';
import '../styles/styles.scss';

const store = applyMiddleware(thunk)(createStore)(reducers); // create store with middleware

// ReactDOM.render(<LoadingPage />, document.getElementById('root'));

// let hasRendered = false;
// const renderApp = () => {
// 	if (!hasRendered) {
// 		ReactDOM.render(
// 			<Provider store={store}>
// 				<AppRouter />
// 			</Provider>
// 			, document.getElementById('root'));
// 		hasRendered = true;
// 	}
// };

// setTimeout(() => {
// 	renderApp();
// }, 3000);

ReactDOM.render(<Provider store={store}><AppRouter /></Provider>, document.getElementById('root'));