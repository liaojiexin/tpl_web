import * as React from 'react';
import { login } from '@/net/service';
import { history } from '@@/core/history';
import styles from './usersInfo.less';
import { Button, Checkbox, Form, Input } from 'antd';

class  UsersInfo extends  React.Component<any, any>{

  render() {
    return(
      <div className={styles.div1}>
        <div className={styles.div2}>
          <table className={styles.table}>
            <tr className={styles.tr}>
              <th className={styles.th}>用户id</th>
              <th className={styles.th}>账号</th>
              <th className={styles.th}>用户名称</th>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.td}>222</td>
              <td className={styles.td}>222</td>
              <td className={styles.td}>222</td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}
export default UsersInfo;
