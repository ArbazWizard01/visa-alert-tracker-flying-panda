import { useState } from "react";
import { Button, Layout } from "antd";

import AlertModal from "./components/AlertModal";
import AlertList from "./components/AlertList";
import { createAlert } from "./api/alertApi";

const { Header, Content } = Layout;

function App() {

  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleCreate = async (data) => {
    await createAlert(data);
    setOpen(false);
    setRefresh(!refresh);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>

      <Header style={{ color: "#fff", fontSize: 18 }}>
        Flying Panda Visa Alert Dashboard
      </Header>

      <Content style={{ padding: 20 }}>

        <Button
          type="primary"
          onClick={() => setOpen(true)}
          style={{ marginBottom: 20 }}
        >
          Create Alert
        </Button>

        <AlertList refresh={refresh} />

        <AlertModal
          open={open}
          onCancel={() => setOpen(false)}
          onCreate={handleCreate}
        />

      </Content>

    </Layout>
  );
}

export default App;
