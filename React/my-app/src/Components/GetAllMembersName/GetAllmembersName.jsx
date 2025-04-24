import React from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Space, Button, Spin, Alert } from 'antd';
import AxiosGetMembersName from './AxiosGetMembersName'; // הנתיב בהתאם לאיפה שהקובץ נמצא

const GetAllMembersName = () => {
 
  const { members, loading, error } = AxiosGetMembersName();

  if (loading) {
    return <Spin tip="Loading members..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  const items = members.map((member, index) => ({
    label: member.name,
    key: index.toString(),
    icon: <UserOutlined />,
  }));

  const menuProps = {
    items,
  };

  return (
    <Space wrap>
      <Dropdown.Button menu={menuProps} placement="bottom" icon={<UserOutlined />}>
        Members
      </Dropdown.Button>
    </Space>
  );
};

export default GetAllMembersName;

