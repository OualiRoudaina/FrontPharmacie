import React, { useState, useEffect } from 'react';
import './updateProfil.css';
import pharmacist from '../Assets/pharmacist.png';
import axios from 'axios';

function ProfileSettings() {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState('');
  const [telephone, setTelephone] = useState('');
  const [stockFile, setStockFile] = useState(null);

  useEffect(() => {
    // Récupérer les données de l'utilisateur depuis le stockage local lors du chargement du composant
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUserId(userData.id);
      setName(userData.name);
      setEmail(userData.email);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('type', type);
    formData.append('telephone', telephone);
    formData.append('files', stockFile);

    try {
      const response = await axios.put(`http://localhost:3007/api/v1/pharmacies/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="container rounded bg-white mt-5 mb-5">
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
              <h4 className="text-right">Profile Settings</h4>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Name</label>
                  <input type="text" className="form-control" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label className="labels">Email</label>
                  <input type="email" className="form-control" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Address</label>
                  <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
                </div>
                <div className="col-md-6">
                  <label className="labels">Type</label>
                  <select className="form-control" value={type} onChange={(e) => setType(e.target.value)}>
                    <option>Pharmacie de nuit</option>
                    <option>Pharmacie de garde</option>
                    <option>Pharmacie de jour</option>
                  </select>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Telephone</label>
                  <input type="text" className="form-control" value={telephone} onChange={(e) => setTelephone(e.target.value)} placeholder="telephone" />
                </div>
                <div className="col-md-6">
                  <label className="labels">Stock</label>
                  <div className="custom-file">
                    <input type="file" className="custom-file-input" id="customFile" onChange={(e) => setStockFile(e.target.files[0])} />
                    <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                  </div>
                </div>
              </div>
              <div className="mt-5 text-center">
                <button className="btn btn-primary profile-button" type="submit">Save Profile</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
