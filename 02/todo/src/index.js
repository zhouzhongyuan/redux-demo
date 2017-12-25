import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import configStore from './configStore';
import { fetchTodos } from './api';

fetchTodos('all').then(todos => console.log(todos));
const store = configStore();
ReactDOM.render(
    <Root store={store} />,
    document.getElementById('root'),
);

