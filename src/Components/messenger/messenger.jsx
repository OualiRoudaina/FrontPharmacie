import "./messenger.css";
import Conversation from "../conversations/conversations.jsx";
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/authContext.js";
import axios from "axios";
import { io } from "socket.io-client";
import Message from "../message/message.jsx";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const socket = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const { user } = useContext(AuthContext);
  const scrollRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log(`Access token: ${token}`);
    if (token) {
      socket.current = io("ws://localhost:3007", {
        extraHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      socket.current.on('connect', () => {
        console.log('Connecté au serveur WebSocket');
      });
      socket.current.on("getMessage", (data) => {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage &&
      arrivalMessage.sender === user._id &&
      setMessages((prevMessages) => {
        const conversationId = arrivalMessage.conversationId;
        return {
          ...prevMessages,
          [conversationId]: [...(prevMessages[conversationId] || []), arrivalMessage]
        };
      });
  }, [arrivalMessage, user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:3007/api/v1/chats/messages/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const conversationsWithId = response.data.map((conversation) => ({
          ...conversation,
          _id: conversation._id
        }));
        setConversations(conversationsWithId);
        console.log("Conversations récupérées depuis le serveur :", conversationsWithId);
      } catch (error) {
        console.error('Erreur lors de la récupération des conversations:', error);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessagesForCurrentChat = async () => {
      try {
        if (currentChat) {
          const token = localStorage.getItem('accessToken');
          console.log("currentChat", currentChat._id);
          const response = await axios.get(`http://localhost:3007/api/v1/chats/conversation/${currentChat.senderId}/${currentChat.recipientId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log('response data:', response.data);
  
          const newMessages = Array.isArray(response.data) ? response.data : [response.data];
          console.log('newMessages:', newMessages);
  
          setMessages((prevMessages) => ({
            ...prevMessages,
            [currentChat._id]: newMessages
          }));
  console.log('messages',messages)
          console.log('updated messages:', {
            ...messages,
            [currentChat._id]: newMessages
          });
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des messages:', error);
      }
    };
  
    getMessagesForCurrentChat();
  }, [currentChat]);
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentChat || !newMessage) return;

    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    try {
      const token = localStorage.getItem('accessToken');
      socket.current.emit("send_message", {
        senderId: user._id,
        recipientId: currentChat.senderId,
        message: newMessage,
        
      })
      console.log('sender Id :',user._id)
      console.log('recipient Id :',currentChat.senderId)
      setMessages((prevMessages) => ({
        ...prevMessages,
        [currentChat._id]: [...(prevMessages[currentChat._id] || []), message]

      }));
console.log("message",messages)
      setNewMessage("");
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      console.log(err);
    }
  };
console.log("conversations",conversations)
  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              
              <div onClick={() => setCurrentChat(c)} key={c._id}>
                <Conversation key={c._id} conversation={c} currentUser={user} messages={messages[c._id] || []} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
  {messages[currentChat._id] && messages[currentChat._id].map((m, index) => (
    <div key={index} ref={scrollRef}>
      <Message message={m} currentUser={user} own={m.sender === user._id} />
    </div>
  ))}
</div>

                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
