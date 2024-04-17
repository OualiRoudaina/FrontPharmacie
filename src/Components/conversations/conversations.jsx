import axios from "axios";
import { useEffect, useState } from "react";
import "./conversations.css";

export default function Conversation({ conversation, currentUser,  }){
  
  const [friend, setFriend] = useState(null);
  const [previousSenderId, setPreviousSenderId] = useState(null);

  useEffect(() => {
   // console.log("Current user:", currentUser);
    console.log("Conversation:", conversation);

    const getFriendDetails = async () => {
      try {
        if (conversation && currentUser ) {
          const senderId = conversation.senderId;
          const receiverId = conversation.recipientId;
          
          
         // console.log("SenderId:", senderId);
         // console.log("ReceiverId:", receiverId);
         // console.log("CurrentUserId:", currentUser._id);

          const otherUserId = senderId === currentUser._id ? receiverId : senderId;
         // console.log("OtherUserId:", otherUserId);

          //console.log("Is senderId equal to CurrentUserId?", senderId === currentUser._id);
          //console.log("Is receiverId equal to CurrentUserId?", receiverId === currentUser._id);
          //console.log("Is the condition true?", otherUserId === currentUser._id);
          if  (senderId && conversation.senderName) {
            const response = await axios.get(`http://localhost:3007/api/v1/chats/messages/${currentUser._id}`);

            console.log("Réponse de la requête axios :", response.data);
            setFriend(response.data);
          } 
        }
      } catch (error) {
        console.error("Error fetching friend details:", error);
      }
    };

    getFriendDetails();
    
  }, [currentUser, conversation]);

  return (
    <>
      {conversation.senderId !== currentUser._id && conversation.senderName &&
(
        <div className="conversation">
          <img
            className="conversationImg"
            src={friend && friend.profilePicture ? `../../path/to/profilePictures/${friend.profilePicture}` : `../../path/to/defaultAvatar/noAvatar.png`}
            alt=""
          />
          <span className="conversationName">
            {conversation.senderName}
          </span>
        </div>
      )}
    </>
  );
  
}
