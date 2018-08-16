import React from 'react';
import { Fabric } from 'office-ui-fabric-react/lib-commonjs/Fabric';
import { initializeIcons } from '@uifabric/icons';

class Main extends React.Component {
    constructor(props) {
        super(props);
        // Register icons and pull the fonts from the default SharePoint cdn.
        initializeIcons();
    }

    render() {
        return (
            <Fabric>
                {this.props.children}
            </Fabric>
        );
    }
}

export default Main;
