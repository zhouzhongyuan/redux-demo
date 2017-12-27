import { v4 } from 'node-uuid';
import { getIsFetching } from '../reducers';
import * as api from '../api';

const requestTodos = filter => ({
    type: 'REQUEST_TODOS',
    filter,
});

export const addTodo = text => ({
    type: 'ADD_TODO',
    id: v4(),
    text,
});

export const toggleTodo = id => ({
    type: 'TOGGLE_TODO',
    id,
});

const receiveTodos = (filter, response) => ({
    type: 'RECEIVE_TODOS',
    filter,
    response,
});

export const fetchTodos = filter => (dispatch, getState) => {
    if (getIsFetching(getState(), filter)) {
        return;
    }
    dispatch(requestTodos(filter));
    return api.fetchTodos(filter).then((response) => { // eslint-disable-line consistent-return
        dispatch(receiveTodos(filter, response));
    });
};

