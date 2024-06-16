import React from 'react';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Importez le hook useNavigate

const DropDownProfile = () => {
  const navigate = useNavigate(); 
  
  const goToUpdateProfile = () => {
    navigate('/updateProfil'); // Utilisez la fonction navigate pour rediriger vers '/updateProfil'
  };
  const goToResetPassword = () => {
    navigate('/resetPassword'); // Utilisez la fonction navigate pour rediriger vers '/updateProfil'
  };

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    // Récupérez le token stocké localement
    const accessToken = localStorage.getItem('accessToken');
    
    // Envoyez une demande de déconnexion au serveur
    fetch('http://localhost:3007/api/v1/auth/logout', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => {
      // Vérifiez si la demande de déconnexion a réussi
      if (response.ok) {
        // Supprimez le token stocké localement
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        localStorage.removeItem('userName');


        // Redirigez l'utilisateur vers la page de connexion
        navigate('/');
      } else {
        // Gérez les erreurs ici, si nécessaire
        console.error('Failed to logout');
      }
    })
    .catch(error => {
      console.error('Error during logout:', error);
    });
  };

  return (
    <div className='dropDownProfile'>
      <ul className='profileMenu'>
        {/* Lorsque le lien Profile est cliqué, appelez la fonction goToUpdateProfile */}
        <li className='menuItem' onClick={goToUpdateProfile}>
          <FontAwesomeIcon icon={faUser} className='icon' /> Profil
        </li>
        <li className='menuItem' onClick={goToResetPassword}>
          <FontAwesomeIcon icon={faCog} className='icon' /> Paramètre
        </li>
        {/* Lorsque le lien Logout est cliqué, appelez la fonction handleLogout */}
        <li className='menuItem' onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} className='icon' /> Se déconnecter
        </li>
      </ul>
    </div>
  );
}

export default DropDownProfile;
