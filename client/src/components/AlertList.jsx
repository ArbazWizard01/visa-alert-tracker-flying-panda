import { useEffect, useState, useCallback } from "react";
import { Row, Col, message, Skeleton, Pagination, Input, Space } from "antd";

import AlertCard from "./AlertCard";
import AlertModal from "./AlertModal";
import { getAlerts, updateAlert, deleteAlert } from "../api/alertApi";

import "../styles/AlertList.css";

const { Search } = Input;

const PAGE_SIZE = 8;

const AlertList = ({ refresh }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState(null);

  const [editingAlert, setEditingAlert] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchCountry, setSearchCountry] = useState("");

  const fetchAlerts = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};

      if (searchCountry.trim()) {
        params.country = searchCountry.trim();
      }

      const res = await getAlerts(params);
      setAlerts(res.data.data);
      setCurrentPage(1);
    } catch {
      message.error("Failed to load alerts");
    } finally {
      setLoading(false);
    }
  }, [searchCountry]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAlerts(searchCountry);
    }, 400);
    return () => clearTimeout(timer);
  }, [fetchAlerts, searchCountry]);

  useEffect(() => {
    fetchAlerts(searchCountry);
  }, [refresh, fetchAlerts, searchCountry]);

  const handleUpdate = async (id) => {
    setLoadingId(id);
    setAlerts((prev) =>
      prev.map((a) => (a._id === id ? { ...a, status: "Booked" } : a)),
    );

    try {
      await updateAlert(id, { status: "Booked" });
      message.success("Status updated");
    } catch {
      message.error("Update failed");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id) => {
    setLoadingId(id);
    const backup = alerts;

    setAlerts((prev) => prev.filter((a) => a._id !== id));

    try {
      await deleteAlert(id);
      message.success("Alert deleted");
    } catch {
      message.error("Delete failed");
      setAlerts(backup);
    } finally {
      setLoadingId(null);
    }
  };

  const handleEdit = (alert) => {
    setEditingAlert(alert);
    setModalOpen(true);
  };

  const handleModalCreate = async (data) => {
    try {
      await updateAlert(editingAlert._id, data);
      setAlerts((prev) =>
        prev.map((a) => (a._id === editingAlert._id ? { ...a, ...data } : a)),
      );
      message.success("Alert updated");
    } catch {
      message.error("Update failed");
    } finally {
      setModalOpen(false);
      setEditingAlert(null);
    }
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedAlerts = alerts.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <>
      <Space className="alert-filters" wrap>
        <Search
          placeholder="Search by country"
          allowClear
          value={searchCountry}
          onChange={(e) => setSearchCountry(e.target.value)}
        />
      </Space>

      <Row gutter={[16, 16]}>
        {loading
          ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <Col key={i} xs={24} sm={12} md={8} lg={6}>
                <Skeleton active />
              </Col>
            ))
          : paginatedAlerts.map((alert) => (
              <Col key={alert._id} xs={24} sm={12} md={8} lg={6}>
                <AlertCard
                  alert={alert}
                  loading={loadingId === alert._id}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              </Col>
            ))}
      </Row>

      {!loading && alerts.length > PAGE_SIZE && (
        <div className="pagination-wrapper">
          <Pagination
            current={currentPage}
            pageSize={PAGE_SIZE}
            total={alerts.length}
            onChange={setCurrentPage}
            showSizeChanger={false}
          />
        </div>
      )}

      <AlertModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onCreate={handleModalCreate}
        initialValues={editingAlert}
      />
    </>
  );
};

export default AlertList;
