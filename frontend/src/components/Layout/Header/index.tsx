import { Layout, Typography } from "antd";

export const Header = () => {
  return (
    <Layout.Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
      }}
    >
      <Typography.Title level={4} style={{ color: "white", margin: 0 }}>
        Teste Fullstack
      </Typography.Title>
    </Layout.Header>
  );
};
