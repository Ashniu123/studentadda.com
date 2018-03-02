import React, { Component } from 'react';
import {
	Col,
	Container,
	Card,
	CardLink,
	CardBody,
	CardHeader,
	Button,
	Form,
	FormGroup,
	FormText,
	Label,
	Input,
	Progress,
	Alert
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';

import { startRegister } from '../actions/register';

export class RegisterPage extends Component {
	constructor(props) {
		super(props);
		document.body.className = 'bg-dark';

		this.state = {
			fname: '',
			lname: '',
			email: '',
			pass: '',
			cpass: '',
			error: '',
			str_value: 0,
			str_phrase: '',
			str_color: '',
			success: this.props.message === 'success' ? true : false
		};

		if(this.props.isLoggedIn) {
			this.props.history.push('/dashboard');
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		if (this.state.error.length === 0 && this.state.fname.length > 0 && this.state.lname.length > 0 &&
			this.state.email.length > 0 && this.state.pass.length > 0 && this.state.pass.length > 0 && 
			this.state.cpass === this.state.pass) {
				
			// Dispatch request
			const registerObj = {
				firstName: this.state.fname,
				lastName: this.state.lname,
				email: this.state.email,
				password: this.state.pass	
			};
			this.props.startRegister(registerObj);
		}
	}

	handleNameChange(e) {
		const { value, id } = e.target;
		if (value.length > 0) {
			if(!/^[A-Za-z ]+$/.test(value)) {
				this.setState({ error: 'Name can only contain alphabets and spaces.' });
			} else {
				this.setState({ error: '' });
				if(id === 'registerFirstName') {
					this.setState({ fname: value.trim() });
				} else {
					this.setState({ lname: value.trim() });
				}
			}
		} else {
			this.setState({ error: 'Name field cannot be empty.' });
		}
	}

	handlePasswordChange(e) {
		const { value } = e.target;
		if (value.length > 0 ) {
			this.setState({ pass: value });
			if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(value)) {
				// Strong Password: 8 char; 1 lower, 1 upper, 1 num, 1 sp (and)
				this.setState({ str_value: 100, str_phrase: 'Strong', str_color: 'danger' });
			} else if (/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(value)) {
				// Medium Password: 6 char; 1 lower, 1 upper, 1 num, 1 sp (or)
				this.setState({ str_value: 50, str_phrase: 'Medium', str_color: 'warning' });
			} else {
				// Weak Password
				this.setState({ str_value: 25, str_phrase: 'Weak', str_color: 'success' });
			}
		} else {
			// No Password
			this.setState({ str_value: 0, str_phrase: '', str_color: '' });
		}
		
	}

	handleConfirmPasswordChange(e) {
		const { value } = e.target;
		if (this.state.pass.length > 0) {
			if (this.state.pass === value) {
				this.setState({ cpass: value, error: '' });
			} else {
				this.setState({ error: 'Passwords donot match.' });
			}
		} else {
			this.setState({ error: 'Please enter password first before confirming it.' });
		}
	}

	componentWillUnmount() {
		document.body.className = '';
	}

	render() {
		return (
			<Container className="pb-5">
				<Card className="card-register mx-auto mt-5">
					<CardHeader>Register an Account</CardHeader>
					<CardBody>
						<Form onSubmit={this.handleSubmit} autoComplete='on'>
							<FormText className="mb-3">All fields are Mandatory.</FormText>
							<FormGroup row>
								<Col md={6}>
									<Label for="registerFirstName" className="sr-only">First Name</Label>
									<Input type="text" name="registerFirstName" id="registerFirstName" autoFocus
										placeholder="Enter First Name" required onChange={this.handleNameChange}/>
								</Col>
								<Col md={6}>
									<Label for="registerLastName" className="sr-only">Last Name</Label>
									<Input type="text" name="registerLastName" id="registerLastName" 
										placeholder="Enter Last Name" required onChange={this.handleNameChange}/>
								</Col>
							</FormGroup>
							<FormGroup>
								<Label for="registerEmail" className="sr-only">Email</Label>
								<Input type="email" name="registerEmail" id="registerEmail" 
									placeholder="Enter Email" required onChange={(e) => this.setState({ email: e.target.value.trim() })}/>
							</FormGroup>
							<FormGroup>
								<Label for="registerPassword" className="sr-only">Password</Label>
								<Input type="password" name="registerPassword" id="registerPassword" 
									placeholder="Enter Password" required onChange={this.handlePasswordChange}/>
							</FormGroup>
							<Progress className="mb-3" value={this.state.str_value} color={this.state.str_color} >{this.state.str_phrase}</Progress>
							<FormGroup>
								<Label for="registerConfirmPassword" className="sr-only">Confirm Password</Label>
								<Input type="password" name="registerConfirmPassword" id="registerConfirmPassword" 
									placeholder="Confirm Password" required onChange={this.handleConfirmPasswordChange}/>
							</FormGroup>
							{ this.state.error && <Alert color="danger">{ this.state.error }</Alert>}
							{ this.props.message && <Alert color="primary">{ this.props.message }</Alert> }
							<Button type="submit" color="primary" block disabled={ !!this.state.error || !!this.props.message || this.props.isRegistering} >{ this.props.isRegistering ? <span><FontAwesome name="spinner" spin size="lg"/> Registering</span> : 'Register' }</Button>
						</Form>
						<div className="text-center">
							<CardLink href="/login" className="d-block mt-3 small">Already have an account? Login Now!</CardLink>
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
	isRegistering: state.register.isRegistering,
	message: state.register.message
});

const mapDispatchToProps = (dispatch) => ({
	startRegister: (registerObj) => dispatch(startRegister(registerObj))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);