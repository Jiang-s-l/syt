<template>
    <div class="visitor">
        <el-card class="box-card" shadow="always">
            <template #header>
                <div class="card-header">
                    <div>
                        <span class="tip">{{ patient?.isInsure == 0 ? '医保' : '自费' }}</span>
                        <span>{{ patient?.name }}</span>
                    </div>
                    <el-button type="primary" :icon="Edit" circle></el-button>
                </div>
            </template>
            <div class="content">
                <p class="text">证件类型：{{ patient?.param.certificatesTypeString }}</p>
                <p class="text">证件号码：{{ patient?.certificatesNo }}</p>
                <p class="text">用户性别：{{ patient?.sex == 0 ? '女' : '男' }}</p>
                <p class="text">出生日期：{{ patient?.birthdate }}</p>
                <p class="text">手机号码：{{ patient?.phone }}</p>
                <p class="text">婚姻状况：{{ patient?.isMarry === 0 ? '未婚' : '已婚' }}</p>
                <p class="text">当前住址：{{ patient?.address }}</p>
                <p class="text">详细地址：{{ patient?.param.fullAddress }}</p>
                <!-- 红色的已选择的盒子 -->
                <transition name="confirm">
                    <div class="confirm" v-if="currentPatientId === patient?.id">已选择</div>
                </transition>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue'

// 接收父组件传递就诊人信息
defineProps(['patient', 'currentPatientId'])

</script>

<script lang="ts">
export default {
    name: "",
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

            .confirm-enter-from{
                // transform: scale(1);
                opacity: 0;
            }
            .confirm-enter-active{
                transition:all 1s ;
            }
            .confirm-enter-to{
                opacity: 0.5;
            }
        }
    }
}
</style>
<style >
.visitor .el-card__header {
    background-color: #ccc;
}
</style>