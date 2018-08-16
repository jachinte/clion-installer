import React from 'react';
import { ipcRenderer } from 'electron';
import { ProgressIndicator } from 'office-ui-fabric-react/lib-commonjs/ProgressIndicator';
import { loadTheme } from 'office-ui-fabric-react/lib-commonjs/Styling';

const styles = {
    angle: {
        backgroundColor: '#5c2d91',
    },
    button: {
        float: 'right',
    },
    header: {
        backgroundColor: '#5c2d91',
        color: 'white',
    },
    link: {
        color: 'white',
        padding: '10px',
        paddingLeft: 0,
    },
    nav: {
        padding: '5px 0 0 0',
    },
    secondColumn: {
        paddingLeft: '40px',
    },
};

class Download extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            file: ''
        };
        this.files = [
            { label: 'installation scripts', url: 'https://github.com/jachinte/clion-installer/archive/master.zip' },
            { label: 'CLion 2018', url: 'https://download-cf.jetbrains.com/cpp/CLion-2017.2.1.tar.gz' }
        ];
        ipcRenderer.on('download-progress', (event, args) => {
            this.setState({ progress: args.progress, file: args.file.label });
        });
        ipcRenderer.on('download-complete', (event) => this.props.router.push('/extraction'));
        ipcRenderer.on('download-error', (event) => { });
        loadTheme({
            palette: {
                'themePrimary': '#5c2d91'
            }
        });
    }

    componentDidMount() {
        ipcRenderer.send('download-files', this.files);
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners('download-progress');
        ipcRenderer.removeAllListeners('downloads-complete');
    }

    render() {
        return (
            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <header className="page-header content" style={styles.header}>
                            <h1 className="ms-font-su title">Prerequisites</h1>
                        </header>
                        <div className="angle" style={styles.angle}></div>
                    </div>
                </div>
                <br />
                <div className="ms-Grid-row content">
                    <div className="ms-Grid-col ms-sm12 ms-lg4">
                        <h2 className="ms-font-xl ms-fontWeight-regular">Files Download</h2>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-lg8">
                        <div style={styles.secondColumn}>
                            <p>
                                Please wait while we download the official CLion installer and additional installation scripts.
                                This may take a couple of minutes to complete.
                            </p>
                            <ProgressIndicator
                                description={`Downloading ${this.state.file}`}
                                label="Download Progress"
                                percentComplete={this.state.progress} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Download;
