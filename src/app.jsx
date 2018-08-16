import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import Main from './containers/Main.jsx';
import Welcome from './containers/Welcome.jsx';
import Download from './containers/Download.jsx';
import Extraction from './containers/Extraction.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <HashRouter>
                <Main>
                    <Route exact path="/" component={ Welcome }/>
                    <Route path="/download" component={ Download }/>
                    <Route path="/extraction" component={ Extraction }/>
                </Main>
            </HashRouter>
        );
    }
}
