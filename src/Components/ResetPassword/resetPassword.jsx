import React, { useState, useEffect } from 'react';
import './ResetPassword.css';
import verification from '../Assets/verification.png';
import verification1 from '../Assets/verification2.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from "../Assets/Animation - 1713053106244.json"; // Remplacez "yourAnimation.json" par le nom de votre fichier JSON d'animation Lottie

function ResetPassword() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUserId(userData.id);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('password', password);

    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);

    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3007/api/v1/users/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      navigate('/'); // Redirige vers la page d'accueil après la réinitialisation du mot de passe
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="reset-password">
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className="login-title">Reset Password</h1>
        
        <div className="input-box">
          <img src={verification} alt="verification" className="input-icon1" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-box">
          <img src={verification1} alt="verification1" className="input-icon2" />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="login-btn" type="submit">Confirm</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      <div className='img'>
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

export default ResetPassword;
