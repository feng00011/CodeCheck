import requests from './request';

export const reqPost = (params)=>(requests({url:`/postMsg`,method:'post',data:params}))
