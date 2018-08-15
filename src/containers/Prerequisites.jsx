import React from 'react';
import { ipcRenderer } from 'electron';

class Prerequisites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: {}
        };
        this.files = [
            {
                label: 'Installation scripts',
                url: 'https://github.com/jachinte/clion-installer/archive/master.zip'
            },
            {
                label: 'CLion 2017.2.1',
                url: 'https://download-cf.jetbrains.com/cpp/CLion-2017.2.1.tar.gz'
            },
        ];
        ipcRenderer.on('download-progress', (event, args) => {
            const previous = this.state;
            previous.progress[args.file.url] = args.progress;
            this.setState(previous);
        });
        ipcRenderer.on('downloads-complete', (event) => {
            // do something!
        });
    }

    componentDidMount() {
        ipcRenderer.send('download-files', this.files);
    }

    renderFiles() {
        return (
            <ul>
            {this.files.map(file => {
                return <li key={file.url}>{file.label} {this.state.progress[file.url]}</li>
            })}
            </ul>
        );
    }

    render(){
        return (
            <div>
                <h1>Hi there!</h1>
                <h2>Please wait until we download some files...</h2>
                <hr />
                {this.renderFiles()}
            </div>
        );
    }
}

export default Prerequisites;
