import * as React from 'react';
import { login } from '@/net/service';
import { history } from '@@/core/history';
import styles from './usersInfo.less';
import { Button, Checkbox, Form, Input } from 'antd';

class  UsersInfo extends  React.Component<any, any>{

  render() {
    return(
      <div>
        <div>
          <table className={styles.table}>
            <tr>
              <th className={styles.th}>1111</th>
            </tr>
            <tr>
              <td className={styles.td}>222</td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}
export default UsersInfo;
