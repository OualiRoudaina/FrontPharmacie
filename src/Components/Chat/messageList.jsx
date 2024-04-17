import React from 'react';
import Message from './message';
import './MessageList.css';

function MessageList({ messages, userId }) {
    return (
        <div className='message-list'>
            {messages.map((message, index) => (
                <Message key={index} message={message} userId={userId} />
            ))}
        </div>
    );
}

export default MessageList;
