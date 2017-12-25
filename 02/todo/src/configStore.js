import { createStore } from 'redux';
import todoApp from './reducers';

const addLoggingToDispatch = (store) => {
    const rawDidpatch = store.dispatch;
    if (!console.group) {
        return rawDidpatch;
    }
    return (action) => {
        console.group(action.type);
        console.log('%c prev state', 'color: gray', store.getState());
        console.log('%c action', 'color: blue', action);
        const returnValue = rawDidpatch(action);
        console.log('%c next state', 'color: green', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    };
};
const configStore = () => {
    const store = createStore(todoApp);
    if (process.env.NODE_ENV !== 'production') {
        store.dispatch = addLoggingToDispatch(store);
    }
    return store;
};

export default configStore;
