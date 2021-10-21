import React, { ReactChildren } from 'react';
import Header from '@/components/header'
import style from './layout.less';
import { Redirect } from 'umi';
type Props = {
  children: ReactChildren;
};

const BasicLayout: React.FC<Props> = (props) => {

  const { children } = props;
  const isLogin = ()=>{
    return localStorage.getItem("token")
  }
  if (!isLogin()) {
    return <Redirect to="/login" />;
  }
/*  const errorToken=()=>{
    return
  }*/
  return (
    <div className={style.main}>
      <Header />
      <div className={style.content}>{children}</div>
      {/*<Footer />*/}
    </div>
  );
};
export default BasicLayout;
