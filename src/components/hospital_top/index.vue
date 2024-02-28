<template>
  <div class="top">
    <div class="content">
      <div class="left" @click="goHome">
        <img src="@/assets/images/logo.png" alt="logo" />
        <p>尚医通 预约挂号统一平台</p>
      </div>
      <div class="right">
        <p class="help">帮助中心</p>
        <!-- 没有用户名称，显示登录/注册 -->
        <p class="login" @click="login" v-if="!userStore.userInfo.name">登录 /注册</p>
        <!-- 有用户名称，显示用户名称 -->
        <el-dropdown v-else>
          <span class="el-dropdown-link">
            {{ userStore.userInfo.name }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="goMember('/member/certification')">实名认证</el-dropdown-item>
              <el-dropdown-item @click="goMember('/member/order')">挂号订单</el-dropdown-item>
              <el-dropdown-item @click="goMember('/member/patient')">就诊人管理</el-dropdown-item>
              <el-dropdown-item @click="loginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from "@/store/modules/user";
import { useRouter } from "vue-router";
import { ArrowDown } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'

let $router = useRouter();

// 点击logo和文字跳转到首页
const goHome = () => {
  $router.push("/home");
};

// 点击实名认证、挂号管理、就诊人管理跳转到会员信息相关页面
const goMember = (path: string) => {
  $router.push(path)
}

// 获取user仓库数据
const userStore = useUserStore()
// 点击登录注册按钮
const login = () => {
  userStore.loginDialogVisible = true
}

// 点击退出登录按钮
const loginout = () => {

  ElMessageBox.confirm(
    '是否确定退出登录',
    '退出登录',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      // 通知pinia仓库清除用户相关信息
      userStore.loginout();
      // 清空本地存储信息
      localStorage.removeItem('userInfo');
      // 路由跳转到home页
      $router.push({ path: '/home' });
    })
    .catch(() => {
      /* ElMessage({
        type: 'info',
        message: 'Delete canceled',
      }) */
    })


}
</script>

<script lang="ts">
export default {
  name: "HospitalTop",
};
</script>

<style lang="scss" scoped>
/*  
    使用element-plus中的下拉菜单，当鼠标放上去后出现一个黑框
    使用less和sass的需要注意一下层级问题，层级不对的话，css是无效果的 
*/
.el-dropdown-link:focus {
  outline: none;
}

.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
  font-size: 20px;
}

.top {
  position: fixed;
  z-index: 999;
  background-color: white;
  width: 100%;
  height: 90px;
  border-bottom: 1px solid rgb(239, 237, 237);
  display: flex;
  justify-content: center;

  .content {
    width: 80%;
    height: 90px;
    display: flex;
    justify-content: space-between;

    .left {
      cursor: pointer;
      display: flex;
      justify-items: center;
      align-items: center;

      img {
        width: 80px;
        height: 80px;
        margin-right: 10px;
      }

      p {
        font-size: 22px;
        color: rgb(0, 174, 255);
      }
    }

    .right {
      display: flex;
      justify-items: center;
      align-items: center;
      font-size: 20px;
      color: #bbb;

      .help {
        margin-right: 10px;
        cursor: pointer;

        &:hover {
          color: rgb(0, 174, 255);
        }
      }

      .login {
        cursor: pointer;

        &:hover {
          color: rgb(0, 174, 255);

        }
      }

    }
  }
}
</style>


