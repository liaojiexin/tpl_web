export type LoginParams = {
  username: string;
  password: string;
};
export type RpaParams = {
  rid?: string;
  rname?: string;
  content?: string;
};

export type RidParmas = {
  rid: string;
};

export type PageParam = {
  pageSize: number;   //每页大小
  pageNum: number;    //当前页数
  total: number;     //全部多少条信息
  content: Array<any>;    //数据模型
};
