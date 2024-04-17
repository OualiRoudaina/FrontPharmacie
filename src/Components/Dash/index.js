import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css'; 
import AppHeader from '../AppHeader'; // Assuming AppHeader is a component you want to import
import SideMenu from '../SideMenu'; // Assuming SideMenu is a component you want to import
import { getCustomers, getInventory, getOrders, getRevenue } from '../../API';
import medicamentImage from '../Assets/email.png';
import pharmacieImage from '../Assets/conversation.png';
import categories from '../Assets/email.png';
import magazine from '../Assets/online-pharmacy.png';

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [inventory, setInventory] = useState(0);
  const [pharmacies, setPharmacies] = useState([]); 
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:3007/api/v1/pharmacies")
      .then(response => {
        console.log("Pharmacies response:", response.data);
        setPharmacies(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching Pharmacies:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <AppHeader />
      <div className="sidebar-content">
        <SideMenu />
        <div className="main-content">
          <Container>
            <Row className="mt-4">
              <Col>
                <Row className="mt-4">
                  
                  <DashboardCard
                    image={pharmacieImage}
                    title={"Messages"}
                    value={pharmacies.length}
                    customClass="custom-right"
                    color="warning"
                  />
                  <DashboardCard
                    image={magazine}
                    title={"Ordres"}
                    value={revenue}
                    customClass="custom-right"
                    color="danger"
                  />
                </Row>
                <Row className="mt-4">
                  <Col>
                    <RecentOrders pharmacies={pharmacies} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, value, image, customClass, color }) {
  return (
    <Col md={3}>
      <Card className={`DashboardCard bg-${color} text-white`}>
        <Card.Body className={customClass}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <img src={image} alt="Card Image" style={{ width: '30px', height: '30px' }} />
            </div>
            <div className="text-right">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{value}</p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

function RecentOrders({ pharmacies }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Assuming you have a function getOrders() to fetch orders
    getOrders().then((res) => {
      console.log("Recent Orders:", res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="mt-4">
      <h5>Ordres</h5>
      <Table responsive className="table-custom">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Medicament</th>
          </tr>
        </thead>
        <tbody>
          {pharmacies.map((pharmacie, index) => (
            <tr key={index}>
              <td>{pharmacie.name}</td>
              <td>{pharmacie.address}</td>
              <td>{pharmacie.type}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Dashboard;
