import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import throttle from 'lodash/throttle';

import TodoApp from './components/App';
import todoApp from './reducers';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();
const store = createStore(
    todoApp,
    persistedState,
);
store.subscribe(throttle(() => {
    saveState({
        todos: store.getState().todos,
    });
}), 1000);
const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider
                store={store}
            >
                <Component />
            </Provider>
        </AppContainer>,
        document.getElementById('root'),
    );
};

render(TodoApp);

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept();
}
