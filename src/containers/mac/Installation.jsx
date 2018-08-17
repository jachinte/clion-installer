import React from 'react';
import { exec } from 'child_process';
import { ProgressIndicator } from 'office-ui-fabric-react/lib-commonjs/ProgressIndicator';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib-commonjs/MessageBar';
import { loadTheme } from 'office-ui-fabric-react/lib-commonjs/Styling';

const styles = {
    angle: {
        backgroundColor: '#0078d4',
    },
    button: {
        float: 'right',
    },
    header: {
        backgroundColor: '#0078d4',
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

class Installation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: '',
            error: false,
            progress: 0,
        };
        loadTheme({
            palette: {
                'themePrimary': '#0078d4'
            }
        });
    }

    componentDidMount() {
        const file = this.props.location.state.paths[0];
        const commands = [
            `hdiutil attach "${file}"`,
            'ditto /Volumes/CLion/CLion.app /Applications/CLion.app',
            'hdiutil detach /Volumes/CLion/'
        ];
        this.setState({ currentStep: 'Mounting CLion.app to /Volumes/CLion/CLion.app' });
        exec(commands[0], (e, err, std) => {
            this.setState({ currentStep: 'Copying the application contents to /Applications/CLion.app' });
            this.setState({ progress: 1/3 });
            exec(commands[1], (e, err, std) => {
                this.setState({ currentStep: 'Unmounting /Volumes/CLion/' });
                this.setState({ progress: 2/3 });
                exec(commands[2], (e, err, std) => {
                    this.setState({ progress: 1 });
                    this.props.history.push('/done');
                });
            });
        });
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
                    An error has occurred. Please close this installer and try again. If the error persists, please attend office hours.
                </MessageBar>
            );
        } else {
            component = (
                <ProgressIndicator
                    label="Overall Installation"
                    description={this.state.currentStep}
                    percentComplete={this.state.progress} />
            );
        }
        const css = '.content h2::after { background-color: #0078d4; }';
        return (
            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <header className="page-header content" style={styles.header}>
                            <h1 className="ms-font-su title">Installation</h1>
                        </header>
                        <div className="angle" style={styles.angle}></div>
                    </div>
                </div>
                <br />
                <div className="ms-Grid-row content">
                    <div className="ms-Grid-col ms-sm12 ms-lg4">
                        <h2 className="ms-font-xl ms-fontWeight-regular">Third-party Installers</h2>
                        <style>{css}</style>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-lg8">
                        <div style={styles.secondColumn}>
                            <p>
                                Please wait while we execute third-party installation software.
                                This may take a couple of minutes to complete.
                            </p>
                            {component}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Installation;
