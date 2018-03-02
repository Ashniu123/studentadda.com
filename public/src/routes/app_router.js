import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import DashboardPage from '../components/dashboard_page_component/dashboard_page';
import NotFoundPage from '../components/page_not_found';
import HomePage from '../components/home_page_component/home_page';
import LoginPage from '../components/login_page';
import RegisterPage from '../components/register_page';
// import PrivateRoute from './private_route';
import PublicRoute from './public_route';

export const history = createHistory();

const AppRouter = () => (
	<Router history={history}>
		<div>
			<Switch>
				<PublicRoute path="/" component={HomePage} exact={true} />
				<PublicRoute path="/login" component={LoginPage} noHeader={true} />
				<PublicRoute path="/register" component={RegisterPage} noHeader={true} />
				{/* <PrivateRoute path="/dashboard" component={DashboardPage} /> */}
				<PublicRoute path="/dashboard" component={DashboardPage} />
				<Route component={NotFoundPage} />
			</Switch>
		</div>
	</Router>
);

export default AppRouter;