import { Modal, Form, Input, Select, Button, message } from "antd";
import '../styles/AlertModal.css';

const { Option } = Select;

const AlertModal = ({ open, onCancel, onCreate, initialValues }) => {
  const [form] = Form.useForm();


  form.setFieldsValue(initialValues || { status: 'Active' });

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await onCreate(values); 
      message.success(initialValues ? "Alert updated successfully" : "Alert created successfully");
      form.resetFields();
    } catch (errorInfo) {
      console.log("Validation Failed:", errorInfo);
      message.error("Please fill all required fields correctly");
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
        <Form.Item
          label="Country"
          name="country"
          rules={[{ required: true, message: "Country is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: "City is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Visa Type"
          name="visaType"
          rules={[{ required: true, message: "Visa Type is required" }]}
        >
          <Select placeholder="Select visa type">
            <Option value="Tourist">Tourist</Option>
            <Option value="Business">Business</Option>
            <Option value="Student">Student</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Status is required" }]}
          initialValue="Active"
        >
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
