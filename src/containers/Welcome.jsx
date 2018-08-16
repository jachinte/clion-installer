import React from 'react';
import {Link} from 'react-router-dom';
import Steps from 'react-steps';

class Welcome extends React.Component {
    render(){
    	const steps = [
    		{
		        'text': 'Download required files',
		        'isActive': false,
		        'isDone': false
			},
			{
		        'text': 'Extract compressed files',
		        'isActive': false,
		        'isDone': false
			},
			{
		        'text': 'Install prerequisites',
		        'isActive': false,
		        'isDone': false
			},
			{
		        'text': 'Install CLion',
		        'isActive': false,
		        'isDone': false
			}
    	];
        return (
            <div>
                <h1>Welcome</h1>
                <Link to='/prerequisites'>Start</Link>
                <Steps items={steps} type={'point'} flat={true}/>
            </div>
        );
    }
}

export default Welcome;
