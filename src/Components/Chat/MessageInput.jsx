import React, { useState } from 'react';

const MessageInput = ({ onSubmit }) => {
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return; // Vérifie si le message n'est pas vide
        onSubmit(message); // Appelle la fonction onSubmit passée en tant que prop avec le message
        setMessage(''); // Réinitialise le champ de saisie après la soumission
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={message}
                onChange={handleChange}
                placeholder="Entrez votre message..."
            />
            <button type="submit">Envoyer</button>
        </form>
    );
};

export default MessageInput;
