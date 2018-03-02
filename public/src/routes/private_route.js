import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import Header from '../components/header';
import Footer from '../components/footer';

export const PrivateRoute = ({
	isLoggedIn,
	component: Component,
	...rest
}) => (
	<Route {...rest} component={(props) => (
		isLoggedIn ? (
			<div>
				<main class="wrapper">
					<Header />
					<Component {...props} />
				</main>
				<Footer />
			</div>
		) : (
			<Redirect to="/" />
		)
	)} />
);

const mapStateToProps = (state) => ({
	isLoggedIn: !!state.auth.isLoggedIn
});

export default connect(mapStateToProps)(PrivateRoute);
