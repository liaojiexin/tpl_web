import { AxiosResponse } from 'axios';
import { LoginParams, RpaParams, RidParmas } from './index';
import request from './request';

export const login = (params: LoginParams) => {
  return request('/api/login', {
    method: 'POST',
    data: params,
  });
};

export const selectAll = () => {
  return request('/api/selectAll', {
    method: 'GET',
  });
};

export const insertSelective = (params: RpaParams) => {
  return request('/api/insertSelective', {
    method: 'POST',
    data: params,
  });
};

export const updateByPrimaryKeySelective = (params: RpaParams) => {
  return request('/api/updateByPrimaryKeySelective', {
    method: 'POST',
    data: params,
  });
};

export const selectByPrimaryKey = (params: RpaParams) => {
  return request('/api/selectByPrimaryKey', {
    method: 'GET',
    params: params,
  });
};

export const deleteByPrimaryKey = (params: RidParmas) => {
  return request('/api/deleteByPrimaryKey', {
    method: 'POST',
    data: params,
  });
};

export const importProcess = (params: FormData) => {
  return request('/api/importProcess', {
    method: 'POST',
    data: params,
  });
};
export const exportProcess = (params: RidParmas) => {
  return request('/api/exportProcess', {
    method: 'GET',
    // responseType: 'blob',
    params: params,
  });
};
// export const uploadToMinIo = (url:string, file:Blob) => {
//     return request(url, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'binary',
//       },
//       // responseType: 'blob',
//       data: file,
//     });
//   };
// // 'data' 作为请求主体被发送的数据
// // 适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
// // 必须是以下类型之一：
// // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
// // - 浏览器专属：FormData, File, Blob
// // - Node 专属： Stream

// export const mergeUploadFile = (filename:string, uploadid:string, etag:string) => {
//   return request("/attach/stream/mergePart.do", {
//     method: 'get',
//     headers: {
//       // 'Content-Type': 'binary',
//     },
//     // responseType: 'blob',
//     params:{
//       filename, uploadid, etag
//     }
//   });
// };
