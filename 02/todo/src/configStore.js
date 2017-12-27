import { createStore } from 'redux';
import todoApp from './reducers';

const logger = store => (next) => {
    if (!console.group) {
        return next;
    }
    return (action) => {
        console.group(action.type);
        console.log('%c prev state', 'color: gray', store.getState());
        console.log('%c action', 'color: blue', action);
        const returnValue = next(action);
        console.log('%c next state', 'color: green', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    };
};
// eslint-disable-next-line no-unused-vars
const promise = store => next => (action) => {
    if (typeof action.then === 'function') {
        return action.then(next);
    }
    return next(action);
};
const wrapDispatchWithMiddlewares = (store, middlesares) => {
    // eslint-disable-next-line no-shadow
    middlesares.slice().reverse().forEach((middlesares) => {
        // eslint-disable-next-line no-param-reassign
        store.dispatch = middlesares(store)(store.dispatch);
    });
};
const configStore = () => {
    const store = createStore(todoApp);
    const middlewares = [promise];
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(logger);
    }

    wrapDispatchWithMiddlewares(store, middlewares);
    return store;
};

export default configStore;
