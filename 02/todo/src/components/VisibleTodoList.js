import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import TodoList from './TodoList';
import * as actions from '../actions';
import { getVisibleTodos } from '../reducers';
import { fetchTodos } from '../api';

class VisibleTodoList extends Component { // elsint-disable
    componentDidMount() {
        this.fetchData();
    }
    componentDidUpdate(prevProps) {
        if (this.props.filter !== prevProps.filter) {
            this.fetchData();
        }
    }
    fetchData() {
        const { filter, receiveTodos } = this.props;
        fetchTodos(filter).then((todos) => {
            receiveTodos(filter, todos);
        });
    }
    render() {
        const { toggleTodo, ...rest } = this.props;
        return (
            <TodoList
                {...rest}
                onTodoClick={toggleTodo}
            />);
    }
}
const mapStateToProps = (state, { params }) => {
    const filter = params.filter || 'all';
    return {
        todos: getVisibleTodos(state, filter),
        filter,
    };
};
// eslint-disable-next-line
VisibleTodoList = withRouter(connect(mapStateToProps, actions)(VisibleTodoList));

export default VisibleTodoList;
