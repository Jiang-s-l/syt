<template>
    <div v-loading="true">
        <!-- 此页面在登录弹框的微信扫码登录页面的二维码处显示 -->
    </div>
</template>

<script setup lang="ts">
import { useRoute  } from 'vue-router';

/* 
    用户在微信上授权后，重定向地址
    http://127.0.0.1:5173/wxlogin?
    token=eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJSCjAK0A0Ndg1S0lFKrShQsjI0NzQ3sDA0MjDQUSotTi3yTAGKGZuZmUG4fom5qUBdWcU5SrUANUYzk0MAAAA.iYHwF4Q0xZtPqVW5MEEyiSzRQgtIojSssNF0uU-cWkOGJAEu-1TpR0vd6VTQG_epOevvJD-9gWIEDib0J9Fjmg
    &openid=oc5_b6mg4nwnhcpxVY8iwJy5zOuQ
    &name=jsl
*/

// 获取路由对象
let $route = useRoute()
// console.log($route.query)


// 本地存储用户信息
localStorage.setItem('userInfo',JSON.stringify($route.query));

// 此路由组件代码执行：说明授权成功
// 隐藏页面内容,在路由配置中已配置

</script>

<script lang="ts">
export default {
    name: "WxLogin",
};
</script>

<style scoped></style>