import React from 'react';
import { exec } from 'child_process';
import { ActionButton } from 'office-ui-fabric-react/lib-commonjs/Button';
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

class CommandLineTools extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            launched: false,
        };
        loadTheme({
            palette: {
                'themePrimary': '#5c2d91'
            }
        });
    }

    componentDidMount() {
        exec('ls /Library/Developer/CommandLineTools', (error, stderr, stdout) => {
            if (!error) {
                this.onContinue();
            }
        });
    }

    onLaunch() {
        exec('xcode-select --install', (error, stderr, stdout) => {
            if (error) {
                this.setState({ error: true });
                console.log(error, stderr, stdout);
            }
        });
        this.setState({ launched: true });
    }

    onContinue() {
        this.props.history.push({
            pathname: '/mac',
            state: { paths: this.props.location.state.paths }
        });
    }

    renderButton() {
        var button;
        if (!this.state.launched) {
            button = (
                <ActionButton
                    iconProps={{ iconName: 'DoubleChevronUp8' }}
                    onClick={(e) => this.onLaunch()}
                    style={styles.button}>Launch installer</ActionButton>
            );
        } else {
            button = (
                <ActionButton
                    iconProps={{ iconName: 'DoubleChevronRight8' }}
                    onClick={(e) => this.onContinue()}
                    style={styles.button}>Continue</ActionButton>
            );
        }
        return button;
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
                        <h2 className="ms-font-xl ms-fontWeight-regular">Command Line Tools</h2>
                        <style>{css}</style>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-lg8">
                        <div style={styles.secondColumn}>
                            <p>
                                Next, we will install the Command Line Tools.
                                Please press the button <span className="ms-fontWeight-semibold">Launch installer</span>, and then <span className="ms-fontWeight-semibold">Install</span> in the emergent window.
                            </p>
                            <p>Once it is done, please press the button <span className="ms-fontWeight-semibold">Continue</span>, to resume the CLion installation.</p>
                            {component}
                            {this.renderButton()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CommandLineTools;
