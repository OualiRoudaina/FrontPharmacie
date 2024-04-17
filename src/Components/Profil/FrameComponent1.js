import "./FrameComponent1.css";
import online_pharmacy from '../Assets/online-pharmacy.png';
import conversation from '../Assets/conversation.png';
import back from '../Assets/back.png';
import React from 'react';
import { useNavigate } from "react-router-dom";

const FrameComponent1 = () => {
  const navigate = useNavigate();

  const handleParamaClick = () => {
    navigate("/dash");
};
  return (
    <div className="frame-group">
      <div className="parent">
        <img className="icon" loading="lazy" alt="" src={back} onClick={handleParamaClick} />
        <div className="mon-profil">Mon Profil</div>
      </div>
      <div className="message-frame-wrapper">
        <div className="message-frame">
          <div className="conversation-frame">
            <div className="name-frame">
              <div className="name-frame-child" />
              <b className="samira-ben-hadj">Samira Ben Hadj Ali</b>
              <img
                className="online-pharmacy-1-icon"
                loading="lazy"
                alt=""
                src={online_pharmacy}
              />
              <img
                className="conversation-1-icon"
                loading="lazy"
                alt=""
                src={conversation}
              />
            </div>
            <div className="s-label">
              <div className="s-label-child" />
              <h1 className="s">S</h1>
            </div>
          </div>
          <div className="message-text">
            <div className="download-button1">
              <div className="settings-rectangle" />
              <div className="mes-ordres">Mes ordres</div>
              
            </div>
            <div className="mes-messages">Mes messages</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent1;
