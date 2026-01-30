import { useEffect, useState } from "react";
import { Row, Col, message } from "antd";

import AlertCard from "./AlertCard";
import AlertModal from "./AlertModal"; 
import { getAlerts, updateAlert, deleteAlert } from "../api/alertApi";

const AlertList = ({ refresh }) => {
  const [alerts, setAlerts] = useState([]);
  const [editingAlert, setEditingAlert] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchAlerts = async () => {
    const res = await getAlerts();
    setAlerts(res.data.data);
  };

  useEffect(() => {
    fetchAlerts();
  }, [refresh]);

  const handleUpdate = async (id) => {
    await updateAlert(id, { status: "Booked" });
    message.success("Status updated");
    fetchAlerts();
  };

  const handleDelete = async (id) => {
    await deleteAlert(id);
    message.success("Alert deleted");
    fetchAlerts();
  };

  const handleEdit = (alert) => {
    setEditingAlert(alert);
    setModalOpen(true);
  };

  const handleModalCreate = async (data) => {
    if (editingAlert) {
      // Update existing alert
      await updateAlert(editingAlert._id, data);
      message.success("Alert updated");
    } else {
      // You can also create new alert here if needed
    }
    setModalOpen(false);
    setEditingAlert(null);
    fetchAlerts();
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        {alerts.map(alert => (
          <Col key={alert._id} xs={24} sm={12} md={8} lg={6}>
            <AlertCard
              alert={alert}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </Col>
        ))}
      </Row>

      {modalOpen && (
        <AlertModal
          open={modalOpen}
          onCancel={() => {
            setModalOpen(false);
            setEditingAlert(null);
          }}
          onCreate={handleModalCreate}
          initialValues={editingAlert}
        />
      )}
    </>
  );
};

export default AlertList;
