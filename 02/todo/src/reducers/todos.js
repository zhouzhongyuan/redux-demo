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

export default todos;

export const getVisibleTodos = (state, filter) => {
    switch (filter) {
    case 'all':
        return state;
    case 'completed':
        return state.filter(t => t.completed);
    case 'active':
        return state.filter(t => !t.completed);
    default:
        throw new Error(`Unknown filter ${filter}.`);
    }
};
