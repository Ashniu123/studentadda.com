import React from 'react';

import HomePageListItem from './home_page_list_item';

const itemsObj = [
	{
		head: 'Notes Organiser',
		img: { src: 'images/physics.png', alt: 'Organiser' },
		text: {
			para: 'Studentadda is the perfect place for you! With our Notes Organizer you can easily convert your note\'s pictures into a digital photo Subject Album for easy cross platform access. Study from your phone, laptop, tablet with our highly responsive webpage!',
			list: ['Have you ever scanned lots of images from different textbooks for reference and never to refer them again?',
				'Have you ever backed up your written notes in from of images and then lost them in your gallery!?']
		}
	},
	{
		head: 'Events Planner and Organiser',
		img: { src: 'images/eventsDarkMode.png', alt: 'Planner' },
		text: {
			para: 'Another student friendly feature provided by Studentadda is the Events Organizer. Also you will be able to color code different appointments so it will be easy to view and distinguish between them. For upcoming exams you will automatically be alerted about days left on the dashboard!',
			list: ['This will take care of all your college events, keep track of your submission deadlines and display them on the dashboard.',
				'You can easily store new calendar entries with features like setting default event durations depending on type of event.']
		}
	},
	{
		head: 'Dashboard',
		img: { src: 'images/fullView.png', alt: 'Dashboard' },
		text: {
			para: 'The Studentadda Dashboard will display both the Notes Organizer and Events Planner on a single interactive webpage. The Dashboard will display all your uploaded notes in order you want or priority. This priority will be based on your Events and Notes related to upcoming classes and exams will be shown first on the dashboard.',
			list: ['The Dashboard will also give you quick overview of all the upcoming events in a tabular form.',
				'The entire month with important dates will be highlighted for easy reminders. If a test is close then a reminder will be appear on the dashboard.']
		}
	}
];

const items = itemsObj.map((item, index) => {
	if (index % 2 === 0) {
		return <HomePageListItem {...item} key={index} reverse={false}/>;
	} else {
		return <HomePageListItem {...item} key={index} reverse={true}/>;
	}
});

const HomePageList = () => (
	<div>
		{ items }
	</div>
);

export default HomePageList;