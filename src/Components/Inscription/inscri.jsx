import React, { useRef, useState } from "react";
import "./inscri.css";
import upload from "../Assets/upload.png";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../Assets/Animation - 1713053494210.json";

export const Signup = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    type: "",
    adresse: "",
    telephone: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password, name, type, adresse, telephone } = formData;
      if (!email || !password || !name || !type || !adresse || !telephone) {
        setError("Veuillez remplir tous les champs.");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("email", email);
      formDataToSend.append("password", password);
      formDataToSend.append("name", name);
      formDataToSend.append("type", type);
      formDataToSend.append("adresse", adresse);
      formDataToSend.append("files", fileInputRef.current.files[0]);
      formDataToSend.append("telephone", telephone);

      const response = await fetch("http://localhost:3007/api/v1/pharmacies", {
        method: "POST",
        body: formDataToSend,
      });

      console.log("Response:", response);
      const data = await response.json();
      console.log("Data:", data);
      if (response.ok) {
        localStorage.setItem("accessToken", data.tokens.accessToken);
        console.log("Access token stored in localStorage:", data.tokens.accessToken);

        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        console.error("SignUp failed:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSignUpClick = () => {
    navigate("/");
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="inscription">
      <div className="div">
        <div className="overlap-group">
          <div className="overlap1">
            <div className="text-wrapper5">Inscription</div>
            <div className="text-wrapper5" onClick={handleSignUpClick}>
              Connexion
            </div>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p className="nouveau-sur">
            <span className="text-wrapper">
              Nouveau sur 3P
              <br />
              <br />
            </span>
            <span className="span">
              Inscrivez-vous en un seul clic
              <br />
              avec votre plateforme médicale
            </span>
          </p>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
              <input
                className="overlap"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nom de pharmacie"
                required
              />
            </div>
            <div>
              <input
                className="overlap-2"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div>
              <input
                className="overlap-4"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                placeholder="Adresse"
                required
              />
            </div>
            <div>
              <select
                className="overlap-3"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="">Type</option>
                <option value="pharmacie de nuit">Pharmacie de nuit</option>
                <option value="pharmacie de jour">Pharmacie de jour</option>
                <option value="pharmacie de garde">Pharmacie de garde</option>
              </select>
            </div>
            <div>
              <input
                className="overlap-8"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                placeholder="Telephone"
                required
              />
            </div>
            <div>
              <input
                className="overlap-7"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mot de passe"
                required
              />
            </div>
            <div>
              <button type="submit" className="overlap-5">
                Inscription
              </button>
            </div>
          </form>
        </div>
        <div className="capture1">
          <Lottie
            options={{
              animationData: animationData,
            }}
            height={600}
            width={600}
          />
        </div>
      </div>
    </div>
  );
};
