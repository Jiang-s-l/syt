import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  // 内部提供了 history 模式的实现
  history: createWebHistory(),
  // 管理路由
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      component: () => import("@/pages/home/index.vue"),
      meta:{title:'首页'}
    },
    {
      path: "/hospital",
      component: () => import("@/pages/hospital/index.vue"),
      children: [
        {
          path: "register",
          component: () => import("@/pages/hospital/register/index.vue"),
          meta:{title:'预约挂号'}
        },
        {
          path:"register_detail",
          component:()=>import("@/pages/hospital/register/register_detail/index.vue"),
          meta:{title:'预约时间选择'}
        },
        {
          path:"register_step2",
          component:()=>import("@/pages/hospital/register/register_step2/index.vue"),
          meta:{title:'就诊人选择'}
        },
        {
          path: "detail",
          component: () => import("@/pages/hospital/detail/index.vue"),
          meta:{title:'医院详情'}
        }, {
          path: "notice",
          component: () => import("@/pages/hospital/notice/index.vue"),
          meta:{title:'预约通知'}
        }, {
          path: "close",
          component: () => import("@/pages/hospital/close/index.vue"),
          meta:{title:'停诊信息'}
        }, {
          path: "search",
          component: () => import("@/pages/hospital/search/index.vue"),
          meta:{title:'查询/取消'}
        },
      ]
    },
    {
      path: "/member",
      component: () => import("@/pages/member/index.vue"),
      children: [
        {
          path: "certification",
          component: () => import("@/pages/member/certification/index.vue"),
          meta:{title:'实名认证'}
        },
        {
          path:"order",
          component:()=>import("@/pages/member/order/index.vue"),
          meta:{title:'挂号订单'}
        },
        {
          path:"patient",
          component:()=>import("@/pages/member/patient/index.vue"),
          meta:{title:'就诊人管理'}
        },
        {
          path: "account",
          component: () => import("@/pages/member/account/index.vue"),
          meta:{title:'账号信息'}
        }, {
          path: "opinion",
          component: () => import("@/pages/member/opinion/index.vue"),
          meta:{title:'意见反馈'}
        },
      ]
    },
    {
      path: "/wxlogin",
      component: () => import("@/pages/wxlogin/index.vue"),
      // @ts-ignore
      beforeEnter: (to, from, next) => {
        // 隐藏ifream重定向页面
        let html: any = document.querySelector('html');
        html.style.display = 'none';
        next()
      }
    },
  ],
  // 滚动行为：当切换到新路由时，想要页面滚到顶部
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0, left: 0 };
  },
});

export default router;
