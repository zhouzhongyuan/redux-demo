import React from 'react';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import App from './App';

const Root = ({ store }) => (
    <AppContainer>
        <Provider
            store={store}
        >
            <App />
        </Provider>
    </AppContainer>
);

export default Root;
// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept();
}
