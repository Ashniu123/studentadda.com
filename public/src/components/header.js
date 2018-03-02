import React, { Component } from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class Header extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
	render() {
		// TODO: Add part where Login/Register links changes when user is logged in
		let navitems = [];
		if(!this.props.isLoggedIn) {
			const items = [ { text: 'Login', attr: { href: '/login'} }, 
				{ text: 'Register', attr: { href: '/register'} } ];
			navitems = items.map((item, index) => {
				return <NavItem className='navbar-animate' key={index} ><NavLink {...item.attr}>{ item.text }</NavLink></NavItem>;
			});
		} else {
			// show change user and logout button
		}
		
		return (
			<header>
				<Navbar color="dark" className="navbar-dark" expand="md">
					<NavbarBrand tag={Link} to='/'><img src="/images/logo.png" alt="StudentAdda" style={{height: '45px'}}/></NavbarBrand>
					<NavbarToggler onClick={this.toggle} style={{visibility: this.props.noHeader ? 'hidden' : ''}}/>
					<Collapse isOpen={this.state.isOpen} navbar style={{visibility: this.props.noHeader ? 'hidden' : ''}}>
						<Nav className="ml-auto" navbar>
							{navitems}
						</Nav>
					</Collapse>
				</Navbar>
			</header>
		);
	}
}

const mapStateToProps = (state) => ({
	isLoggedIn: state.auth.isLoggedIn
});

export default connect(mapStateToProps)(Header);