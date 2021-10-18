import React, { ReactChildren } from 'react';

type Props = {
  children: ReactChildren;
};
const BlankLayout: React.FC<Props> = (props) => {
  const { children } = props;

  return <div>{props.children}</div>;
};
export default BlankLayout;
