import "./message.css";
import { format } from "timeago.js";
import icon from "../Assets/icon.png"
export default function Message({ message, currentUser }) {
  // Déterminez si le message appartient à l'utilisateur actuel
  const own = message.senderId === currentUser._id;

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={icon}
          alt=""
        />
        {/* Utilisez message.message pour afficher le texte du message */}
        {message.message && <p className="messageText">{message.message}</p>}
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
