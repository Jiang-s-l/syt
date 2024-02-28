<template>
  <div class="search">
    <el-autocomplete
      style="width: 60%; margin-right: 10px"
      v-model="hosname"
      :fetch-suggestions="querySearch"
      :trigger-on-focus="false"
      clearable
      class="inline-input w-100"
      placeholder="请输入医院名称"
      @select="handleSelect"
    />
    <el-button type="primary" :icon="Search">搜 索</el-button>
  </div>
</template>

<script setup lang="ts">
import { reqHospitalInfoByName } from "@/api/home";
import { HospitalInfoByName } from "@/api/home/type";
import { Search } from "@element-plus/icons-vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

let $router = useRouter();

// 存储输入框中输入的医院名称
const hosname = ref("");

// 用户输入完关键字，执行此函数，获取医院相关信息
const querySearch = async (hosname: string, cb: any) => {
  let result: HospitalInfoByName = await reqHospitalInfoByName(hosname);
  // 整理数据，展示的名称数组中对象的变量名必为value
  let showData = result.data.map((item) => {
    return {
      value: item.hosname, //展示医院的名字
      hoscode: item.hoscode, //存储医院的编码
    };
  });
  // console.log("展示的名称",showData)
  // 给组件提供展示的数据
  cb(showData);
};

// 选中某一医院名称
const handleSelect = (item: any) => {
  // 点击医院名称,跳转到此医院详情页面
  $router.push({path:"/hospital/register",query:{hoscode:item.hoscode}})

  // console.log(item, item.value, item.hoscode);
};
</script>

<script lang="ts">
export default {
  name: "Search",
};
</script>

<style scoped>
.search {
  /* background-color: aqua; */
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
}
</style>
