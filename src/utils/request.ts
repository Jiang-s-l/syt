// 对于axios函数库进行二次封装
//你工作的时候是否axios进行二次封装?二次封装的目的是什么那?
// 目的1：利用axios请求、拦截的功能
// 目的2：请求拦截器->可以在请求头中携带公共的参数，如token
// 目的3：响应拦截器->可以简化服务器返回的数据，处理http错误
// 目的4：可以设置baseURL，更换接口地址时，更容易维护

import useUserStore from "@/store/modules/user";
import aoxis from "axios";
import { ElMessage } from "element-plus";

// 利用axios.create方法创建一个axios实例：可以设置基础路径和超时时间
const request = aoxis.create({
  baseURL: "/api",
  timeout: 5000,
});

// 请求拦截器
request.interceptors.request.use((config) => {
  // 获取用户仓库
  const userStore = useUserStore()
  // config：请求拦截器回调注入的对象（配置对象），配置对象的身上最重要的一件事情headers属性
  // 可以通过请求头携带公共参数token,如果用户登录了，需要携带token
  if(userStore.userInfo.token){
    config.headers.token = userStore.userInfo.token
  }
  return config;
});

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 响应拦截器成功，一般会进行简化数据
    return response.data;
  },
  (error) => {
    // 处理http网络错误
    console.log(error);
    let status = error.response.status;
    switch (status) {
      case 404:
        // 错误提示信息
        ElMessage.error("请求失败，404错误，请求路径出现错误");
        break;
      case 500 | 501 | 502 | 503 | 504 | 505:
        ElMessage.error("服务器挂了");
        break;
      case 401:
        // 错误提示信息
        ElMessage.error("请求参数有误");
        break;
    }
    return Promise.reject(new Error(error.message));
  }
);

// 暴露二次封装的axios
export default request;
