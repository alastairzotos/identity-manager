import { ApiKeysCreate } from "@/components/api-keys/api-keys-create";
import { Alert, Button, Card, List, Popconfirm, Space, Typography } from "antd";
import { MinusCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import { useCreateApiKey, useDeleteApiKey, useGetApiKeysForOwner } from "@/state/api-key";
import { IGetApiKeyDto } from "@bitmetro/dashboard-models";
import { StatusSwitch } from "@/components/_core/status-switch";
import { getAxiosError } from "@/utils/misc";

const { Text } = Typography;

export const ApiKeysManage: React.FC = () => {
  const [showingCreatedKey, setShowingCreatedKey] = useState(false);

  const [getApiKeysStatus, getApiKeys, apiKeys] = useGetApiKeysForOwner(s => [s.status, s.request, s.value]);
  const [createApiKeyStatus, createApiKey, createdApiKey, createApiKeyError, clearCreateState] = useCreateApiKey(s => [s.status, s.request, s.value, s.error, s.clear]);
  const [deleteApiKeyStatus, deleteApiKey] = useDeleteApiKey(s => [s.status, s.request]);

  useEffect(() => {
    getApiKeys();
  }, []);

  const handleCreateApiKey = async (name: string) => {
    await createApiKey(name);
    setShowingCreatedKey(true);
  }

  const handleCloseKeyDialog = () => {
    setShowingCreatedKey(false);
    getApiKeys();
  }

  const handleDeleteApiKey = async (key: IGetApiKeyDto) => {
    await deleteApiKey(key._id);
    await getApiKeys();
  }

  if (createApiKeyStatus === "error") {
    return (
      <Space direction="vertical">
        <Alert type="error" message={getAxiosError(createApiKeyError)} />
        <Button
          onClick={() => {
            clearCreateState();
            setShowingCreatedKey(false);
            getApiKeys();
          }}
        >
          Ok
        </Button>
      </Space>
    )
  }

  if (showingCreatedKey) {
    return (
      <Card>
        <Space direction="vertical">
          <Text>Your API key is:</Text>
          <Alert message={createdApiKey?.key} type="info" />

          <Text>Copy this down because you will not be able to access it again.</Text>
          <Button type="primary" onClick={handleCloseKeyDialog}>
            Done
          </Button>
        </Space>
      </Card>
    )
  }

  return (
    <StatusSwitch status={getApiKeysStatus}>
      {apiKeys && (
        <Space direction="vertical">
          <List
            style={{ width: 300 }}
            dataSource={apiKeys}
            renderItem={(apiKey) => (
              <List.Item>
                <Text>{apiKey.name}</Text>

                <Popconfirm
                  title="Delete API key?"
                  description="Are you sure you want to delete this API key?"
                  onConfirm={() => handleDeleteApiKey(apiKey)}
                  okText="Yes"
                  cancelText="Cancel"
                  placement="right"
                >
                  <MinusCircleOutlined />
                </Popconfirm>
              </List.Item>
            )}
          />

          <ApiKeysCreate
            createStatus={createApiKeyStatus}
            onCreate={handleCreateApiKey}
          />

          <StatusSwitch status={deleteApiKeyStatus} />
        </Space>
      )}
    </StatusSwitch>
  )
}
