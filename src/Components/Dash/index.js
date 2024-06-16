import React, { useState, useEffect, useRef } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import axios from "axios";
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import AppHeader from '../AppHeader';
import SideMenu from '../SideMenu';
import medicamentImage from '../Assets/email.png';
import pharmacieImage from '../Assets/conversation.png';
import magazine from '../Assets/online-pharmacy.png';
import './Dashboard.css'
function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [pharmacies, setPharmacies] = useState([]);
  const [pharmaciesCount, setPharmaciesCount] = useState(0);
  const [validationRate, setValidationRate] = useState(0);
  const [popularProducts, setPopularProducts] = useState([]);
  const [ordersByPrescription, setOrdersByPrescription] = useState(0);
  const [ordersByName, setOrdersByName] = useState(0);
  const chartRefMedicine = useRef(null);
  const chartRefPrescription = useRef(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const userId = userData._id;

    setLoading(true);
    axios.get(`http://localhost:3007/api/v1/ordre/pharmacie/${userId}`)
      .then(response => {
        const ordersData = response.data.data;
        setPharmacies(ordersData);

        const validatedOrders = ordersData.filter(order => order.validated).length;
        const totalOrders = ordersData.length;
        const validationRate = totalOrders > 0 ? (validatedOrders / totalOrders) * 100 : 0;
        setValidationRate(validationRate.toFixed(2));
        
        const allMedicines = ordersData.map(order => order.medicamentName);
  
        const medicineCounts = {};
        allMedicines.forEach(medicine => {
          if (medicineCounts[medicine]) {
            medicineCounts[medicine]++;
          } else {
            medicineCounts[medicine] = 1;
          }
        });
  
        const sortedMedicines = Object.entries(medicineCounts).sort((a, b) => b[1] - a[1]);
  
        const popularProducts = sortedMedicines.slice(0, 5).map(([name, count]) => ({ name, count }));
  
        setPopularProducts(popularProducts);

        const ordersByPrescription = ordersData.filter(order => order.image && order.image.length > 0).length;
        const ordersByName = ordersData.length - ordersByPrescription;
        setOrdersByPrescription(ordersByPrescription);
        setOrdersByName(ordersByName);
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
      })
      .finally(() => {
        setLoading(false);
      });

    axios.get(`http://localhost:3007/api/v1/ordre/total-by-pharmacie/${userId}`)
      .then(response => {
        setPharmaciesCount(response.data.total);
      })
      .catch(error => {
        console.error("Error fetching Pharmacies Count:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (chartRefMedicine.current) {
      const data = {
        labels: ['Par Ordonnance', 'Par Nom'],
        datasets: [
          {
            data: [ordersByPrescription, ordersByName],
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(209,255,44,0.76)',
            ],
            hoverBackgroundColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(209,255,44,1)',
            ],
          },
        ],
      };

      const newChart = new Chart(chartRefMedicine.current, {
        type: 'doughnut',
        data: data,
        options: {
          aspectRatio: 1, // Ajustez cette valeur selon vos besoins pour changer la forme du cercle
          responsive: true,
          maintainAspectRatio: false,
        }
      });

      return () => {
        newChart.destroy();
      };
    }
  }, [ordersByPrescription, ordersByName]);

  useEffect(() => {
    if (chartRefPrescription.current) {
      const data = {
        labels: ['Ordres Validés', 'Ordres Non Validés'],
        datasets: [
          {
            data: [validationRate, 100 - validationRate],
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(255,24,3,0.7)',
            ],
            hoverBackgroundColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 24, 3, 1)',
            ],
          },
        ],
      };

      const newChart = new Chart(chartRefPrescription.current, {
        type: 'doughnut',
        data: data,
        options: {
          aspectRatio: 1, // Ajustez cette valeur selon vos besoins pour changer la forme du cercle
          responsive: true,
          maintainAspectRatio: false,
        }
      });

      return () => {
        newChart.destroy();
      };
    }
  }, [validationRate]);

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
                  alt="Pharmacie"
                  title={"Messages"}
                  value={pharmacies.length}
                  customClass="custom-right"
                  color="warning"
                />
                <DashboardCard
                  image={magazine}
                  alt="Magazine"
                  title={"Ordres"}
                  value={pharmaciesCount}
                  customClass="custom-right"
                  color="danger"
                />
              </Row>
              <Row className="mt-5 justify-content-center">
  <div className="chart-container mx-auto" style={{ width: '300px', height: '300px', marginRight: '20px' }}>
    <h4>Etat des ordres</h4>
    <canvas ref={chartRefMedicine} />
  </div>
  <div className="chart-container mx-auto" style={{ width: '400px', height: '300px' }}>
    <h4>Type d'ordre</h4>
    <canvas ref={chartRefPrescription} />
  </div>
</Row>

            </Col>
          </Row>
        </Container>
      </div>
    </div>
  </div>
  
  );
}

function DashboardCard({ title, value, image, alt, customClass, color }) {
  return (
    <Col md={3}>
      <Card className={`DashboardCard bg-${color} text-white`}>
        <Card.Body className={customClass}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <img src={image} alt={alt} style={{ width: '30px', height: '30px' }} />
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

export default Dashboard;

