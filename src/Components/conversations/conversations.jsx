import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import icon from "../Assets/icon.png"
import "./conversations.css"
const Conversation = ({ conversation, currentUser }) => {
  const [userDataCache, setUserDataCache] = useState({});
  const [loading, setLoading] = useState(true);
  const [renderedConversations, setRenderedConversations] = useState(new Set());
  const dispatch = useDispatch();

  const getUser = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3007/api/v1/utilisateur/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const otherUserId = currentUser === conversation.senderId ? conversation.recipientId : conversation.senderId;
      const key = [currentUser, otherUserId].sort().join('_'); // Créer une clé unique basée sur les IDs des personnes
      try {
        if (renderedConversations.has(key)) {
          // Si la conversation entre ces deux personnes a déjà été rendue, arrêtez le chargement et quittez la fonction
          setLoading(false);
          return;
        }
        // Ajouter la clé à l'ensemble des conversations rendues
        setRenderedConversations(prevSet => new Set(prevSet.add(key)));
        
        const userData = await getUser(otherUserId);
        if (userData) {
          setUserDataCache(prevCache => ({ ...prevCache, [otherUserId]: userData }));
          dispatch({ type: "SAVE_USER", data: userData });
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [currentUser, conversation, dispatch, renderedConversations]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const otherUserId = currentUser === conversation.senderId ? conversation.recipientId : conversation.senderId;
  const userData = userDataCache[otherUserId];

  return (
    <>
      <div className="follower conversation" key={conversation._id}>
        <div>
          <img
            src={
              icon
            }
            alt="Profile"
            className="conversationImg"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="conversationName" style={{ fontSize: "1rem" }}>
            <span>{userData?.data.name}</span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
