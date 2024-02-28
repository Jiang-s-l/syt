<template>
  <div class="container">
    <!-- 顶部全局组件 -->
    <HospitalTop></HospitalTop>

    <!-- 展示路由路由组件的区域 -->
    <div class="content">
      <!-- 展示路由组件的区域 -->
      <router-view></router-view>
    </div>

    <HospitalBottom></HospitalBottom>

    <!-- 登录组件 -->
    <Login></Login>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.container {
  display: flex;
  // flex-direction属性决定主轴的方向,主轴为垂直方向，起点在上沿
  flex-direction: column;
  align-items: center;

  .content {
    margin-top: 91px;
    min-height: 1000px;
    width: 80%;
    // background-color: antiquewhite;
  }
}
</style>
