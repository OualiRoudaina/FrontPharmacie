import React, { useState, useEffect, useRef } from 'react';
import MessageList from './messageList';
import MessageInput from './MessageInput';
import './ChatComponent.css';
import io from 'socket.io-client';

function ChatComponent() {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const recipientIdRef = useRef('65ce0d7cc4a4d99b8d38377e'); // Par défaut, l'ID du destinataire
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
    
    
    useEffect(() => {
        if (!socket) return;
    
        const receiveMessageHandler = (message) => {
            console.log('Message reçu:', message);
            setMessages(prevMessages => [...prevMessages, message]);
        };
    
        socket.on('receive_message', receiveMessageHandler);
    
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
        <div className='chat-component'>
            <MessageList messages={messages} userId={userId} />
            <MessageInput 
                messageInput={messageInput}
                setMessageInput={setMessageInput}
                sendMessage={sendMessage}
            />
        </div>
    );
}

export default ChatComponent;
