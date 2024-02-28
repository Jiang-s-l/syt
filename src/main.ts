// vue3框架提供的方法createApp方法，可以用来创建应用实例方法
import { createApp } from "vue";

// 引入清除默认样式
import "@/style/reset.scss";

// 引入根组件App
import App from "@/App.vue";

// 引入vue-router核心插件
import router from "@/router";

// 引入ElementPlus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 引入ElementPlus配置国际化的配置
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

// 引入pinia仓库
import pinia from '@/store/index.ts'

//引入路由鉴权的文件
import './permisstion'

// 利用createApp方法创建应用实例，
const app = createApp(App);

// 安装router
app.use(router);

// 安装ElementPlus
app.use(ElementPlus, {
  locale: zhCn,
});

// 安装pinia仓库
app.use(pinia);

// 引入并注册全局组件--顶部组件、底部组件、登录组件----注册全局组件出错，当前未找到原因
// 已解决--莫名其妙就好了
import HospitalTop from "@/components/hospital_top/index.vue";
import HospitalBottom from "@/components/hospital_bottom/index.vue";
import Login from "@/components/login/index.vue";
// 就诊人组件
import Visitor from "@/components/visitor/index.vue"
app
  .component("HospitalTop", HospitalTop)
  .component("HospitalBottom", HospitalBottom)
  .component("Login", Login)
  .component("Visitor", Visitor);

// 将应用实例进行挂载
app.mount("#app");
