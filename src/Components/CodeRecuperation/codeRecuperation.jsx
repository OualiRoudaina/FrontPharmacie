import React, { useState, useEffect } from 'react';
import './codeRecuperation.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from "../Assets/Animation - 1713053086377.json"; // Remplacez "yourAnimation.json" par le nom de votre fichier JSON d'animation Lottie

function SendEmail() {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState(['', '', '', '']);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setEmail(userData.email);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const codeValue = code.join('');

        try {
            // Vérifier si le code existe dans la base de données
            const response = await axios.get(`http://localhost:3007/api/v1/users/code/${codeValue}`);
            console.log(response.data);

            // Si le code correspond, rediriger vers la page de réinitialisation du mot de passe
            if (response.data.status === 200) {
                navigate('/resetPassword');
            } else {
                setErrorMessage('Code incorrect. Veuillez réessayer.');
            }
        } catch (error) {
            console.error('Error checking code:', error);
            setErrorMessage('Erreur lors de la vérification du code. Veuillez réessayer.');
        }
    };

    return (
        <div className="reset-password">
            <form onSubmit={handleSubmit} className="login-form">
                <h1 className="login-title">Récupération du code</h1>
                <div className="input-box">
                    {code.map((value, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={value}
                            onChange={(e) => setCode([...code.slice(0, index), e.target.value, ...code.slice(index + 1)])}
                        />
                    ))}
                </div>
                <button className="login-btn" type="submit">Confirmer</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
            <div className='img1'>
      <Lottie
          options={{
            animationData: animationData, // Utilisez le fichier JSON de votre animation
          }}
          height={200} // Définissez la hauteur de votre animation
          width={400} // Définissez la largeur de votre animation
        />
        </div>
        </div>
    );
}

export default SendEmail;
