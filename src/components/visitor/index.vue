<template>
  <div class="visitor">
    <el-card class="box-card" shadow="always">
      <template #header>
        <div class="card-header">
          <div>
            <span class="tip">{{
              patient?.isInsure == 0 ? "医保" : "自费"
            }}</span>
            <span>{{ patient?.name }}</span>
          </div>
          <div>
            <el-button type="primary" :icon="Edit" circle @click="handleEdit(patient)"></el-button>
            <el-button type="danger" :icon="Delete" circle v-show="buttonType == 2" @click="deletePatient(patient)"></el-button>
          </div>
        </div>
      </template>
      <div class="content">
        <p class="text">
          证件类型：{{ patient?.param.certificatesTypeString }}
        </p>
        <p class="text">证件号码：{{ patient?.certificatesNo }}</p>
        <p class="text">用户性别：{{ patient?.sex == 0 ? "女" : "男" }}</p>
        <p class="text">出生日期：{{ patient?.birthdate }}</p>
        <p class="text">手机号码：{{ patient?.phone }}</p>
        <p class="text">
          婚姻状况：{{ patient?.isMarry === 0 ? "未婚" : "已婚" }}
        </p>
        <p class="text">当前住址：{{ patient?.address }}</p>
        <p class="text">详细地址：{{ patient?.param.fullAddress }}</p>
        <!-- 红色的已选择的盒子 -->
        <transition name="confirm">
          <div class="confirm" v-if="currentPatientId === patient?.id">
            已选择
          </div>
        </transition>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Patient } from "@/api/hospital/type";
import { reqDeletePatient } from "@/api/member";
import { Delete, Edit } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

// 接收父组件传递就诊人信息
// buttonType：是否有删除按钮：1：没有；2：有
defineProps(["patient", "currentPatientId","buttonType"]);
let $emit = defineEmits(["changeScene","getPatientList"])
const $router = useRouter()
const $route = useRoute()

onMounted(() => {
  console.log("Visitor组件")
});

const handleEdit = (patient:Patient)=>{
  console.log("点击了编辑按钮")
 //要么是就诊人管理模块点击修改按钮
  //要么预约挂号点击修改按钮
  if ($route.path == "/member/patient") {
    $emit('changeScene',patient.id)
  } else {
    //路由跳转携带参数
    $router.push({ path: "/member/patient", query: { type: "edit", id: patient.id } });
  }
}

// 删除就诊人
const deletePatient = async (patient:Patient)=>{
  try {
    await reqDeletePatient(patient.id)
    ElMessage.success("删除成功")
    $emit('getPatientList')
  } catch (error) {
    ElMessage.error("删除失败")
  }
}
</script>

<script lang="ts">
export default {
  name: "Visitor",
};
</script>

<style scoped lang="scss">
.visitor {
  .box-card {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .tip {
        background-color: white;
        border-radius: 10px;
        font-size: 12px;
        padding: 5px;
        margin-right: 5px;
      }
    }

    .text {
      font-size: 14px;
      margin-bottom: 18px;
    }

    .content {
      position: relative;

      .confirm {
        position: absolute;
        height: 80%;
        width: 80%;
        color: red;
        border-radius: 50%;
        border: 1px red dashed;
        text-align: center;
        line-height: 200px;
        left: 10%;
        top: 10%;
        font-weight: 900;
        font-size: 30px;
        opacity: 0.5;
        transform: rotate(35deg);
      }

      .confirm-enter-from {
        // transform: scale(1);
        opacity: 0;
      }
      .confirm-enter-active {
        transition: all 1s;
      }
      .confirm-enter-to {
        opacity: 0.5;
      }
    }
  }
}
</style>
<style>
.visitor .el-card__header {
  background-color: #ccc;
}
</style>
