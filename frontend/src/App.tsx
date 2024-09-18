import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  message,
  Row,
  Table,
  Tag,
  Tooltip,
  Typography,
  Upload,
  type UploadProps,
} from "antd";
import { Layout } from "./components/Layout";
import { UploadOutlined, SyncOutlined } from "@ant-design/icons";

import ptBR from "antd/locale/pt_BR";
import type { ColumnsType } from "antd/lib/table";
import type { ITransaction } from "./types";

import io from "socket.io-client";
import { addMask } from "./utils";
import { useListTransactions } from "./hooks/useListTransactions";
import { useApp } from "./hooks/useApp";

const socket = io(import.meta.env.VITE_SOCKET_URL);

export function App() {
  const { setIsLoading, isLoading } = useApp();
  const [page, setPage] = useState(1);
  const { data, isPending, refetch } = useListTransactions(page);

  const columns: ColumnsType<ITransaction> = [
    {
      title: "Cliente",
      dataIndex: "nmClient",
      key: "nmClient",
    },
    {
      title: "Cpf/Cnpj",
      dataIndex: "nrCpfCnpj",
      key: "nrCpfCnpj",
      render: (nrCpfCnpj: string) => addMask(nrCpfCnpj),
    },
    {
      title: "Valor Total",
      dataIndex: "vlTotal",
      key: "vlTotal",
    },
    {
      title: "Qtde. prestações",
      dataIndex: "qtPrestacoes",
      key: "qtPrestacoes",
    },
    {
      title: "Valor prestação",
      dataIndex: "vlPresta",
      key: "vlPresta",
      render: (vlwPresta: number, record) => {
        if (record.vlCorreto === "false") {
          return (
            <Tooltip placement="right" color="red" title="Valor incorreto">
              <Typography.Text type="danger">{vlwPresta}</Typography.Text>
            </Tooltip>
          );
        }
        return vlwPresta;
      },
    },
    {
      title: "Valor mora",
      dataIndex: "vlMora",
      key: "vlMora",
    },
    {
      title: "Valor multa",
      dataIndex: "vlMulta",
      key: "vlMulta",
    },
    {
      title: "Valor atual",
      dataIndex: "vlAtual",
      key: "vlAtual",
    },
    {
      title: "Situação",
      dataIndex: "idSituac",
      key: "idSituac",
      align: "center",
      render: (idSituac: string) => {
        if (idSituac === "Aberta") {
          return <Tag color="green">{idSituac}</Tag>;
        }
        return <Tag color="red">{idSituac}</Tag>;
      },
    },
  ];

  const uploadProps: UploadProps = useMemo(() => {
    return {
      accept: ".csv",
      name: "file",
      action: `${import.meta.env.VITE_UPLOAD_URL}/transaction/upload`,
      showUploadList: false,
      multiple: false,
      method: "post",
      onChange(info) {
        if (info.file.status === "done") {
          setIsLoading(true);
          message.success(`Processando o arquivo enviado.`);
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
  }, [setIsLoading]);

  const mountExtra = useMemo(() => {
    return (
      <Row gutter={16}>
        <Col>
          <Button
            onClick={() => refetch()}
            icon={<SyncOutlined spin={isLoading} />}
          />
        </Col>
        <Col>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />} type="primary">
              Upload
            </Button>
          </Upload>
        </Col>
      </Row>
    );
  }, [uploadProps, refetch, isLoading]);

  const handleRefetch = useCallback(() => {
    refetch();
    setIsLoading(false);
  }, [refetch, setIsLoading]);

  useEffect(() => {
    socket.on("processed", () => {
      message.success("Arquivo processado com sucesso.");
      handleRefetch();
    });

    return () => {
      socket.off("processed");
    };
  }, [handleRefetch]);

  return (
    <ConfigProvider locale={ptBR}>
      <Layout>
        <Card title="Transações" extra={mountExtra}>
          <Table
            loading={isPending}
            rowKey={"_id"}
            columns={columns}
            dataSource={data?.transactions}
            pagination={{
              pageSize: 10,
              total: data?.pagination.total,
              onChange: (page) => setPage(page),
              showSizeChanger: false,
            }}
          />
        </Card>
      </Layout>
    </ConfigProvider>
  );
}
