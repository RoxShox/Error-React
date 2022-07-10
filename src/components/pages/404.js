import React from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import {Link} from 'react-router-dom'
const Page404 = () => {
	return (
		<div>
			<ErrorMessage/>
			<p style={{'textAlign': 'center', 'fontSize': '24px'}}>GO BACK MAN</p>
			<Link style={{'textAlign': 'center', 'fontSize': '24px', 'color': 'teal'}}
			to="/">BACK LINK</Link>
		</div>
	);
};

export default Page404;