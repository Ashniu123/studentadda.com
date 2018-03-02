import React from 'react';
import { Row } from 'reactstrap';

const HomePageListItem = ({ head, text, img, reverse }) => (
	<Row className="justify-content-center">
		{!reverse && <div className="description col-md-6">
			<h2>{head}</h2>
			<p>{text.para}</p>
			<ul>
				{text.list.map((listItem, ind) => (<li key={ind}>{listItem}</li>))}
			</ul>
		</div>}
		<img src={img.src} alt={img.alt} className="col-md-6 h-100 p-0" />
		{reverse && <div className="description col-md-6">
			<h2>{head}</h2>
			<p>{text.para}</p>
			<ul>
				{text.list.map((listItem, ind) => (<li key={ind}>{listItem}</li>))}
			</ul>
		</div>}
	</Row>
);

export default HomePageListItem;