import React from 'react';
import  {FocusEvent ,} from 'react/index'
import styles from './login.less';
import Image from '@/images/image.jpg';
//ͷ头部
class Header extends React.Component {
  goBack() {
    window.history.go(-1);
  }

  render() {
    return (
      <div className={styles.styleDiv}>
        <a href="#" onClick={() => this.goBack()}>
          <img src={Image} className={styles.styleImg}/>
        </a>
      </div>
    )
  }
}

interface User {
  telError: string | null,
  passwordError: string | null,
  imageShow: boolean,

}

//中间表单
class Content extends React.Component<{},User> {

  constructor(props:any) {
    super(props);
    this.state = {
      telError: null,
      passwordError: null,
      imageShow: true,

    }

  }

  //手机号判断
  telCheck(event:FocusEvent<HTMLInputElement>) {
    let tel = event.target.value
    console.log(tel)
    var reg = /^1[34578]\d{9}$/;
    if (reg.test(tel) == false) {
      this.setState({
        telError: "请输入正确的手机号"
      })
    } else {
      this.setState({
        telError: ""
      })
    }

  }

  //密码判断
  passwordCheck(event:FocusEvent<HTMLInputElement>) {
    let password = event.target.value
    var reg = /^\w{6,20}$/;
    if (reg.test(password) == false) {
      this.setState({
        passwordError: "密码为6-20位数字或字母或下划线!"
      })
    } else {
      this.setState({
        passwordError: ""
      })
    }

  }

  //是否记住密码
  isRemember() {
    this.setState({
      imageShow: !this.state.imageShow
    })
  }

  render() {
    var imageSrc = this.state.imageShow ? "./images/unSelected.png" : "./images/selected.png"
    return (
      <div>
        <img src="./images/headImg.png" alt="" className={styles.headImg}/>
        <ul className={styles.ul}>
          <li className={styles.userTel}>
            <img src="./images/username.png" alt="" className={styles.userImg}/>
            <span className={styles.userSpan}></span>
            <input type="text" className={styles.telInput} placeholder="请输入手机号"
                   onBlur={(event) => this.telCheck(event)}
            />
          </li>
          <li className={styles.liAll}>
            <span className={styles.telPrompt}>{this.state.telError}</span>
          </li>
          <li className={styles.userTel}>
            <img src="./images/password.png" alt="" className={styles.userImg}/>
            <span className={styles.userSpan}></span>
            <input type="password" className={styles.telInput} placeholder="请输入密码"
                   onBlur={(event) => this.passwordCheck(event)}/></li>
          <li className={styles.liAll}>
            <span className={styles.telPrompt}>{this.state.passwordError}</span>
          </li>
          <li className={styles.rememberLi}>
            <img src={imageSrc}  className={styles.unSelected} onClick={() => this.isRemember()}/>
            <a href="#" className={styles.rememberI}>记住手机号</a><a href="#" className={styles.forgetI }>忘记密码</a>
          </li>
          <li className={styles.liAll}>
            <button className={styles.login}>登录</button>
          </li>
        </ul>
      </div>
    )
  }
}

//底部
class Footer extends React.Component {
  render() {
    return (
      <a href="#" className={styles.register}>快速注册</a>
    )
  }
}

class login extends React.Component {
  render() {
    return (
      <div>
        <Header></Header>
        <Content></Content>
        <Footer></Footer>
      </div>
    )
  }
}

export default login;
