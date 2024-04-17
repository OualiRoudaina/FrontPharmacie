import React, { useState } from 'react';
import user from '../Assets/person.png';
import password from '../Assets/password.png';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: ''
    });
    const [signupSuccess, setSignupSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3007/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log(data); 
            if (response.ok) {
                setSignupSuccess(true);
              
                navigate("/");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleOnClick = () => {
        navigate("/"); 
    };

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>Sign Up</div>
                <div className='underline'></div>
            </div>
            {signupSuccess && <div className="notification">Signup successful!</div>}
            <form onSubmit={handleSubmit}>
                <div className='inputs'>
                    <div className='input'>
                        <img src={user} alt=''/>
                        <input type='text' name='name' placeholder='Name' value={formData.name} onChange={handleChange} />
                    </div>
                    <div className='input'>
                        <img src={user} alt=''/>
                        <input type='text' name='username' placeholder='Username' value={formData.username} onChange={handleChange} />
                    </div>
                    <div className='input'>
                        <img src={password} alt=''/>
                        <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} />
                    </div>
                </div>
                <button type="submit" className="submit">Sign Up</button>
            </form>
            <div className="submit" onClick={handleOnClick}>Login</div>
        </div>
    )
}

export default Signup;
