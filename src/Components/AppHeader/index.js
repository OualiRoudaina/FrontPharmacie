import { BellFilled, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { getComments, getOrders } from "../../API";
import logo from "../Assets/logo.png";
import './header.css'
import DropDownProfile from "./DropDownProfile";

function AppHeader() {
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  useEffect(() => {
    getComments().then((res) => {
      setComments(res.comments);
    });
    getOrders().then((res) => {
      setOrders(res.products);
    });
  }, []);

  return (
    <div className="AppHeader">
      <Image
        width={100}
        src={logo}
      ></Image>
      <Typography.Title>Tableau de bord</Typography.Title>
      <Space>
       
       
        {/* Ajout de l'icône de profil */}
        <UserOutlined
          style={{ fontSize: 24 }}
          onClick={() => {
            setOpenProfile(!openProfile);
          }}
        />
      </Space>
      <Drawer
        title="Comments"
        open={commentsOpen}
        onClose={() => {
          setCommentsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={comments}
          renderItem={(item) => {
            return <List.Item>{item.body}</List.Item>;
          }}
        ></List>
      </Drawer>
      <Drawer
        title="Notifications"
        open={notificationsOpen}
        onClose={() => {
          setNotificationsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={orders}
          renderItem={(item) => {
            return (
              <List.Item>
                <Typography.Text strong>{item.title}</Typography.Text> has been
                ordered!
              </List.Item>
            );
          }}
        ></List>
      </Drawer>
      <Drawer
        title="User Profile"
        open={openProfile}
        onClose={() => {
          setOpenProfile(false);
        }}
        maskClosable
      >
        {openProfile && <DropDownProfile />}
      </Drawer>
    </div>
  );
}

export default AppHeader;
