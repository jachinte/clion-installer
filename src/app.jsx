import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import Main from './containers/Main.jsx';
import Welcome from './containers/Welcome.jsx';
import Download from './containers/Download.jsx';
import Extraction from './containers/Extraction.jsx';
import LinuxInstallation from './containers/linux/Installation';
import MacInstallation from './containers/mac/Installation';
import WindowsInstallation from './containers/windows/Installation';
import Done from './containers/Done';
import UnknownOS from './containers/UnknownOS';

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
                    <Route path="/linux" component={ LinuxInstallation }/>
                    <Route path="/mac" component={ MacInstallation }/>
                    <Route path="/windows" component={ WindowsInstallation }/>
                    <Route path="/done" component={ Done }/>
                    <Route path="/unknown" component={ UnknownOS }/>
                </Main>
            </HashRouter>
        );
    }
}
