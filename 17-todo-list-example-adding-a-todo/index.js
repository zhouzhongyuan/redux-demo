// filter
const todos = (state = [], action) => {
    switch (action.type) {
    case 'ADD_TODO':
        return ([
            ...state,
            {
                id: 1,
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

class TodoApp extends React.Component {
    render() {
        return (
            <div>
                <button
                    onClick={
                        () => {
                            store.dispatch({
                                type: 'ADD_TODO',
                                id: 1,
                                text: 'Go shopping',
                            });
                        }
                    }
                >
                    Add
                </button>
                <ul>
                    {
                        this.props.todos.map(todo => (
                            <li>{todo.text}</li>
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
