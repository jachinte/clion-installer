import React from 'react';
import { remote } from 'electron';
import { ActionButton } from 'office-ui-fabric-react/lib-commonjs/Button';
import { loadTheme } from 'office-ui-fabric-react/lib-commonjs/Styling';

const styles = {
    button: {
        bottom: '40px',
        position: 'fixed',
        right: '40px',
    },
    content: {
        backgroundColor: '#00B294',
        color: 'white',
        height: '260px',
        position: 'relative',
    },
    link: {
        color: 'white',
        padding: '10px',
        paddingLeft: 0,
    },
    nav: {
        padding: '5px 0 0 0',
    },
};

class Done extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: '',
            error: false,
            progress: 0,
        };
        loadTheme({
            palette: {
                'themePrimary': '#00B294'
            }
        });
    }

    onClose() {
        remote.getCurrentWindow().close();
    }

    render() {
        return (
            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <div className="content" style={styles.content}>
                            <header className="page-header">
                                <h1 className="ms-font-su title">Installation Completed</h1>
                            </header>
                            <br />
                            <br />
                            <p className="ms-font-l ms-fontWeight-regular">
                                The installation has been completed successfully.
                            </p>
                            <p className="ms-font-l ms-fontWeight-regular">
                                You may now close this window.
                            </p>
                            <ActionButton
                                iconProps={{ iconName: 'CompletedSolid' }}
                                onClick={this.onClose}
                                style={styles.button}>Close installer</ActionButton>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Done;
