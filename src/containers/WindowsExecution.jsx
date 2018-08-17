import React from 'react';
import { ProgressIndicator } from 'office-ui-fabric-react/lib-commonjs/ProgressIndicator';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib-commonjs/MessageBar';
import { loadTheme } from 'office-ui-fabric-react/lib-commonjs/Styling';

const styles = {
    angle: {
        backgroundColor: '#bad80a',
    },
    button: {
        float: 'right',
    },
    header: {
        backgroundColor: '#bad80a',
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

class WindowsExecution extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: '',
            error: false,
            progress: 0,
        };
        loadTheme({
            palette: {
                'themePrimary': '#bad80a'
            }
        });
    }

    componentDidMount() {

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
        const css = '.content h2::after { background-color: #bad80a; }';
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

export default WindowsExecution;
