<template>
    <div class="container">
        <h1 class="tip">确认挂号信息</h1>
        <!-- 展示就诊人信息 -->
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>请选择就诊人</span>
                    <el-button class="button" type="primary" :icon="User" @click="goAddPatient">添加就诊人</el-button>
                </div>
            </template>
            <div class="user">
                <Visitor @click="getCurrentPatientId(patient)" v-for="patient in patientList" :key="patient.id"
                    class="user_item" :patient="patient" :currentPatientId="currentPatientId" :buttonType = "1"></Visitor>
            </div>
        </el-card>
        <!-- 展示医生信息 -->
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>挂号信息</span>
                </div>
            </template>
            <!-- 卡片身体部分展示医生信息 -->
            <el-descriptions :column="2" border>
                <el-descriptions-item>
                    <template #label>
                        <div>
                            就诊日期：
                        </div>
                    </template>
                    {{ doctorInfo?.workDate }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div>
                            就诊医院：
                        </div>
                    </template>
                    {{ doctorInfo?.param.hosname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div>
                            就诊科室：
                        </div>
                    </template>
                    {{ doctorInfo?.param.depname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div>
                            医生姓名：
                        </div>
                    </template>
                    {{ doctorInfo?.docname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div>
                            医生职称：
                        </div>
                    </template>
                    {{ doctorInfo?.title }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div>
                            医生专长：
                        </div>
                    </template>
                    {{ doctorInfo?.skill }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div>
                            医事服务费：
                        </div>
                    </template>
                    <span style="color: red;">{{ doctorInfo?.amount }}</span>
                </el-descriptions-item>
            </el-descriptions>
        </el-card>
        <!-- 确认挂号按钮 -->
        <div class="check">
            <el-button type="primary" :disabled="currentPatientId === -1" @click="checkBooking">确认挂号</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { User } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import { reqGetDoctorScheduleById, reqGetPatients } from '@/api/hospital';
import { Doctor, Patient, PatientList, ResDoctorData, ResPatientData } from '@/api/hospital/type';
import { useRoute, useRouter } from 'vue-router';
import { reqCreateOrder } from '@/api/member';
import { ResCreateOrder } from '@/api/member/type';

let $route = useRoute()
let $router = useRouter()
// 存储所有就诊人信息
let patientList = ref<PatientList>([])
// 存储当前预约挂号医生id
let scheduleId = $route.query.docId as string
// 存储当前预约挂号医生信息
let doctorInfo = ref<Doctor>()
// 存储当前选择就诊人的id
let currentPatientId = ref<number>(-1)
// 存储获取的订单id
let orderId:number

onMounted(() => {
    getPatientList()
    getDoctorInfoById()
})

// 获取就诊人信息
const getPatientList = async () => {
    let result: ResPatientData = await reqGetPatients()
    if (result.code === 200) {
        patientList.value = result.data
    }
}

// 根据医生id获取预约医生信息
const getDoctorInfoById = async () => {
    let result: ResDoctorData = await reqGetDoctorScheduleById(scheduleId)
    if (result.code === 200) {
        doctorInfo.value = result.data
    }
}

// 获取当前选中的就诊人id
const getCurrentPatientId = (patient: Patient) => {
    currentPatientId.value = patient.id
}

// 点击确认挂号按钮
const checkBooking = () => {
    getOrderId();
}

const getOrderId = async () => {
    let { hoscode } = <Doctor>doctorInfo.value;
    let patientId = currentPatientId.value
    let orderData = { hoscode, scheduleId, patientId }
    let result:ResCreateOrder = await reqCreateOrder(orderData)
    console.log("获取的订单id", result)
    if(result.code === 200){
        orderId = result.data;
        $router.push({path:'/member/order',query:{id:orderId}})
    }
}

// 点击添加就诊人按钮，跳转到添加就诊人页面
const goAddPatient = ()=>{
    $router.push({
        path:"/member/patient",
        query:{type:'add'}
    })
}
</script>

<script lang="ts">
export default {
    name: "RegisterStep2",
};
</script>

<style scoped lang="scss">
.container {
    .tip {
        font-weight: 900;
        font-size: 20px;
    }



    .box-card {
        margin: 20px 0;

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
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

    .check {
        display: flex;
        justify-content: center;
        margin: 10px 0;
    }
}
</style>