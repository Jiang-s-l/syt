<template>
    <div>
        <!-- 展示支付详情的结构 -->
        <el-card class="box-card">
            <template #header>
                <div class="card-header">挂号详情</div>
            </template>
            <!-- 展示身体部分顶部结构 -->
            <div class="top">
                <el-tag class="ml-2" type="success">
                    <div class="tag">
                        <el-icon>
                            <Check />
                        </el-icon>
                        <span>{{ orderInfo?.param.orderStatusString }}</span>
                    </div>
                </el-tag>
                <div class="right-info">
                    <img src="../../../../assets/images/code_app.png" />
                    <div>
                        <p>微信关注“北京114预约挂号”</p>
                        <p>“快速预约挂号”</p>
                    </div>
                </div>
            </div>
            <el-divider />
            <!-- 订单详情底部的结构 -->
            <div class="bottom">
                <div class="left">
                    <el-descriptions class="margin-top" :column="1" size="default" border>
                        <el-descriptions-item>
                            <template #label> 就诊人信息 </template>
                            {{ orderInfo?.patientName }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label> 就诊日期 </template>
                            {{ orderInfo?.reserveDate }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label> 就诊医院 </template>
                            {{ orderInfo?.hosname }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label> 就诊科室 </template>
                            {{ orderInfo?.depname }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label> 医生职称 </template>
                            {{ orderInfo?.title }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label> 医事服务费 </template>
                            <span style="color: red;">{{ orderInfo?.amount }}元</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label> 挂号单号 </template>
                            {{ orderInfo?.outTradeNo }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label> 挂号时间 </template>
                            {{ orderInfo?.createTime }}
                        </el-descriptions-item>
                    </el-descriptions>
                    <div class="button" v-if="orderInfo?.orderStatus !== -1">
                        <el-popconfirm title="确定取消预约吗？" @confirm="confirmEvent">
                            <template #reference>
                                <el-button>取消预约</el-button>
                            </template>
                        </el-popconfirm>
                        <el-button type="primary" v-if="orderInfo?.orderStatus === 0" @click="handlePay">支付</el-button>
                    </div>
                </div>
                <div class="right">
                    <el-card>
                        <template #header>
                            <div>注意事项</div>
                        </template>
                        <p>1.请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；</p>
                        <p style="color: red">
                            2.【取号】就诊当天需在{{ orderInfo?.fetchTime }}前
                            在医院取号，未取号视为爽约，该号不退不换；
                        </p>
                        <p>
                            3.【退号】在{{ orderInfo?.quitTime }}前可在线退号 ，逾期将不可办理退号退费；
                        </p>
                        <p>
                            4.北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号；
                        </p>
                        <p>5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。</p>
                    </el-card>
                </div>
            </div>
        </el-card>
        <!-- 展示支付二维码弹窗的结构 -->
        <el-dialog v-model="dialogVisible" title="微信支付" width="30%" :before-close="handleClose">
            <el-divider />
            <div class="qrcode">
                <img :src="qrcodeImageUrl" alt="支付二维码">
                <p>请使用微信扫一扫</p>
                <p>扫描二维码支付</p>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-divider />
                    <el-button @click="handleClose">关闭窗口</el-button>
                    <!-- <el-button type="primary" @click="dialogVisible = false">
                        Confirm
                    </el-button> -->
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { reqCancelOrder, reqGetOrderInfo, reqGetQrcode, reqQueryPayState } from "@/api/member";
import { OrderInfo, ResOrderInfo, ResPayResult, ResQrcodeData } from "@/api/member/type";
import { Check } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
// @ts-ignore
import QRCode from 'qrcode'

let $route = useRoute()
// 存储订单信息
let orderInfo = ref<OrderInfo>()
// 支付二维码是否显示
let dialogVisible = ref<boolean>(false)
// 定义存储支付二维码图片路径
let qrcodeImageUrl = ref('')
// 定义定时器
let timer:any;

onMounted(() => {
    getOrderInfo()
})

// 获取订单详情
const getOrderInfo = async () => {
    let result: ResOrderInfo = await reqGetOrderInfo($route.query.id as unknown as number)
    // console.log("订单信息", result)
    if (result.code === 200) {
        orderInfo.value = result.data
    }
}

// 取消预约订单弹窗确定按钮事件 订单三种状态：-1：取消预约；0：预约未支付；1：预约支付成功
const confirmEvent = async () => {
    let result: ResOrderInfo = await reqCancelOrder(orderInfo.value?.id as number)
    if (result.code === 200) {
        ElMessage.success("取消预约成功")
        getOrderInfo()
    } else {
        ElMessage.error('取消预约失败')
    }
}

// 点击支付按钮事件
const handlePay = () => {
    dialogVisible.value = true
    getQrcodeImage()
    // 每隔几秒询问服务器当前支付结果
    queryPayResult()
}

// 获取支付二维码图片
const getQrcodeImage = async () => {
    let result: ResQrcodeData = await reqGetQrcode(orderInfo.value?.id as number)
    console.log("获取支付图片信息", result)
    if (result.code === 200) {
        //将获取到的url生成二维码图片url
        qrcodeImageUrl.value = await QRCode.toDataURL(result.data.codeUrl)
    }

}

// 每隔几秒询问服务器当前支付结果
const queryPayResult = () => {
    timer = setInterval(async () => {
        let result:ResPayResult = await reqQueryPayState(orderInfo.value?.id as number)
        console.log("当前支付结果", result)
        if(result.code === 200){
            if(result.data){//为true：支付成功
                dialogVisible.value = false
                ElMessage.success('支付成功')
                clearInterval(timer)
                getOrderInfo()
            }
        }
    }, 2000)
}

// 支付对话框关闭事件
const handleClose = () => {
    dialogVisible.value = false
    clearInterval(timer)
}
</script>

<script lang="ts">
export default {
    name: "OrderDetail",
};
</script>

<style scoped lang="scss">
.box-card {
    .card-header {
        color: #7f7f7f;
        font-weight: 900;
        font-size: 30px;
    }

    .top {
        display: flex;
        justify-content: space-between;

        .tag {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .right-info {
            display: flex;
            justify-content: space-between;
            align-items: center;

            img {
                width: 40px;
                height: 40px;
            }

            p {
                font-size: 12px;
                line-height: 20px;
                margin-left: 5px;
            }
        }
    }

    .bottom {
        display: flex;

        .left {
            flex: 4.5;
            margin-right: 40px;

            .button {
                margin-top: 10px;
            }
        }

        .right {
            flex: 5.5;

            p {
                font-size: 14px;
                line-height: 30px;
                margin-bottom: 5px;
            }
        }
    }
}

.qrcode {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 70%;
        height: 70%;
    }

    p {
        font-size: 25px;
        line-height: 30px;
    }
}
</style>
