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
    default:
        return state;
    }
};
// store
const { createStore } = Redux;
const store = createStore(todos);
// view
let nextTodoId = 0;
class TodoApp extends React.Component {
    render() {
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
                        this.props.todos.map(todo => (
                            <li
                                key={todo.id}
                            >
                                {todo.text}
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

const render = () => {
    ReactDOM.render(
        <TodoApp
            todos={store.getState()}
        />,
        document.getElementById('root'),
    );
};
store.subscribe(render);
render();
