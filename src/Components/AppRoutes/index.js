import { Connecter } from "../Connecter/connecter";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
//import Login from './Components/Login/Login';
import { Signup } from '../Inscription/inscri';
import ChatApp from '../Chat/chat';
import Profil from '../Profil/profil';
import Dashboard from "../Dash";
import Messenger from "../messenger/messenger";
import ProfileSettings from "../UpdateProfil/updateProfil";
import ResetPassword from "../ResetPassword/resetPassword";
import CodeRecap from "../CodeRecuperation/codeRecuperation";
import SendEmail from "../SendEmail/sendEmail";
import Ordre from "../Ordre";

function AppRoutes(){
return (
    
        <Routes>
          <Route path='/' element={<Connecter />} />
          <Route path="/Signup" element={<Signup />} /> 
          <Route path='/msg' element={<ChatApp />} />
          <Route path='/dash' element={<Dashboard />} />
          <Route path='/profil' element={<Profil />} />
          <Route path='/messenger' element={<Messenger />} />
          <Route path='/updateProfil' element={<ProfileSettings />} />
          <Route path='/resetPassword' element={<ResetPassword />} />
          <Route path='/sendEmail' element={<SendEmail />} />
          <Route path='/codeRecap' element={<CodeRecap />} />
          <Route path='/ordre' element={<Ordre />} />

        </Routes>
      
)
}
export default AppRoutes;