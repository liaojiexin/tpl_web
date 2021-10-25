import * as React from 'react';

import { Spin, Form, Input, Button, Checkbox, Modal } from 'antd';
import login_img from '@/images/login_img.png';
// import { useModel } from 'umi';
import './login.less';
import styles from './login.less';
import { login, addUser } from '@/net/service';
import { LoginParams, User } from '@/net';
import { history} from 'umi';
import { useState } from 'react';
import { FormInstance } from 'antd/es/form';

const Login: React.FC<{}> = () => {
  // const { userLogin } = useModel('user', (model) => ({
  //   // : model.handleMenuChange,
  //   userLogin: model.userLogin,
  // }));

  const [isModalVisible,setisModalVisible]=React.useState(false);

  const formRef = React.createRef<FormInstance>();

  const handleOk = () => {
    // this.setState({ isModalVisible:false })
    formRef.current!.validateFields().then(values =>{
      console.log('values', values);
      const { username,uname, newpassword1, newpassword2 } = values;
      if (newpassword1!=newpassword2) {
          alert('密码两次输入不一致');
      }else {
        let user:User={
          username: username,
          password: newpassword1,
          uname: uname
        };
        addUser(user).then(res=>{
          const { code, body ,message } = res.data as any;
          console.log("res",res);
          if (code!=0){
            alert(message);
          } else {
            alert("注册成功");
            setisModalVisible(false);
          }
        })
      }
    })
  };

  const onFinish = (values: any) => {
    console.log('onFinish', values);
    const { username, password } = values;
    login({ username, password }).then(res=>{
      console.log("res",res); // 登录结果

      const { code,body } = res.data as any;
      if(code === 0) {
        localStorage.setItem("token",body)
        history.push('/usersInfo')
      }
    })
    // userLogin({ username, password });
  };

  const handleCancel = () => {
    setisModalVisible(false);
  };

  //  let login_img = PackageInfo.outputName + "/" + "images" + "/" + "login_img.png";
  return (
    <>
      <div className="login-page">
        <div className={styles.bg}>
          <div className={styles.bgleft}></div>
          <div className={styles.bgright}></div>
        </div>
        {/* <Spin size="large"/> */}
        <div className={styles.loginbox}>
          <div className={styles.loginwrap}>
            <div className={styles.logincenter}>
              <div className={styles.loginname}>用户登录</div>
              <Form
                className={styles.loginform}
                name="basic"
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: '请输入你的账号!' },
                  ]}
                >
                  <Input placeholder="请输入用户名/手机号/邮箱"/>
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: '请输入你的密码!' },
                  ]}
                >
                  <Input.Password placeholder="请输入密码"/>
                </Form.Item>
                <div className={styles.loginbottom}>
                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    className={styles.loginbottomitem}
                  >
                    <Checkbox>自动登录</Checkbox>
                  </Form.Item>

                  <Form.Item className={styles.loginbottomitem}>
                    <div className={styles.loginforget}>
                      <a>忘记密码</a>
                    </div>
                    <div className={styles.loginforget}>
                      <a href="javascript:void(0)" onClick={() => setisModalVisible(true)}>注册账户</a>
                    </div>
                  </Form.Item>
                </div>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={styles.loginsubmit}
                  >
                    登录
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className={styles.loginRight}></div>
          <img src={login_img} className={styles.loginImg}/>
        </div>
      </div>

      <Modal title="修改用户信息" className={styles.Modal} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form name="basic" ref={formRef} labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              autoComplete="off">
          <Form.Item label="账号" name="username" rules={[{ required: true ,message:'账号不能为空'}]}>
            <Input/>
          </Form.Item>

          <Form.Item label="用户名" name="uname" rules={[{ required: true ,message:'用户名不能为空'}]}>
            <Input/>
          </Form.Item>

          <Form.Item label="密码" name="newpassword1" rules={[{ required: true,message:'密码不能为空' }]}>
            <Input.Password/>
          </Form.Item>

          <Form.Item label="确认密码" name="newpassword2" rules={[{ required: true,message:'确认密码不能为空'}]}>
            <Input.Password/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Login;
