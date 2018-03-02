import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const Footer = ({noHeader}) => (
	<Row className="footer mx-0" hidden={noHeader}>
		<Col className="col-12">
			<Row className="justify-content-center">
				<Col xs={{size: 5, offset: 1}} sm={{size: 3, offset: 1}} className="align-self-start" >
					<h5>Links</h5>
					<ul className="list-unstyled">
						<li><Link to="">Help and FAQ</Link></li>
						<li><Link to="">About Us</Link></li>
						<li><Link to="">Privacy and Terms</Link></li>
					</ul>
				</Col>
				<Col xs="6" sm="4" className="align-self-start">
					<h5>Our Address</h5>
					<address>
							121, L &amp; T Road,<br/>
							L &amp; T,Mumbai<br/>
						<br/>
						<i className="fa fa-phone"></i> +852 1234 5678<br/>
						<i className="fa fa-fax"></i> +852 8765 4321<br/>
						<i className="fa fa-envelope"></i> <a href="mailto:studentadda@outlook.com" target="_blank">studentadda@outlook.com</a>
					</address>
				</Col>
				<Col xs="12" sm="4" className="align-self-starts">
					<a className="btn-social-google" target="_blank" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
					<a className="btn-social-facebook" target="_blank" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
					<a className="btn-social-linkedin" target="_blank" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
					<br/>
					<a className="btn-social-twitter" target="_blank" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
					<a className="btn-social-youtube" target="_blank" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
					<a className="btn-social-mail" target="_blank" href="mailto:studentadda@outlook.com"><i className="fa fa-envelope-o"></i></a>
				</Col>
			</Row>
			<Row>
				<Col xs="12" className="text-center">
					Copyright &copy; Studentadda {new Date().getFullYear()}
				</Col>
			</Row>
		</Col>
	</Row>
);

export default Footer;