import React from 'react';
import AddTodo from './AddTodo';
import Footer from './Footer';
import VisibleTodoList from './VisibleTodoList';

const TodoApp = ({ params }) => (
    <div>
        <AddTodo />
        <VisibleTodoList
            filter={params.filter || 'all'}
        />
        <Footer />
    </div>
);
export default TodoApp;
