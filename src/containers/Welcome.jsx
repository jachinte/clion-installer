import React from 'react';
import {Link} from 'react-router-dom';

class Welcome extends React.Component {
    render(){
        return (
            <div>
                <h1>Welcome</h1>
                <Link to='/prerequisites'>Start</Link>
            </div>
        );
    }
}

export default Welcome;
