import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

// main component
class TrackmApplication extends React.Component {
    render() {
        return (
            <div className ="trackm">
                <div>Good morning</div>
            </div>
        );
    }
}

// Finds the root of the app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render the app in the root DOM Element
ReactDOM.render(React.createElement(TrackmApplication), container);