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

// view
let nextTodoId = 0;
const { connect } = ReactRedux;

const Todo = ({
    onClick,
    completed,
    text,
}) => (
    <li
        onClick={onClick}
        style={{
            textDecoration: completed ? 'line-through' : 'none',
        }}
    >
        {text}
    </li>
);

const TodoList = ({
    todos,
    onTodoClick,

}) => (
    <ul>
        {todos.map(todo => (
            <Todo
                key={todo.id}
                {...todo}
                onClick={() => onTodoClick(todo.id)}
            />
        ))}
    </ul>
);

let AddTodo = ({ dispatch }) => {
    let input;
    return (
        <div>
            <input
                type="text"
                ref={(node) => { input = node; }}
            />
            <button
                onClick={() => {
                    dispatch({
                        type: 'ADD_TODO',
                        id: nextTodoId++,
                        text: input.value,
                    });
                    input.value = '';
                }}
            >
                Add Todo
            </button>
        </div>
    );
};

AddTodo = connect()(AddTodo);

const Link = ({
    active,
    children,
    onClick,
}) => {
    if (active) {
        return (
            <span>{children}</span>
        );
    }
    return (
        <a
            href="#"
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
        >
            {children}
        </a>
    );
};

const mapStateToLinkProps = (state, ownProps) => ({
    active: ownProps.filter === state.visibilityFilter,
});

const mapDispatchToLinkProps = (dispatch, ownProps) => ({
    onClick: filter => dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: ownProps.filter,
    }),
});
const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);
const Footer = () => (
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
);
Footer.contextTypes = {
    store: React.PropTypes.object,
};
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

const mapStateToTodoListProps = ({ todos, visibilityFilter }) => ({
    todos: getVisibleTodos(todos, visibilityFilter),
});

const mapDispatchToTodoListProps = dispatch => ({
    onTodoClick: (id) => {
        dispatch({
            type: 'TOGGLE_TODO',
            id,
        });
    },
});
const VisibleTodoList = connect(mapStateToTodoListProps, mapDispatchToTodoListProps)(TodoList);
const TodoApp = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
);
const { Provider } = ReactRedux;
// store
const { createStore } = Redux;
ReactDOM.render(
    <Provider
        store={createStore(todoApp)}
    >
        <TodoApp />
    </Provider>,
    document.getElementById('root'),
);
