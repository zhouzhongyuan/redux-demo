import { v4 } from 'node-uuid';

const fakeDatabase = {
    todos: [{
        id: v4(),
        text: 'hey',
        completed: true,
    },
    {
        id: v4(),
        text: 'ho',
        completed: true,
    },
    {
        id: v4(),
        text: 'let\'s go',
        completed: false,
    },
    ],
};

const delay = ms =>
    new Promise(resolve => setTimeout(resolve, ms));
// eslint-disable-next-line
export const fetchTodos = filter =>
    delay(5000).then(() => {
        switch (filter) {
        case 'all':
            return fakeDatabase.todos;
        case 'active':
            return fakeDatabase.todos.filter(t => !t.completed);
        case 'completed':
            return fakeDatabase.todos.filter(t => t.completed);
        default:
            return new Error(`Unknown filter: ${filter}`);
        }
    });
