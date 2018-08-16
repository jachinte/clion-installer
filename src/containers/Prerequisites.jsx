import React from 'react';
import { ipcRenderer } from 'electron';
import Steps from 'react-steps';
import { Line } from 'react-progressbar.js';

class Prerequisites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0
        };
        this.files = [
            'https://github.com/jachinte/clion-installer/archive/master.zip',
            'https://download-cf.jetbrains.com/cpp/CLion-2017.2.1.tar.gz'
        ];
        ipcRenderer.on('download-progress', (event, progress) => {
            this.setState({progress});
        });
        ipcRenderer.on('downloads-complete', (event) => {
            // do something!
        });
    }

    componentDidMount() {
        ipcRenderer.send('download-files', this.files);
    }

    render(){
        const steps = [
            {
                'text': 'Download required files',
                'isActive': true,
                'isDone': false
            },
            {
                'text': 'Extract compressed files',
                'isActive': false,
                'isDone': false
            },
            {
                'text': 'Install prerequisites',
                'isActive': false,
                'isDone': false
            },
            {
                'text': 'Install CLion',
                'isActive': false,
                'isDone': false
            }
        ];
        const options = {
            color: '#BADA55',
            duration: 500,
            strokeWidth: 3,
            trailColor: '#eee',
            trailWidth: 0.5,
        };
        const containerStyle = {
            width: '90%',
            height: '60px',
            margin: 'auto',
        };
        const format = (n) => parseFloat(Math.round(n * 100) / 100).toFixed(2);
        return (
            <div>
                <h1>Hi there!</h1>
                <h2>Please wait until we download some files...</h2>
                <Line
                    progress={this.state.progress}
                    text={`${format(this.state.progress * 100)}%`}
                    options={options}
                    initialAnimate={true}
                    containerStyle={containerStyle}
                    containerClassName={'.progressbar'} />
                <Steps items={steps} type={'point'} flat={true}/>
            </div>
        );
    }
}

export default Prerequisites;
