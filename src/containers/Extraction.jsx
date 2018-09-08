import React from 'react';
import os from 'os';
import { ProgressIndicator } from 'office-ui-fabric-react/lib-commonjs/ProgressIndicator';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib-commonjs/MessageBar';
import { loadTheme } from 'office-ui-fabric-react/lib-commonjs/Styling';
import decompress from 'decompress';

const arch = os.arch() === "x64" ? 'x86_64' : 'x86';
const styles = {
    angle: {
        backgroundColor: '	#5c2d91',
    },
    button: {
        float: 'right',
    },
    header: {
        backgroundColor: '	#5c2d91',
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

class Extraction extends React.Component {
    constructor(props) {
        super(props);
        const exts = ['bz2', 'bzip2', 'tar', 'bz', 'gz', 'zip', '7z'];
        const compressedFiles = this.props.location.state.paths
            .filter(f => {
                return exts.indexOf(f.split('.').pop()) !== -1;
            });
        this.state = {
            error: false,
            files: compressedFiles
        };
        loadTheme({
            palette: {
                'themePrimary': '	#5c2d91'
            }
        });
    }

    componentDidMount() {
        // Store the executable
        this.setState({ executable: this.props.location.state.paths.filter(f => f.indexOf('.exe') !== -1)[0] });
        // Compressed files other than 7z
        this.state.files
            .filter(f => f.indexOf('.7z') === -1)
            .forEach(file => {
                decompress(file, './')
                    .then(files => this.onComplete(file))
                    .catch(error => this.setState({ error: true }));
            });

        // 7z files
        // workaround for using 'path' and app.asar. This is used specifically on Extraction.jsx
        // read more: https://github.com/epsitec-sa/hazardous
        require ('hazardous');
        const zip7z = require('node-7z-forall');
        const extractor = new zip7z();
        this.state.files
            .filter(f => f.indexOf('.7z') !== -1)
            .forEach(file => {
                extractor.extractFull(file, `${process.env['SystemDrive']}`, {y: true})
                    // .progress(files => {
                    //     console.log(files);
                    // })
                    .then(() => this.onComplete(file))
                    .catch(error => {
                        console.log(error);
                        this.setState({ error: true });
                    });
            });
    }

    onComplete(file) {
        const _files = this.state.files;
        const index = _files.indexOf(file);
        if (index !== -1) {
            _files.splice(index, 1);
            this.setState({ _files });
            if (this.state.files.length === 0) {
                var path;
                switch (os.type()) {
                    case 'Linux': path = "linux";
                        break;
                    case 'Darwin': path = "mac";
                        break;
                    case 'Windows_NT': path = "windows";
                        break;
                    default: path = "unknown";
                }
                this.props.history.push({
                    pathname: `/${path}`,
                    state: { executable: this.state.executable }
                });
            }
        }
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
                <div>{this.state.files.map(file =>
                    <ProgressIndicator
                        key={file}
                        label={file.substr(file.lastIndexOf('/') + 1)} />
                )}
                </div>
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
                        <h2 className="ms-font-xl ms-fontWeight-regular">Extract</h2>
                        <style>{css}</style>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-lg8">
                        <div style={styles.secondColumn}>
                            <p>
                                Please wait while the downloaded files are extracted.
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

export default Extraction;
