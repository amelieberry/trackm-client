import React from 'react';
import ReactDOM from 'react-dom/client';
import { MainView } from './components/main-view/main-view';

import './index.scss';

// main component
class TrackmApplication extends React.Component {
    render() {
        return (
            <MainView />
        );
    }
}

// Finds the root of the app
const container = document.getElementsByClassName('app-container')[0];
const rootElement = ReactDOM.createRoot(container)
// Tells React to render the app in the root DOM Element
rootElement.render(<TrackmApplication />);