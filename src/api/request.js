import axios from  'axios'

const requests = axios.create({
    //基础路径
    baseURL:'/api',
    //响应超时设置为5s
    timeout:5000

})

requests.interceptors.response.use((res)=>{
    return res.data;
},(error)=>{
    //失败的回调函数，可以终止Promise链条（axios就是一个Promise），响应一个失败
    return Promise.reject(error)
})

export default requests;