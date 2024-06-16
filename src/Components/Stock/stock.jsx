import React, { useState, useEffect } from 'react';
import './Stock.css';
import verification from '../Assets/verification.png';
import verification1 from '../Assets/verification2.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import pharmacist from '../Assets/Animation - 1713051445694.json';
import fleche from '../Assets/fleche.png';
import Papa from 'papaparse';
import { Table, message } from 'antd';

function Stock() {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState(''); 
  const [type, setType] = useState('');
  const [telephone, setTelephone] = useState('');
  const [stockFile, setStockFile] = useState(null);
  const [stockData, setStockData] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleNavigate = () => {
    navigate("/dash");
  };

  const handleFileUpload = (e) => {
    const files = e.target.files[0];
    setStockFile(files); 

    Papa.parse(files, {
      delimiter: ",", 
      complete: (result) => {
        const parsedData = result.data.map((item, index) => {
          const nomMedicament = item['Nommedicament'];
          const quantite = item[' Quantite'];
          const prix = item[' Prix'];
          return {
            key: index,
            'Nom medicament': nomMedicament,
            Quantite: quantite,
            Prix: prix
          };
        });
        setStockData(parsedData); 
      },
      header: true
    });
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const userId = userData._id;

    if (userData) {
      console.log("User data from local storage:", userId);
     
    } else {
      console.log("No user data found in local storage");
    }
  }, []);

  const onFinish = (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem('user'));
    const userId = userData._id;
    
    const formData = new FormData();
    formData.append('files', stockFile);
    
    axios.put(`http://localhost:3007/api/v1/pharmacies/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        message.success("Pharmacy updated successfully");
        
        const updatedUserData = {
          ...response.data.data,
          _id: userId
        };
        localStorage.setItem('user', JSON.stringify(updatedUserData));
    
        setStockFile(updatedUserData.stockFile);
      })
      .catch(error => {
        console.error("Error updating Pharmacy:", error);
        message.error("Failed to update Pharmacy");
        setError(error.message || 'An error occurred while updating Pharmacy');
      });
  };

  const columns = [
    {
      title: "Nom médicament",
      dataIndex: "Nom medicament",
      key: "Nom medicament"
    },
    {
      title: "Quantité",
      dataIndex: "Quantite",
      key: "Quantite"
    },
    {
      title: "Prix",
      dataIndex: "Prix",
      key: "Prix"
    }
  ];

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
        <div className="col-md-6">
          <div className="text-left">
            <h4>Paramètres de profil</h4>
            <form onSubmit={onFinish}>
              <div className="row mt-2">
                <div className="col-md-12">
                  <div className="mt-5 text-center">
                    <input type="file" className="custom-file-input" id="customFile" onChange={handleFileUpload} />
                    <label className="custom-file-label custom-file-button" htmlFor="customFile">Choisir le fichier</label>
                  </div>
                </div>
              </div>
              <div className="mt-5 text-center">
              <button className="btn btn-danger profile-button" type="submit">Enregistrer</button>
              </div>
              {error && <div className="text-danger mt-2">{error}</div>}
            </form>
          </div>
        </div>
        <div className="col-md-6 text-right">
          <div className="mt-5">
            <Lottie
              options={{
                animationData: pharmacist,
              }}
              height={200}
              width={200}
            />
          </div>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <h4 className="text-center">Données de Stock</h4>
          <Table dataSource={stockData} columns={columns} pagination={{ pageSize: 10 }} />
        </div>
      </div>
    </div>
  );
}

export default Stock;
