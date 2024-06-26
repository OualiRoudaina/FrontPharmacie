import React, { useState, useEffect } from 'react';
import './sendEmail.css';
import verification from '../Assets/verification.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SendEmail() {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setEmail(userData.email);
        }
    }, []);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Sauvegarde l'email dans le localStorage
        const userData = { email: email };
        localStorage.setItem('user', JSON.stringify(userData));

        try {
            const response = await axios.post('http://localhost:3007/api/v1/users/sendemail', {
                To: email, // L'adresse email du destinataire
                From: 'oualiroudaina@gmail.com', // L'adresse email de l'expéditeur
                subject: 'Réinitialisation du mot de passe', // Sujet de l'email
            });
            console.log(response.data);
            navigate('/codeRecap'); // Redirige vers la page de tableau de bord après l'envoi de l'email
        } catch (error) {
            console.error('Error sending email:', error);
            setErrorMessage('Error sending email. Please try again.');
        }
    };

    return (
        <div className="reset-password">
            <form onSubmit={handleSubmit} className="login-form">
                <h1 className="login-title">Récupération du code</h1>
                <div className="input-box">
                    <img src={verification} alt="verification" className="input-icon1" />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange} // Permet à l'utilisateur de modifier l'email
                    />
                </div>
                <button className="login-btn" type="submit">Confirmer</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    );
}

export default SendEmail;
