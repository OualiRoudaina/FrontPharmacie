import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './side.css'
function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();

  return (
    <div className="SideMenuContainer">
    <div className="bg-light">
      <ul className="list-group SideMenuVertical">
          <MenuItem
            label="Dashboard"
            icon="bi bi-grid-fill"
            key="/"
            onClick={() => navigate("/")}
            isSelected={selectedKeys === "/"}
          />
          <MenuItem
            label="Messages"
            icon="bi bi-cart-fill"
            key="/Medicament"
            onClick={() => navigate("/messenger")}
            isSelected={selectedKeys === "/messenger"}
          />
          <MenuItem
            label="Ordres"
            icon="bi bi-person-fill"
            key="/ordre"
            onClick={() => navigate("/ordre")}
            isSelected={selectedKeys === "/ordre"}
          />
        </ul>
      </div>
    </div>
  );
}

function MenuItem({ label, icon, key, onClick, isSelected }) {
  return (
    <li
      className={`list-group-item d-flex align-items-center ${
        isSelected ? "active" : ""
      }`}
      onClick={onClick}
    >
      <i className={icon}></i>
      <span className="ms-2">{label}</span>
    </li>
  );
}

export default SideMenu;
