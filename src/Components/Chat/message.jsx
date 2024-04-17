import React from 'react';
import './Message.css';

function Message({ message, userId }) {
    const isSelf = message.senderId === userId;
    
    return (
        <div className={`message ${isSelf ? 'self' : 'other'}`}>
            <p className='message-text'>{message.message}</p>
        </div>
    );
}

export default Message;
