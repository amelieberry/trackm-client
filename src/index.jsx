import React from 'react';
import { createRoot } from 'react-dom/client';
import Container from 'react-bootstrap/Container';
import { legacy_createStore as createStore} from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import moviesApp from './reducers/reducers';

import MainView from './components/main-view/main-view';

import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

// main component
function TrackmApplication() {
    return (
        <Provider store={store}>
            <Container>
                <MainView />
            </Container>
        </Provider>
    );
}

// Finds the root of the app
const container = document.getElementsByClassName('app-container')[0];
createRoot(container).render(React.createElement(TrackmApplication));