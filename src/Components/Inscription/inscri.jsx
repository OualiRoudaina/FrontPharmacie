import React from "react";
import './inscri.css';
import upload from '../Assets/upload.png';
import { useNavigate } from "react-router-dom";
import Lottie from 'react-lottie';
import animationData from "../Assets/Animation - 1713053494210.json"; // Remplacez "yourAnimation.json" par le nom de votre fichier JSON d'animation Lottie

export const Signup = () => {
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate("/");
    };

    return (
        <div className="inscription">
            <div className="div">
                <div className="overlap-group">
                    <div className="overlap1">
                        <div className="text-wrapper5">Inscription</div>
                        <div className="text-wrapper5"onClick={handleSignUpClick}>Connexion</div>
                    </div>
                    <p className="nouveau-sur">
                        <span className="text-wrapper">
                            Nouveau sur 3P
                            <br />
                            <br />
                        </span>
                        <span className="span">
                            Inscrivez-vous en un seul clic
                            <br />
                            avec votre plateforme médicale
                        </span>
                    </p>
                    <div>
                        <input className="overlap" placeholder="Nom de pharmacie" />
                    </div>
                    <div>
                        <input className="overlap-2" placeholder="Email" />
                    </div>
                    <div>
                        <input  id="fileInput" className="overlap-4" placeholder="Télécharger votre fichier"/>
                            <img className="upload" src={upload} alt="up" />
                    </div>
                    <div>
                        <input className="overlap-3" placeholder="Type" />
                    </div>
                    <div>
                        <button className="overlap-5">Inscription</button>
                    </div>
                </div>
                <div className="capture1">
                <Lottie
                    options={{
                        animationData: animationData, // Utilisez le fichier JSON de votre animation
                    }}
                    height={600} // Définissez la hauteur de votre animation
                    width={600} // Définissez la largeur de votre animation
                />
</div>
            </div>
        </div>
    );
};
