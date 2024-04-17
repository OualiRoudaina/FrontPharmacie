import "./message.css";
import { format } from "timeago.js";

export default function Message({ message, currentUser }) {
  // Déterminez si le message appartient à l'utilisateur actuel
  const own = message.senderId === currentUser._id;

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        {/* Utilisez message.message pour afficher le texte du message */}
        {message.message && <p className="messageText">{message.message}</p>}
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
