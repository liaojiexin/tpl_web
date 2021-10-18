import { notification } from 'antd';
import axios, { AxiosResponse } from 'axios';

const codeMessage: Record<number, string> = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// /**
//  * @zh-CN 异常处理程序
//  * @en-US Exception handler
//  */
const errorHandler = (error: { response: Response }) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `Request error ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: 'Your network is abnormal and cannot connect to the server',
      message: 'Network anomaly',
    });
  }
  // return response;
  return Promise.reject(error);
};

var Request = axios.create({
  // timeout: 3000,
  headers: { 'Content-Type': 'application/json' },
  // baseURL: '/api/'
});

// 添加请求拦截器
Request.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('rpa-token');
    if (token) {
      // @ts-ignore
      config.headers.common['token'] = token;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
Request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  /**
    1、集中处理响应数据（如错误码处理）
  */
  // console.log('Request.interceptors.response', response.data);

  return response.data;
}, errorHandler);

export default Request;
