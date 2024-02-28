<template>
  <div>
    <!-- 展示就诊人管理的结构 -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span class="title">{{ title }}</span>
          <el-button
            type="primary"
            :icon="User"
            @click="addPatient"
            v-if="scene === 1"
            >添加就诊人</el-button
          >
        </div>
      </template>
      <!-- 展示就诊人结构 -->
      <div class="user" v-if="scene === 1">
        <Visitor
          v-for="patient in patientList"
          :key="patient.id"
          class="user_item"
          :patient="patient"
          :buttonType="2"
          @changeScene="changeScene"
          @getPatientList="getPatientList"
        ></Visitor>
      </div>
      <!-- 添加就诊人|修改已有就诊人信息的结构 -->
      <div class="form" v-else>
        <AddOrEditPation
          @changeSceneAndGetPatients="changeSceneAndGetPatients"
          :currentPatientId="currentPatientId"
          :patientList="patientList"
        ></AddOrEditPation>
      </div>
      <div></div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reqGetPatients } from "@/api/hospital";
import { PatientList, ResPatientData } from "@/api/hospital/type";
import { User } from "@element-plus/icons-vue";
import { computed, onMounted, ref } from "vue";
import AddOrEditPation from "./addOrEditPation.vue";
import { useRoute, useRouter } from "vue-router";

/* let $route = useRoute()
let $router = useRouter() */
// 存储所有就诊人信息
let patientList = ref<PatientList>([]);
// 存储当前选择就诊人的id
let currentPatientId = ref<number>(-1);
/* // 存储当前预约挂号医生id
let scheduleId = $route.query.docId as string
// 存储当前预约挂号医生信息
let doctorInfo = ref<Doctor>()

// 存储获取的订单id
let orderId:number */

// 切换场景：1:展示就诊人信息；2：添加就诊人信息；3：编辑就诊人信息
let scene = ref<number>(1);
let $route = useRoute();
let $router = useRouter();

onMounted(() => {
  getPatientList();
  goEditOrAddPatient();

});

// 标题显示
let title = computed(() => {
  if (scene.value === 1) {
    return "就诊人信息";
  } else if (scene.value === 2) {
    return "添加就诊人信息";
  } else if (scene.value === 3) {
    return "编辑就诊人信息";
  }
});

// 获取就诊人信息
const getPatientList = async () => {
  let result: ResPatientData = await reqGetPatients();
  if (result.code === 200) {
    patientList.value = result.data;
  }
  // console.log("全部就诊人信息",patientList.value)
};

// 点击添加就诊人按钮回调方法
const addPatient = () => {
  scene.value = 2;
};

// 点击就诊人卡片的编辑按钮回调方法
const changeScene = (id: number) => {
  scene.value = 3;
  currentPatientId.value = id;
};

// 查询所有就诊人切换场景到就诊人卡片展示页面
const changeSceneAndGetPatients = () => {
  // console.log("使用了此方法")
  //提交按钮的时候判断是不是从预约挂号而来
  if ($route.query.type) {
    $router.back();
    getPatientList();
  } else {
    scene.value = 1;
    setTimeout(() => {
      getPatientList();
    }, 500);
  }
};

// 从预约挂号跳转过来，进入 编辑|添加 就诊人信息页面
const goEditOrAddPatient = () => {
  if ($route.query.type === "edit") {
    changeScene($route.query.id as unknown as number);
  }else if($route.query.type === "add"){
    scene.value = 2
  }else return
};
</script>

<script lang="ts">
export default {
  name: "Patient",
};
</script>

<style scoped lang="scss">
.box-card {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      color: #7f7f7f;
      font-weight: 900;
      font-size: 30px;
    }
  }

  .user {
    display: flex;
    flex-wrap: wrap;

    .user_item {
      width: 32%;
      margin: 15px 5px;
    }
  }
}
</style>
