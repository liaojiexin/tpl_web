import * as React from 'react';

import { Spin, Form, Input, Button, Checkbox } from 'antd';
import login_img from '@/images/login_img.png';
// import { useModel } from 'umi';
import './login.less';
import styles from './login.less';
import {login} from '@/net/service';
import { LoginParams } from '@/net';
import { history} from 'umi';

const Login: React.FC<{}> = () => {
  // const { userLogin } = useModel('user', (model) => ({
  //   // : model.handleMenuChange,
  //   userLogin: model.userLogin,
  // }));

  const onFinish = (values: any) => {
    console.log('onFinish', values);
    const { username, password } = values;
    login({ username, password }).then(res=>{
      console.log("res",res); // 登录结果

      const { code,body } = res as any;
      if(code === 0) {
        localStorage.setItem("token",body)
        history.push('/')
      }
    })
    // userLogin({ username, password });
  };

  //  let login_img = PackageInfo.outputName + "/" + "images" + "/" + "login_img.png";
  return (
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
  );
};

export default Login;
