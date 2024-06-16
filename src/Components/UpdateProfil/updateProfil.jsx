import React, { useState, useEffect } from 'react';
import './updateProfil.css';
import pharmacist from '../Assets/pharmacist.png';
import axios from 'axios';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import Navigate
import fleche from '../Assets/fleche.png';

function ProfileSettings() {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [adresse, setAddress] = useState('');
  const [type, setType] = useState('');
  const [telephone, setTelephone] = useState('');
  const [stockFile, setStockFile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleNavigate = () => {
    navigate("/dash");
  };
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      console.log("User data from local storage:", userData);
      const { _id, name, email, adresse, type, telephone } = userData;
      setUserId(_id);
      setName(name);
      setEmail(email);
      setAddress(adresse);
      setType(type);
      setTelephone(telephone);
    } else {
      console.log("No user data found in local storage");
    }
  }, []);

  const onFinish = (e) => {
    e.preventDefault(); // Prevent form submission default behavior
  
    const data = { name, email, adresse, type, telephone, stockFile };
    axios.put(`http://localhost:3007/api/v1/pharmacies/${userId}`, data)
      .then((response) => {
        console.log("Update pharmacy response:", response.data);
        message.success("Pharmacy updated successfully");
        // Update local storage with new data
        const updatedUserData = {
          ...response.data.data, // Utilisez response.data.data pour accéder aux nouvelles données
          _id: userId // Keep the same ID
        };
        localStorage.setItem('user', JSON.stringify(updatedUserData));
        console.log("Updated user data in local storage:", updatedUserData);
        // Update state with new data
        setName(updatedUserData.name);
        setEmail(updatedUserData.email);
        setAddress(updatedUserData.adresse);
        setType(updatedUserData.type);
        setTelephone(updatedUserData.telephone);
      })
      .catch(error => {
        console.error("Error updating Pharmacy:", error);
        message.error("Failed to update Pharmacy");
        setError(error.message || 'An error occurred while updating Pharmacy');
      });
  };
  
  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="mt-5 text-left d-flex align-items-center">
      <img
          src={fleche} // Source de l'image
          alt="Go to Dashboard" // Texte alternatif pour l'image
          className="btn" // Classe pour le style du bouton. 
          style={{ width: '70px', marginRight: '10px',cursor: 'pointer'  }}
          onClick={handleNavigate} // Attachez l'événement de clic pour la navigation
        />
      </div>
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img className="rounded-circle mt-5" width="150px" src={pharmacist} alt="Profile" />
            <span className="font-weight-bold">{name}</span>
            <span className="text-black-50">{email}</span>
          </div>
        </div>
        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Paramètres de profil</h4>
            </div>
            <form onSubmit={onFinish}>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Nom</label>
                  <input type="text" className="form-control" placeholder="name" value={name ? name : ''} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label className="labels">Email</label>
                  <input type="email" className="form-control" placeholder="email" value={email ? email : ''} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Adresse</label>
                  <input type="text" className="form-control" value={adresse ? adresse : ''} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
                </div>
                <div className="col-md-6">
                  <label className="labels">Type</label>
                  <select className="form-control" value={type ? type : ''} onChange={(e) => setType(e.target.value)}>
                  <option value="pharmacie de nuit">Pharmacie de nuit</option>
                <option value="pharmacie de jour">Pharmacie de jour</option>
                <option value="pharmacie de garde">Pharmacie de garde</option>
                  </select>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Telephone</label>
                  <input type="text" className="form-control" value={telephone ? telephone : ''} onChange={(e) => setTelephone(e.target.value)} placeholder="telephone" />
                </div>

              </div>
              <div className="mt-5 text-center">
                <button className="btn btn-primary profile-button" type="submit">Enregistrer le Profil</button>
              </div>
              {error && <div className="text-danger mt-2">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
