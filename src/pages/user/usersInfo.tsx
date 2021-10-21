import { Table, Tag, Space } from 'antd';
import React from 'react';
import { PageParam } from '@/net/index';
import styles from '@/pages/user/usersInfo.less';
import { selectAllUser, deleteUser, updateUser } from '@/net/service';
import addOrUpdateUser from '@/pages/user/addOrUpdateUser';
type  Props = {

}
class UsersInfo extends React.Component<Props, any> {
  constructor(props:Props) {
    super(props);
    // 不要在这里调用 this.setState()
    this.state = {
      datasource:[],
      pageSize:10,
      pageNum:1
    };
  }

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
      render: (t:any,r:any) => (
        <Space size="middle">
          <a href="/addOrUpdateUser">修改</a>
          <a href="javascript:void(0)" onClick={() => this.handleDel(r.uid)}>删除</a>
        </Space>
      ),
    },
  ];

  // 编辑
  handleEdit (user:any) {
    updateUser(user).then(res=>{

    })
  }
  // 删除
  handleDel (uid:string) {
    const confirmed = window.confirm(`确定要删除该用户吗？`); // confirm 无法识别,需要加 window.
    if (confirmed) {
      deleteUser(uid)
        .then(res => {
          this.selectAll(10, 1);
          alert('删除用户成功');
        })
        .catch(err => {
          console.error(err);
          alert('删除用户失败');
        });
    }
  }

  //已进入页面就调用
   componentDidMount() {
     this.selectAll(10, 1);
   }

   //查询所有用户数据
  selectAll(pageSize:number,pageNum:number) {
    let params: PageParam = {
      pageNum: pageNum,
      pageSize: pageSize,
    };
    selectAllUser(params).then(res=>{
      console.log("1",res)
      const { code, body } = res.data as any
      const { total,pageSize,pageNum,content} =body as any
      this.setState({
        datasource: content
      })
    });
  }

  render() {
    const { datasource } = this.state;
    return (
      <Table columns={this.columns} dataSource={datasource} className={styles.table} rowKey={(r)=>r.uid}/>
    );
  }
};

export default UsersInfo;
