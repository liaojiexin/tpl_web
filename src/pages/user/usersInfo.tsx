import { Table, Tag, Space, Input, Modal,Button,Form } from 'antd';
import React from 'react';
import { PageParam ,User } from '@/net/index';
import styles from '@/pages/user/usersInfo.less';
import { selectAllUser, deleteUser, updateUser } from '@/net/service';
import { FormInstance } from 'antd/es/form';
type  Props = {

}
class UsersInfo extends React.Component<Props, any> {
  constructor(props:Props) {
    super(props);
    // 不要在这里调用 this.setState()
    this.state = {
      isModalVisible:false,
      datasource:[],
      uid:null,
      pageSize:10,
      pageNum:1
    };
  }
  formRef = React.createRef<FormInstance>();
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
          <a href="javascript:void(0)" onClick={() =>this.setState({ isModalVisible:true ,uid:r.uid})}>修改</a>
          <a href="javascript:void(0)" onClick={() => this.handleDel(r.uid)}>删除</a>
        </Space>
      ),
    },
  ];

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
      console.log("selectAllUser",res)
      const { code, body } = res.data as any
      const { total,pageSize,pageNum,content} =body as any
      this.setState({
        datasource: content
      })
    });
  }

   handleOk = () => {
    // this.setState({ isModalVisible:false })
    this.formRef.current!.validateFields().then(values =>{
      console.log('values', values);
      const { username,uname,oldpassword, newpassword1, newpassword2 } = values;
      if (oldpassword != null) {
        if (newpassword1 == null)
          alert('若要修改密码，新密码不可为空');
        if (newpassword1!=newpassword2)
          alert('新密码两次输入不一致');
      }else {
        let user:User={
          uid: this.state.uid,
          username: username,
          password: newpassword1,
          oldpassword: oldpassword,
          uname: uname
        };
        updateUser(user).then(res=>{
          const { code, body ,message } = res.data as any;
          console.log("res",res);
          if (code!=0){
            alert("修改失败,"+message);
          } else {
            alert("修改成功");
            this.setState({ isModalVisible:false });
          }
        })
      }
    })
  };

   handleCancel = () => {
    this.setState({ isModalVisible:false })
  };

  render() {
    const { datasource } = this.state;

    return (
      <>
        <Table columns={this.columns} dataSource={datasource} className={styles.table} rowKey={(r)=>r.uid}/>
        <Modal title="修改用户信息" className={styles.Modal} visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <Form name="basic"   ref={this.formRef} labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }}
             autoComplete="off" >
            <Form.Item label="账号" name="username" >
              <Input />
            </Form.Item>

            <Form.Item label="用户名" name="uname">
              <Input />
            </Form.Item>

            <Form.Item label="原始密码" name="oldpassword">
              <Input.Password />
            </Form.Item>

            <Form.Item label="新密码" name="newpassword1">
              <Input.Password />
            </Form.Item>

            <Form.Item label="确认新密码" name="newpassword2">
              <Input.Password />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
};

export default UsersInfo;
