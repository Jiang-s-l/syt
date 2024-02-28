<template>
  <el-carousel trigger="click" height="300px">
    <el-carousel-item v-for="item in 3" :key="item">
      <img src="@/assets/images/web-banner-1.png" alt="轮播图" />
    </el-carousel-item>
  </el-carousel>
</template>

<script lang="ts">
  export default {
    name: 'Carousel',
  }
</script>

<script setup lang="ts"></script>

<style scoped>
img{
    width: 100%;
    height: 300px;
}

.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
