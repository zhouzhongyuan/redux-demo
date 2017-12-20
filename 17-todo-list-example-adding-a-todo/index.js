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
// store
const { createStore } = Redux;
const store = createStore(todoApp);
// view
let nextTodoId = 0;
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

const AddTodo = () => {
    let input;
    return (
        <div>
            <input
                type="text"
                ref={(node) => { input = node; }}
            />
            <button
                onClick={() => {
                    store.dispatch({
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

class FilterLink extends React.Component {
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
        });
    }
    compoenetWillUnmount() {
        this.unsubscribe();
    }
    render() {
        const props = this.props;
        const state = store.getState();
        return (
            <Link
                active={
                    props.filter === state.visibilityFilter
                }
                onClick={filter => store.dispatch({
                    type: 'SET_VISIBILITY_FILTER',
                    filter: props.filter,
                })}
            >
                {props.children}
            </Link>
        );
    }
}
const Footer = ({
}) => (
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

class VisibleTodoList extends React.Component {
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
        });
    }
    compoenetWillUnmount() {
        this.unsubscribe();
    }
    render() {
        const props = this.props;
        const state = store.getState();
        return (
            <TodoList
                todos={getVisibleTodos(state.todos, state.visibilityFilter)}
                onTodoClick={(id) => {
                    store.dispatch({
                        type: 'TOGGLE_TODO',
                        id,
                    });
                }}

            />
        );
    }
}
const TodoApp = ({
}) => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
);

ReactDOM.render(
    <TodoApp
        {...store.getState()}
    />,
    document.getElementById('root'),
);
