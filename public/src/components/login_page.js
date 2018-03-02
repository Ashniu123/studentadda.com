import React, { Component } from 'react';
import {
	Container,
	Card,
	CardLink,
	CardBody,
	CardHeader,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	Alert
} from 'reactstrap';
import { connect } from 'react-redux';

import { startLogin } from '../actions/auth';

export class LoginPage extends Component {
	constructor(props) {
		super(props);
		document.body.className = 'bg-dark';
		
		this.state = {
			error: '',
			email: '',
			pass: '',
			rememberMe: true
		};

		if(this.props.isLoggedIn) {
			this.props.history.push('/dashboard');
		}

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		if (this.state.error.length === 0 && this.state.email.length > 0 && this.state.pass.length > 0) {
			// Dispatch for login
			const loginObj = { email: this.state.email, password: this.state.pass, rememberMe: this.state.rememberMe };
			this.props.startLogin(loginObj);
		}
	}

	componentWillUnmount() {
		document.body.className = '';
	}

	render() {
		return (
			<Container>
				<Card className="card-login mx-auto mt-5">
					<CardHeader>Login</CardHeader>
					<CardBody>
						<Form onSubmit={this.handleSubmit} autoComplete='on'>
							<FormGroup>
								<Label for="loginEmail" className="sr-only">Email</Label>
								<Input type="email" name="email" id="loginEmail" autoFocus
									placeholder="Enter Email" required onChange={(e) => this.setState({ email: e.target.value.trim() })} />
							</FormGroup>
							<FormGroup>
								<Label for="loginPassword" className="sr-only">Password</Label>
								<Input type="password" name="password" id="loginPassword"
									placeholder="Enter password" required onChange={(e) => this.setState({ pass: e.target.value })} />
							</FormGroup>
							<div className="custom-control custom-checkbox mb-3">
								<Input type="checkbox" className="custom-control-input" id="rememberMe" 
									checked={this.state.rememberMe} onChange={(e) => this.setState({ rememberMe: e.target.checked })}/>
								<label htmlFor="rememberMe" className="custom-control-label">Remember Password</label>
							</div>
							<Button type="submit" color="primary" block>Login</Button>
						</Form>
						{this.state.error && <Alert color="danger">{this.state.error}</Alert>}
						<div className="text-center">
							<CardLink href="/register" className="d-block mt-3 small">Don't have an Account? Register Now!</CardLink>
							<CardLink href="/forgotpassword" className="d-block small">Forgot Password?</CardLink>
						</div>
					</CardBody>
				</Card>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	isLoggedIn: state.auth.isLoggedIn,
	isLogging: state.auth.isLogging,
	message: state.auth.message
});

const mapDispatchToProps = (dispatch) => ({
	startLogin: (loginObj) => dispatch(startLogin(loginObj))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);