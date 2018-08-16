import React from 'react';
import { loadTheme } from 'office-ui-fabric-react/lib-commonjs/Styling';

const styles = {
    angle: {
        backgroundColor: '	#e81123',
    },
    button: {
        float: 'right',
    },
    header: {
        backgroundColor: '	#e81123',
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
        loadTheme({
            palette: {
                'themePrimary': '	#e81123'
            }
        });
    }

    render() {
        return (
            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <header className="page-header content" style={styles.header}>
                            <h1 className="ms-font-su title">Prerequisites</h1>
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
                        <h2 className="ms-font-xl ms-fontWeight-regular">Files Extraction</h2>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-lg8">
                        <div style={styles.secondColumn}>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Extraction;
