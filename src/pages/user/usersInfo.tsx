import { Table, Tag, Space } from 'antd';
import React from 'react';
import { Users } from '@/pages/interface/interface';
import styles from '@/pages/user/usersInfo.less';

class UsersInfo extends React.Component<any, any> {
  columns = [
    {
      title: '用户id',
      dataIndex: 'uid',
      key: 'uid'
    },
    {
      title: '账号',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '用户名称',
      dataIndex: 'uname',
      key: 'uname',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <a>修改</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];

  data = [
    {
      key: '1',
      uid: 'id1',
      username: '111',
      uname: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      uid: 'id2',
      username: '111',
      uname: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      uid: 'id2',
      username: '111',
      uname: 'Sidney No. 1 Lake Park'
    },
  ];

  render() {
    return (
      <Table columns={this.columns} dataSource={this.data} className={styles.table}/>
    );
  }
};

export default UsersInfo;
