import React, { useState } from 'react';
import './Login.css';
import user from '../Assets/person.png';
import password from '../Assets/password.png';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Form data:', formData); 
    
            // Assurez-vous que formData contient toutes les données nécessaires, y compris l'ID de l'utilisateur
    
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
                localStorage.setItem('accessToken', data.tokens.accessToken); // Stocker le token d'accès dans le localStorage
                console.log('Access token stored in localStorage:', data.tokens.accessToken); // Ajouter cette ligne pour vérifier si le token est correctement stocké
    
                // Stocker également l'ID de l'utilisateur dans le localStorage
                localStorage.setItem('userId', data.user.id);
    
                navigate("/msg");
            } else {
                // Handle login error, such as displaying an error message to the user
                console.error('Login failed:', data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    const handleSignUpClick = () => {
        navigate("/SignUp");
    };

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>Login</div>
                <div className='underline'></div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='inputs'>
                    <div className='input'>
                        <img src={user} alt=''/>
                        <input type='text' name='username' placeholder='Username' value={formData.username} onChange={handleChange} />
                    </div>
                    <div className='input'>
                        <img src={password} alt=''/>
                        <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} />
                    </div>
                </div>
                <button type="submit" className="submit">Login</button>
            </form>
            <div className="forgot-password">Lost Your password</div>
            <div className="submit-container">
                <div className="submit" onClick={handleSignUpClick}>Sign Up</div>
            </div>
        </div>
    )
}

export default Login;
