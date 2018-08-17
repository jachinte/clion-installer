import React from 'react';
import { Link } from 'react-router-dom';
import { ActionButton } from 'office-ui-fabric-react/lib-commonjs/Button';
import { loadTheme } from 'office-ui-fabric-react/lib-commonjs/Styling';

const styles = {
    angle: {
        backgroundColor: '#ff8c00',
    },
    button: {
        float: 'right',
    },
    header: {
        backgroundColor: '#ff8c00',
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

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        loadTheme({
            palette: {
                'themePrimary': '#ff8c00'
            }
        });
    }

    render() {
        const css = '.content h2::after { background-color: #ff8c00; }';
        return (
            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <header className="page-header content" style={styles.header}>
                            <h1 className="ms-font-su title">Welcome</h1>
                            <nav style={styles.nav}>
                                <a href="https://coursespaces.uvic.ca" className="ms-fontWeight-semibold" style={styles.link} target="_blank">CourseSpaces</a>
                                <a href="https://coursespaces.uvic.ca" className="ms-fontWeight-semibold" style={styles.link} target="_blank">Learn more</a>
                                <a href="https://coursespaces.uvic.ca" className="ms-fontWeight-semibold" style={styles.link} target="_blank">Other resources</a>
                            </nav>
                        </header>
                        <div className="angle" style={styles.angle}></div>
                    </div>
                </div>
                <br />
                <div className="ms-Grid-row content">
                    <div className="ms-Grid-col ms-sm12 ms-lg4">
                        <h2 className="ms-font-xl ms-fontWeight-regular">CLion 2018 Installer</h2>
                        <style>{css}</style>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-lg8">
                        <div style={styles.secondColumn}>
                            <p>
                                This program will help you install CLion 2018 and other components necessary to setup your environment.
                            </p>
                            <p>
                                Should you encounter issues during the installation, please attend office hours.
                            </p>
                            <Link to="/download" style={styles.button}>
                                <ActionButton iconProps={{ iconName: 'DoubleChevronRight8' }}>Start</ActionButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Welcome;
