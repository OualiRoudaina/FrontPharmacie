import { Space, Spin, Table, Typography, Button, message, Modal } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import "./ordre.css";
import { useNavigate } from "react-router-dom";
import fleche from "../Assets/fleche.png";

function Ordre() {
  const [loading, setLoading] = useState(false);
  const [ordersWithImage, setOrdersWithImage] = useState([]);
  const [ordersWithoutImage, setOrdersWithoutImage] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/dash");
  };

  // Dans la fonction setOrderValidated
const setOrderValidated = (orderId, validated) => {
  const updateOrders = (orders) =>
    orders.map((order) => {
      if (order.orderId === orderId) {
        return { ...order, validated: validated };
      }
      return order;
    });
  setOrdersWithImage(updateOrders(ordersWithImage));
  setOrdersWithoutImage(updateOrders(ordersWithoutImage));

  if (validated) {
    // Effectuer une requête HTTP PUT pour valider la commande
    axios.put(`http://localhost:3007/api/v1/ordre/${orderId}`)
      .then((response) => {
        // Mettre à jour l'état local pour marquer la commande comme validée
        localStorage.setItem(`order_${orderId}`, "true");
        message.success("Commande validée avec succès.");
      })
      .catch((error) => {
        console.error("Erreur lors de la validation de la commande:", error);
        message.error("Échec de la validation de la commande.");
      });
  }
};

// Dans le useEffect pour charger les commandes
useEffect(() => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData._id;
  setLoading(true);
  axios
    .get(`http://localhost:3007/api/v1/ordre/pharmacie/${userId}`)
    .then((response) => {
      console.log("orders response:", response.data);
      const ordersData = response.data.data.map((item) => ({
        ...item,
        orderId: item._id, // Assurez-vous que l'ID de la commande est correctement défini
        validated: localStorage.getItem(`order_${item._id}`) === "true", // Vérifier si la commande est validée dans le localStorage
      }));

      const ordersWithImage = ordersData.filter((item) => item.image && item.image.length > 0);
      const ordersWithoutImage = ordersData.filter((item) => !item.image || item.image.length === 0);

      setOrdersWithImage(ordersWithImage);
      setOrdersWithoutImage(ordersWithoutImage);
      setLoading(false);

      // Fetch user details based on userId
      axios
        .get(`http://localhost:3007/api/v1/utilisateur/${userId}`)
        .then((userResponse) => {
          const username = userResponse.data.username;
          // Update orders with username
          const updateOrders = (orders) =>
            orders.map((item) => ({
              ...item,
              userName: username,
            }));
          setOrdersWithImage(updateOrders(ordersWithImage));
          setOrdersWithoutImage(updateOrders(ordersWithoutImage));
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    })
    .catch((error) => {
      console.error("Error fetching orders:", error);
      setLoading(false);
    });
}, []);

  
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData._id;
    setLoading(true);
    axios
      .get(`http://localhost:3007/api/v1/ordre/pharmacie/${userId}`)
      .then((response) => {
        console.log("orders response:", response.data);
        const ordersData = response.data.data.map((item) => ({
          ...item,
          orderId: item._id, // Assurez-vous que l'ID de la commande est correctement défini
          validated: localStorage.getItem(`order_${item._id}`) === "true", // Vérifier si la commande est validée dans le localStorage
        }));
  
        const ordersWithImage = ordersData.filter((item) => item.image && item.image.length > 0);
        const ordersWithoutImage = ordersData.filter((item) => !item.image || item.image.length === 0);
  
        setOrdersWithImage(ordersWithImage);
        setOrdersWithoutImage(ordersWithoutImage);
        setLoading(false);
  
        // Fetch user details based on userId
        axios
          .get(`http://localhost:3007/api/v1/utilisateur/${userId}`)
          .then((userResponse) => {
            const username = userResponse.data.username;
            // Update orders with username
            const updateOrders = (orders) =>
              orders.map((item) => ({
                ...item,
                userName: username,
              }));
            setOrdersWithImage(updateOrders(ordersWithImage));
            setOrdersWithoutImage(updateOrders(ordersWithoutImage));
          })
          .catch((error) => {
            console.error("Error fetching user details:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);
  

  const handleDeleteOrder = (orderId) => {
    if (!orderId) {
      console.error("L'ID de la commande est indéfini.");
      return;
    }

    const orderToDelete = [
      ...ordersWithImage,
      ...ordersWithoutImage,
    ].find((order) => order.orderId === orderId);

    if (!orderToDelete.validated) {
      message.info("Vous devez valider la commande avant de pouvoir la supprimer.");
      return;
    }

    console.log("ID de la commande:", orderId);
    axios
      .delete(`http://localhost:3007/api/v1/ordre/${orderId}`) // URL pour supprimer la commande
      .then((response) => {
        message.success("Commande supprimée avec succès.");
        const filterOrders = (orders) => orders.filter((item) => item.orderId !== orderId);
        setOrdersWithImage(filterOrders(ordersWithImage));
        setOrdersWithoutImage(filterOrders(ordersWithoutImage));
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de la commande:", error);
        message.error("Échec de la suppression de la commande.");
      });
  };

  const openModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const commonColumns = [
    {
      title: "ID Utilisateur",
      dataIndex: "userId",
      key: "userName",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => {
        return (
          <Space size="middle">
            {record.validated ? (
              <CheckOutlined style={{ color: 'green' }} />
            ) : (
              <Button
                type="primary"
                onClick={() => setOrderValidated(record.orderId, true)}
              >
                Valider
              </Button>
            )}
          </Space>
        );
      },
    },
  ];
  

  const columnsWithImage = [
    ...commonColumns,
    {
      title: "Image",
      key: "image",
      render: (text, record) => {
        return (
          <img
            src={`http://localhost:3007/api/v1/magazine/file/ordonnance/${record.image[0]}`}
            alt="Image de la commande"
            onClick={() =>
              openModal(
                `http://localhost:3007/api/v1/magazine/file/ordonnance/${record.image[0]}`
              )
            }
            style={{ maxWidth: "100px", maxHeight: "100px" }}
          />
        );
      },
    },
  ];

  const columnsWithoutImage = [
    {
      title: "Nom du médicament",
      dataIndex: "medicamentName",
      key: "medicamentName",
    },
    {
      title: "Prix du médicament",
      dataIndex: "medicamentPrice",
      key: "medicamentPrice",
    },
    ...commonColumns,
  ];

  return (
    <div className="container">
      <img
        src={fleche}
        alt="Aller au tableau de bord"
        className="arrow-icon"
        onClick={handleNavigate}
      />
      <Typography.Title level={4}>Commandes Utilisateurs</Typography.Title>
      <Spin spinning={loading}>
        <Typography.Title level={5}>Commandes par Ordonnance</Typography.Title>
        <Table columns={columnsWithImage} dataSource={ordersWithImage} />
        <Typography.Title level={5}>Commandes par Nom</Typography.Title>
        <Table columns={columnsWithoutImage} dataSource={ordersWithoutImage} />
      </Spin>
      <Modal
        title="Image de la Commande"
        visible={modalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <img
          src={modalImageUrl}
          alt="Image de la commande"
          style={{ width: "100%" }}
        />
      </Modal>
    </div>
  );
}

export default Ordre;
