import { useGetIdentity, usePermissions } from '@refinedev/core';
import { Avatar, Card, Col, Row, Space, Typography } from 'antd';

const { Text } = Typography;

export const DashboardPage = () => {
  const { data: identity } = useGetIdentity();
  const permissions = usePermissions({
    params: { permissions: ['admin'] },
  });

  return (
    <Row gutter={20}>
      <Col span={6}>
        <Card title="Identity" style={{ height: '300px', borderRadius: '15px' }} headStyle={{ textAlign: 'center' }}>
          <Space align="center" direction="horizontal">
            <Avatar size="large" src={identity?.avatar} />
            <Text>{identity?.name}</Text>
          </Space>
        </Card>
      </Col>
      <Col span={6}>
        <Card title="Permissions" style={{ height: '300px', borderRadius: '15px' }} headStyle={{ textAlign: 'center' }}>
          <Text>{permissions.data}</Text>
        </Card>
      </Col>
    </Row>
  );
};
