import { StatusSwitch } from "@/components/_core/status-switch";
import { urls } from "@/urls";
import { Button, List, Space } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import Link from "next/link";
import React, { useEffect } from "react";
import { useGetPropertiesForOwner } from "@/state/properties.state";

export const PropertyList: React.FC = () => {
  const [loadStatus, loadProperties, properties] = useGetPropertiesForOwner(s => [s.status, s.request, s.value]);

  useEffect(() => {
    loadProperties();
  }, []);

  return (
    <StatusSwitch status={loadStatus}>
      <Space direction="vertical" style={{ width: 400 }}>
        {properties && (
          <List
            dataSource={properties}
            renderItem={property => (
              <Link href={urls.properties.property(property._id)}>
                <List.Item>
                  {property.name}
                </List.Item>
              </Link>
            )}
          />
        )}

        <Link href={urls.properties.create()}>
          <Button type="dashed" block icon={<PlusOutlined />}>
            Create
          </Button>
        </Link>
      </Space>
    </StatusSwitch>
  )
}
