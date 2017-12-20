// filter
const todos = (state = [], action) => {
    switch (action.type) {
    case 'ADD_TODO':
        return ([
            ...state,
            {
                id: action.id,
                text: action.text,
                completed: false,
            },
        ]);
    case 'TOGGLE_TODO':
        return state.map((todo) => {
            if (todo.id !== action.id) {
                return todo;
            }
            return {
                ...todo,
                completed: !todo.completed,
            };
        });
        break;
    default:
        return state;
    }
};
const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
        return action.filter;
    default:
        return state;
    }
};
const { combineReducers } = Redux;
const todoApp = combineReducers({
    todos,
    visibilityFilter,
});
// store
const { createStore } = Redux;
const store = createStore(todoApp);
// view

const FilterLink = ({ filter, children }) => (
    <a
        href="#"
        onClick={(e) => {
            e.preventDefault();
            store.dispatch({
                type: 'SET_VISIBILITY_FILTER',
                filter,
            });
        }}

    >
        {children}
    </a>
);
const getVisibleTodos = (todos, filter) => {
    switch (filter) {
    case 'SHOW_ALL':
        return todos;
    case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed);
    }
};
let nextTodoId = 0;
class TodoApp extends React.Component {
    render() {
        const visiableTodos = getVisibleTodos(this.props.todos, this.props.visibilityFilter);
        return (
            <div>
                <input
                    type="text"
                    ref={(node) => { this.input = node; }}
                />
                <button
                    onClick={
                        () => {
                            store.dispatch({
                                type: 'ADD_TODO',
                                id: nextTodoId++,
                                text: this.input.value,
                            });
                            this.input.value = '';
                        }
                    }
                >
                    Add Todo
                </button>
                <ul>
                    {
                        visiableTodos.map(todo => (
                            <li
                                key={todo.id}
                                onClick={() => {
                                    store.dispatch({
                                        type: 'TOGGLE_TODO',
                                        id: todo.id,
                                    });
                                }}
                                style={{
                                    textDecoration: todo.completed ? 'line-through' : 'none',
                                }}
                            >
                                {todo.text}
                            </li>
                        ))
                    }
                </ul>
                <p>
                    Show:
                    {' '}
                    <FilterLink
                        filter="SHOW_ALL"
                    >
                        All
                    </FilterLink>
                    {' '}
                    <FilterLink
                        filter="SHOW_ACTIVE"
                    >
                        Active
                    </FilterLink>
                    {' '}
                    <FilterLink
                        filter="SHOW_COMPLETED"
                    >
                        Completed
                    </FilterLink>

                </p>

            </div>
        );
    }
}

const render = () => {
    ReactDOM.render(
        <TodoApp
            {...store.getState()}
        />,
        document.getElementById('root'),
    );
};
store.subscribe(render);
render();
