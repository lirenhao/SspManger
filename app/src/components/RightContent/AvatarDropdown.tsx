import React from 'react';
import { LogoutOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { useModel } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export interface GlobalHeaderRightProps {
  menu?: boolean;
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  const { initialState } = useModel('@@initialState');

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.id) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]}>
      <Menu.Item>
        <a href='/changePwd' target='_blank'>
          <LockOutlined />
          修改密码
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href={`/signout?redirect_uri=${encodeURI(window.location.href)}`}>
          <LogoutOutlined />
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} icon={<UserOutlined />} alt="avatar" />
        <span className={`${styles.name} anticon`}>{currentUser.id}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
