import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

// eslint-disable-next-line import/no-mutable-exports
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
                    dispatch(addTodo(input.value));
                    input.value = '';
                }}
            >
                Add Todo
            </button>
        </div>
    );
};

AddTodo = connect()(AddTodo);

export default AddTodo;
