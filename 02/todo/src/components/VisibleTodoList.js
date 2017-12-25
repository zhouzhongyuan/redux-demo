import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import TodoList from './TodoList';
import { toggleTodo } from '../actions';

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
    case 'all':
        return todos;
    case 'completed':
        return todos.filter(t => t.completed);
    case 'active':
        return todos.filter(t => !t.completed);
    default:
        throw new Error(`Unknown filter ${filter}.`);
    }
};

const mapStateToProps = (state, { params }) => ({
    todos: getVisibleTodos(state.todos, params.filter || 'all'),
});

const mapDispatchToProps = dispatch => ({
    onTodoClick: (id) => {
        dispatch(toggleTodo(id));
    },
});
const VisibleTodoList = withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoList));

export default VisibleTodoList;
