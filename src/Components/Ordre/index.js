import {  Space, Spin, Table, Typography,Input,Button } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ordre.css"
import SideMenu from "../SideMenu";
function Ordre() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [searchText, setSearchText] = useState('');


  useEffect(() => {
   // Récupérer les données utilisateur depuis le localStorage
const userDataString = localStorage.getItem('user');

// Convertir les données utilisateur en objet JavaScript
const userData = JSON.parse(userDataString);

// Récupérer l'ID de l'utilisateur à partir des données utilisateur
const userId = userData._id;

// Afficher l'ID de l'utilisateur dans la console
console.log(`userID: ${userId}`);

    setLoading(true);
    axios.get(`http://localhost:3007/api/v1/ordre/pharmacie/${userId}`)
      .then(response => {
        console.log("users response:", response.data);
        setUser(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);
  
const columns=[
  {
    title: "medicamentName",
    dataIndex: "medicamentName",
    key:"medicamentName"
  },
  {
    title: "medicamentPrice",
    dataIndex: "medicamentPrice",
    key:"medicamentPrice"
  },
  {
    title: "quantity",
    dataIndex: "quantity",
    key:"quantity"
  },
  {
    title: "userId",
    dataIndex: "userId",
    key:"userId"
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <Button type="primary">Edit</Button>
        <Button type="danger">Delete</Button>
      </Space>
    )
  }
]
  return (
    
    <div className="containerU">
      <Typography.Title level={4}>
        <Space>
          <span>User</span>
        </Space>
      </Typography.Title>
      <Space style={{ marginBottom: 16 }}>

      </Space>
      <Spin spinning={loading}>
      <Table columns={columns} dataSource={user} />
      </Spin>
      
</div>    
  );
}
export default Ordre;