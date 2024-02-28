<template>
  <div class="region">
    <div class="left">地区：</div>
    <ul class="content">
      <li :class="{ active:regionActiveFLag == ''}" @click="changeRegion('')">全部</li>
      <li v-for="item in hospitalRegionList" :class="{ active:regionActiveFLag == item.value}" key="item.id" @click="changeRegion(item.value)">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { reqHospitalLevelAndRegion } from "@/api/home";
import {
  HospitalLAndRtResData,
  HospitalLevelAndRegionList,
} from "@/api/home/type";
import { onMounted, ref } from "vue";

// 存储所有医院区域信息
let hospitalRegionList = ref<HospitalLevelAndRegionList>([]);

onMounted(() => {
  getHospitalRegionList();
});

// 获取北京医院所有区域信息
const getHospitalRegionList = async () => {
  let result: HospitalLAndRtResData = await reqHospitalLevelAndRegion("beijin");
  // console.log("获取到的医院区域信息", result);
  if (result.code === 200) {
    hospitalRegionList.value = result.data;
  }
};

// 自定义事件，语法糖
const emit= defineEmits(['getRegion'])
// 存储医院区域高亮响应式数据
let regionActiveFLag = ref<string>('');
// 所选医院区域改变时
const changeRegion = (regionCode: string) => {
    regionActiveFLag.value = regionCode
    //触发自定义事件:将医院区域编码参数回传给父组件
    emit('getRegion',regionCode);
}
</script>

<script lang="ts">
export default {
  name: "Region",
};
</script>

<style scoped lang="scss">
.region {
  color: #7f7f7f;
  display: flex;

  .left {
    // 文本内的换行无效
    white-space: nowrap;
  }

  .content {
    display: flex;
    flex-wrap: wrap;

    li {
      margin-right: 20px;
      margin-bottom: 10px;

      &.active {
        color: rgb(0, 174, 255);
      }
    }

    :hover {
      color: rgb(0, 174, 255);
      // 设置光标的类型,在鼠标指针悬停在元素上时显示小手
      cursor: pointer;
    }
  }
}
</style>
