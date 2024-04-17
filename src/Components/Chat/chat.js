import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

function ChatComponent() {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const recipientIdRef = useRef('660b19a65161efaca630dac2'); // Par défaut, l'ID du destinataire
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const newSocket = io('ws://localhost:3007', {
            extraHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Tentative de connexion au serveur WebSocket...');
        
        newSocket.on('connect', () => {
            console.log('Connecté au serveur WebSocket');
        });
        
        newSocket.on('disconnect', () => {
            console.log('Déconnecté du serveur WebSocket');
        });
        
        newSocket.on('receive_message', (message) => {
            console.log('Message reçu :', message);
            setMessages(prevMessages => [...prevMessages, message]);
        });
        
        setSocket(newSocket);
        
        return () => newSocket.disconnect();
    }, []);
    
    
    // Gestion des messages reçus
    useEffect(() => {
        if (!socket) return;
    
        const receiveMessageHandler = (message) => {
            console.log('Message reçu:', message);
            setMessages(prevMessages => [...prevMessages, message]);
        };
    
        socket.on('receive_message', receiveMessageHandler);
    
        // Fonction pour récupérer les messages existants lorsque l'utilisateur se connecte à un socket
        const fetchExistingMessages = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await fetch(`http://localhost:3007/api/v1/chats/messages/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch messages');
                }
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
    
        fetchExistingMessages();
    
        return () => {
            socket.off('receive_message', receiveMessageHandler);
        };
    }, [socket, userId]);
    
    // Envoi d'un message
    const sendMessage = () => {
        const recipientId = recipientIdRef.current;
        if (!recipientId) {
            console.error('Destinataire non spécifié');
            return;
        }

        console.log('Envoi du message:', { recipientId, message: messageInput });
        socket.emit('send_message', { recipientId, message: messageInput });
        setMessageInput('');
    };

    return (
        <div>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>
                        <p><strong>From:</strong> {message.senderName}</p>
                        <p><strong>Message:</strong> {message.message}</p>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Entrez votre message"
            />
            <button onClick={sendMessage}>Envoyer</button>
        </div>
    );
}

export default ChatComponent;
