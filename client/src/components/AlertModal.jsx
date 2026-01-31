import { Modal, Form, Input, Select, Button, message } from "antd";
import { useEffect } from "react";
import '../styles/AlertModal.css';

const { Option } = Select;

const AlertModal = ({ open, onCancel, onCreate, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
      form.setFieldsValue({ status: "Active" });
    }
  }, [initialValues, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await onCreate(values);
      message.success(initialValues ? "Alert updated" : "Alert created");
      form.resetFields();
    } catch {
      message.error("Please fill all required fields");
    }
  };

  return (
    <Modal
      title={initialValues ? "Edit Visa Alert" : "Create Visa Alert"}
      open={open}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      footer={null}
    >
      <Form layout="vertical" form={form}>
        <Form.Item label="Country" name="country" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="City" name="city" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Visa Type" name="visaType" rules={[{ required: true }]}>
          <Select>
            <Option value="Tourist">Tourist</Option>
            <Option value="Business">Business</Option>
            <Option value="Student">Student</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Status" name="status" rules={[{ required: true }]}>
          <Select>
            <Option value="Active">Active</Option>
            <Option value="Booked">Booked</Option>
            <Option value="Expired">Expired</Option>
          </Select>
        </Form.Item>

        <Button type="primary" block onClick={handleSubmit}>
          {initialValues ? "Update Alert" : "Create Alert"}
        </Button>
      </Form>
    </Modal>
  );
};

export default AlertModal;
