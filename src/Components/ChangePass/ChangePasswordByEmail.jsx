import React, { useState, useEffect } from 'react';
import './ChangePasswordByEmail.css';
import verification from '../Assets/verification.png';
import verification1 from '../Assets/verification2.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from "../Assets/Animation - 1713053106244.json";
import fleche from '../Assets/fleche.png';

function Password() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    
    if (!password || !confirmPassword) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3007/api/v1/users/change/${email}`, { password });
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleNavigate = () => {
    navigate("/dash");
  };

  return (
    <div className="reset-password">
      
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className="login-title">Réinitialiser le mot de passe</h1>
        
        <div className="input-box">
          <img src={verification} alt="verification" className="input-icon1" />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-box">
          <img src={verification1} alt="verification1" className="input-icon2" />
          <input
            type="password"
            placeholder="Confirmez le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="login-btn" type="submit">Confirmer</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      <div className='img'>
        <Lottie
          options={{
            animationData: animationData,
          }}
          height={200}
          width={400}
        />
      </div>
    </div>
  );
}

export default Password;
