import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './connecter.css';
import Lottie from 'react-lottie';
import animationData from '../Assets/Animation - 1713051281106.json'; // Remplacez 'your-animation.json' par le chemin de votre fichier JSON

export const Connecter = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Form data:', formData);
    
            const response = await fetch('http://localhost:3007/api/v1/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            console.log('Response:', response);
            const data = await response.json();
            console.log('Data:', data);
            if (response.ok) {
                localStorage.setItem('accessToken', data.tokens.accessToken);
                console.log('Access token stored in localStorage:', data.tokens.accessToken);
    
                localStorage.setItem('user', JSON.stringify(data.user)); // Modification ici
    
                navigate("/dash");
            } else {
                console.error('Login failed:', data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSignUpClick = () => {
        navigate("/Signup");
    };

    const handleForgotPasswordClick = () => {
        navigate("/reset-password");
    };

    const defaultOptions = {
       loop: true,
       autoplay: true,
       animationData: animationData,
       rendererSettings: {
         preserveAspectRatio: 'xMidYMid slice'
       }
     };

    return (
        <div className="inscription">
            <div className="div">
                <div className="overlap-group">
                    <div className="overlap1">
                        <div className="text-wrapper5" onClick={handleSignUpClick}>Inscription</div>
                        <div className="text-wrapper5">Connexion</div>
                    </div>
                    <p className="nouveau-sur">
                        <span className="text-wrapper">
                            Nouveau sur 3P
                            <br />
                            <br />
                        </span>
                        <span className="span">
                            Login your account
                            <br />
                        </span>
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input className="overlap" name="email" placeholder="Adresse email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div>
                            <input className="overlap-2" name="password" type="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} />
                        </div>
                        <div>
                            <button type="submit" className="overlap-5">Connecter</button>
                        </div>
                        <p className="forgot-password-link" onClick={handleForgotPasswordClick}>Mot de passe oublié ?</p>
                    </form>
                </div>
                <div className="capture">
                    <Lottie
                        options={defaultOptions}
                        height={600}
                        width={600}
                    />
                </div>
            </div>
        </div>
    );
};
