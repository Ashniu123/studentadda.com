import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import Header from '../components/header';
import Footer from '../components/footer';

export const PublicRoute = ({
	noHeader,
	isLoggedIn,
	component: Component,
	...rest
}) => (
	<Route {...rest} component={(props) => (
		isLoggedIn ? (
			<Redirect to="/dashboard" />
		) : (
			<div>
				<main class="wrapper">
					<Header noHeader={noHeader} />
					<Component {...props} />
				</main>
				<Footer noHeader={noHeader} />
			</div>
		)
	)} />
);

const mapStateToProps = (state) => ({
	isLoggedIn: !!state.auth.isLoggedIn
});

export default connect(mapStateToProps)(PublicRoute);
