import React from 'react';
import { ipcRenderer } from 'electron';

class Prerequisites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0
        };
        this.files = [
            'https://github.com/jachinte/clion-installer/archive/master.zip',
            'https://download-cf.jetbrains.com/cpp/CLion-2017.2.1.tar.gz'
        ];
        ipcRenderer.on('download-progress', (event, progress) => {
            this.setState({progress});
        });
        ipcRenderer.on('downloads-complete', (event) => {
            // do something!
        });
    }

    componentDidMount() {
        ipcRenderer.send('download-files', this.files);
    }

    render(){
        return (
            <div>
                <h1>Hi there!</h1>
                <h2>Please wait until we download some files...</h2>
                <hr />
                <b>Progress: {this.state.progress}</b>
            </div>
        );
    }
}

export default Prerequisites;
