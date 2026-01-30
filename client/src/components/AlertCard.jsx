
import { Card, Button, Tag, Space } from "antd";
import '../styles/AlertCard.css'; 

const AlertCard = ({ alert, onUpdate, onDelete, onEdit }) => {
  const statusColor = {
    Active: "green",
    Booked: "blue",
    Expired: "red"
  };

  return (
    <Card
      title={`${alert.country} - ${alert.city}`}
      className="alert-card"
    >
      <p><b>Visa Type:</b> {alert.visaType}</p>

      <Tag color={statusColor[alert.status]}>
        {alert.status}
      </Tag>

      <Space className="alert-card-buttons">
        <Button size="small" onClick={() => onUpdate(alert._id)}>
          Mark Booked
        </Button>

        <Button type="default" size="small" onClick={() => onEdit(alert)}>
          Edit
        </Button>

        <Button danger size="small" onClick={() => onDelete(alert._id)}>
          Delete
        </Button>
      </Space>
    </Card>
  );
};

export default AlertCard;
