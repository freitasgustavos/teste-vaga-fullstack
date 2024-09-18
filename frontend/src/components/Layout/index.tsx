import type React from "react";
import { Layout as AntdLayout, Typography } from "antd";
import type { ILayoutProps } from "../../types";
import { Header } from "./Header";

/**
 * Layout component
 *
 * This component is the main app layout. It's a full-width Ant Design Layout component
 * with a sticky header at the top and a centered footer at the bottom. The header
 * contains the app title and the footer contains the copyright information.
 *
 * This component expects to receive a single child element, which is the app content.
 *
 * @param {{ children: React.ReactNode }} props
 * @returns {React.ReactElement}
 */
export const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <AntdLayout>
      <Header />
      <AntdLayout.Content style={{ height: "calc(100vh - 135px)" , padding: 20 }}>
        {children}
      </AntdLayout.Content>
      <AntdLayout.Footer style={{ textAlign: "center" }}>
        ©{new Date().getFullYear()} Created by{" "}
        <Typography.Link target="_blank" href="https://gustavofreitas.dev">
          https://gustavofreitas.dev
        </Typography.Link>
      </AntdLayout.Footer>
    </AntdLayout>
  );
};
