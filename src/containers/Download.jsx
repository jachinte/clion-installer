import React from 'react';
import os from 'os';
import { ipcRenderer } from 'electron';
import { ProgressIndicator } from 'office-ui-fabric-react/lib-commonjs/ProgressIndicator';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib-commonjs/MessageBar';
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
            error: false,
            errorMessage: '',
            file: '',
            progress: 0,
        };
        loadTheme({
            palette: {
                'themePrimary': '#5c2d91'
            }
        });
    }

    componentDidMount() {
        var newPath = '/extraction';
        var files;
        switch (os.type()) {
            case 'Linux':
                files = [{ label: 'CLion 2018', url: 'https://download-cf.jetbrains.com/cpp/CLion-2018.2.1.tar.gz' }];
                break;
            case 'Darwin':
                newPath = '/clt';
                files = [{ label: 'CLion 2018', url: 'https://download-cf.jetbrains.com/cpp/CLion-2018.2.1.dmg' }];
                break;
            case 'Windows_NT':
                var MINGW;
                if (os.arch() === 'x64') {
                    MINGW = 'https://iweb.dl.sourceforge.net/project/mingw-w64/Toolchains%20targetting%20Win32/Personal%20Builds/mingw-builds/7.1.0/threads-posix/dwarf/i686-7.1.0-release-posix-dwarf-rt_v5-rev1.7z';
                } else {
                    MINGW = 'https://cfhcable.dl.sourceforge.net/project/mingw-w64/Toolchains%20targetting%20Win64/Personal%20Builds/mingw-builds/7.1.0/threads-posix/seh/x86_64-7.1.0-release-posix-seh-rt_v5-rev1.7z';
                }
                files = [
                    { label: `MinGW ${os.arch()}`, url: MINGW },
                    { label: 'CLion 2018', url: 'https://download-cf.jetbrains.com/cpp/CLion-2018.2.1.exe' }
                ];
                break;
            default: this.setState({ error: true, errorMessage: 'Unsupported operating system' });
        }
        ipcRenderer.on('download-progress', (event, args) => {
            this.setState({ progress: args.progress, file: args.file.label });
        });
        ipcRenderer.on('download-complete', (event, paths) => {
            this.props.history.push({
                pathname: newPath,
                state: { paths }
            });
        });
        ipcRenderer.on('download-error', (event, error) => {
            this.setState({ error: true, errorMessage: error });
            this.removeListeners();
        });
        ipcRenderer.send('download-files', files);
    }

    componentWillUnmount() {
        this.removeListeners();
    }

    removeListeners() {
        ipcRenderer.removeAllListeners('download-progress');
        ipcRenderer.removeAllListeners('download-complete');
        ipcRenderer.removeAllListeners('download-error');
    }

    render() {
        var component;
        if (this.state.error) {
            component = (
                <MessageBar
                    messageBarType={MessageBarType.error}
                    isMultiline={true}
                    dismissButtonAriaLabel="Close"
                >
                    An error has occurred. Please close this installer and try again.
                    If the error persists, please attend office hours.
                </MessageBar>
            );
        } else {
            const progress = this.state.progress ? (this.state.progress * 100).toFixed(0) : 0;
            component = (
                <ProgressIndicator
                    description={`Downloading ${this.state.file} (${progress}%)`}
                    label="Overall Progress"
                    percentComplete={this.state.progress} />
            );
        }
        const css = '.content h2::after { background-color: #5c2d91; }';
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
                        <h2 className="ms-font-xl ms-fontWeight-regular">Download</h2>
                        <style>{css}</style>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-lg8">
                        <div style={styles.secondColumn}>
                            <p>
                                Please wait while the official CLion installer and additional installation scripts are being downloaded.
                            </p>
                            <p>
                                This may take a couple of minutes to complete.
                            </p>
                            <br />
                            {component}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Download;
