import React ,{ useState }  from 'react';
import { Space,Input,Modal,Button} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import styles from '@/pages/user/addOrUpdateUser.less';

export default class addOrUpdateUser extends React.Component<any, any>{
  constructor(props:any) {
    super(props);
    // 不要在这里调用 this.setState()
    this.state = {isModalVisible: false};

  }

  render() {
    const showModal = () => {
      this.setState({ isModalVisible:true })
    };

    const handleOk = () => {
      this.setState({ isModalVisible:false })
    };

    const handleCancel = () => {
      this.setState({ isModalVisible:false })
    };

    return (
      <>
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
        <Modal title="Basic Modal" visible={this.state.isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Space direction="vertical" className={styles.Space}>
            <Input placeholder="账户"/>
            <Input placeholder="用户名称"/>
            <Input.Password placeholder="原始密码"/>
            <Input.Password
              placeholder="新密码"
              iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
            />
            <Input.Password
              placeholder="确认新密码"
              iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
            />
          </Space>
        </Modal>
      </>
    );
  }
}
