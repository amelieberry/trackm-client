import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view';

import './index.scss';

// main component
class TrackmApplication extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [
                {_id: 1, Title: 'Inception', Description: 'description 1', ImagePath: '...'},
                {_id: 2, Title: 'The Shawshank Redemption', Description: 'description 2', ImagePath: '...'},
                {_id: 3, Title: 'Gladiator', Description: 'description 3', ImagePath: '...'}
            ]
        }
    }
    render() {
        return (
            <MainView />
        );
    }
}

// Finds the root of the app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render the app in the root DOM Element
ReactDOM.render(React.createElement(TrackmApplication), container);