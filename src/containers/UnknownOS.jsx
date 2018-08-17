import React from 'react';
import { remote } from 'electron';
import { ActionButton } from 'office-ui-fabric-react/lib-commonjs/Button';
import { loadTheme } from 'office-ui-fabric-react/lib-commonjs/Styling';

const styles = {
    angle: {
        backgroundColor: '#e81123',
    },
    button: {
        float: 'right',
    },
    header: {
        backgroundColor: '#e81123',
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

class UnknownOS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: '',
            error: false,
            progress: 0,
        };
        loadTheme({
            palette: {
                'themePrimary': '#e81123'
            }
        });
    }

    onClose() {
        remote.getCurrentWindow().close();
    }

    render() {
        const css = '.content h2::after { background-color: #e81123; }';
        return (
            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <header className="page-header content" style={styles.header}>
                            <h1 className="ms-font-su title">Installation Error</h1>
                        </header>
                        <div className="angle" style={styles.angle}></div>
                    </div>
                </div>
                <br />
                <div className="ms-Grid-row content">
                    <div className="ms-Grid-col ms-sm12 ms-lg4">
                        <h2 className="ms-font-xl ms-fontWeight-regular">Unsupported System</h2>
                        <style>{css}</style>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-lg8">
                        <div style={styles.secondColumn}>
                            <p>
                                Your operating system is not currently supported.
                                Please attend office hours to get further assistance.
                            </p> 
                            <ActionButton
                                iconProps={{ iconName: 'StatusErrorFull' }}
                                onClick={this.onClose}
                                style={styles.button}>Close installer</ActionButton>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UnknownOS;
