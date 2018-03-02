import React from 'react';

import HomeJumbotron from './home_page_jumbotron';
import HomePageList from './home_page_list';

const HomePage = () => (
	<main>
		<HomeJumbotron />
		<hr className="hr-75 hr-rounded-warning" />
		<HomePageList />
		<hr className="hr-75 hr-rounded-warning" />
	</main>
);

export default HomePage;