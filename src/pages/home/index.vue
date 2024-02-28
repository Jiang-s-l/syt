<template>
  <div>
    <!-- 首页轮播图图片 -->
    <Carousel />
    <!-- 首页搜索医院的表单区域  -->
    <Search></Search>
    <!-- 底部展示医院的结构 -->
    <el-row :gutter="20">
      <el-col :span="20">
        <!-- 医院的等级 -->
        <Level @getLevel="getLevel"/>
        <!-- 医院的区域 -->
        <Region @getRegion="getRegion" />
        <!-- 医院的信息卡片 -->
        <div class="hospital-card" v-loading="loading">
          <Card
            :hospitalInfo="hospital"
            class="item"
            v-for="hospital in hospitalList"
            :key="hospital.id"
          >
          </Card>
        </div>
        <div class="hospital-empty" v-show="hospitalList.length<=0 && !loading" >
          <el-empty description="暂无数据" />
        </div>
        <!-- 分页器 -->
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          background
          small
          :page-sizes="[10, 20, 30, 40]"
          layout="prev, pager, next, jumper,->,  sizes, total"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-col>
      <el-col :span="4"> 
      <Tip></Tip> 
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
export default {
  name: "Home",
};
</script>

<script setup lang="ts">
import Carousel from "./carousel/index.vue";
import Search from "./search/index.vue";
import Level from "./level/index.vue";
import Region from "./region/index.vue";
import Card from "./card/index.vue";
import Tip from "./tip/index.vue";

import { ref, onMounted } from "vue";
import { reqHospital } from "@/api/home/index.ts";
import { Content, HospitalResponseData } from "@/api/home/type";


// 分页器当前页码数
let currentPage = ref<number>(1);
// 分页器一页展示几条数据
let pageSize = ref<number>(10);
// 存储医院总个数
let total = ref<number>(0);
// 存储已有医院的数据
let hospitalList = ref<Content>([]);
// 医院信息改变时，使用loading
let loading = ref(false);
// 存储医院的等级相应数据
let hostype = ref<string>("");
// 存储医院的区域相应数据
let districtCode = ref<string>("");

onMounted(() => {
  // 获取首页医院信息
  getHospitalInfo();
  
});

// 获取首页医院信息
const getHospitalInfo = async () => {
  hospitalList.value = [];
  loading.value = true;
  // 获取医院的数据
  let result: HospitalResponseData = await reqHospital(
    currentPage.value,
    pageSize.value,
    hostype.value,
    districtCode.value
  );
  // console.log("返回的医院所有数据",result)
  if (result.code === 200) {
    loading.value = false;
    let { content, totalElements } = result.data;
    // 存储医院已有数据
    hospitalList.value = content;
    // 存储医院总个数
    total.value = totalElements;
  }
};

// 当前页码改变时，展示医院数据
const handleCurrentChange = (val: number) => {
  // console.log(`current page: ${val}`);
  currentPage.value = val;
  getHospitalInfo();
};
// 当前一页展示几条数据改变时，展示医院数据
const handleSizeChange = (val: number) => {
  // console.log(`${val} items per page`);
  pageSize.value = val;
  currentPage.value = 1;
  getHospitalInfo();
};

// 筛选不同等级的医院信息
const getLevel = (level:string)=>{
  // console.log("子组件向父组件传递的等级值",level)
  hostype.value = level;
  getHospitalInfo()
}

// 筛选不同区域的医院信息
const getRegion = (regionCode:string)=>{
  // console.log("子组件向父组件传递的区域编码值",regionCode)
  districtCode.value = regionCode;
  getHospitalInfo()
}




</script>

<style scoped lang="scss">
.hospital-card {
  width: 100%;
  min-height: 100px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  justify-content: space-between;

  .item {
    width: 48%;
    margin: 10px 0px;
  }
}

.hospital-empty{
  width: 100%;
  min-height: 100px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  color: rgb(187, 180, 180);
}
</style>
