import React from 'react';

const FetchError = ({ message, onRetry }) => (
    <div>
        <div>Could not fetch todos. {message}</div>
        <button onClick={onRetry}>Retry</button>
    </div>);
export default FetchError;
