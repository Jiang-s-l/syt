<template>
    <div class="wrap">
        <!-- 顶部结构 -->
        <div class="top">
            <div class="hosname">{{ baseMap?.hosname }}</div>
            <div class="line">|</div>
            <div>{{ baseMap?.bigname }}</div>
            <div class="dot">.</div>
            <div class="hosdepartment">{{ baseMap?.depname }}</div>
        </div>
        <!-- 挂号内容结构 -->
        <div class="content">
            <h1 class="time">{{ baseMap?.workDateString }}</h1>
            <!-- 挂号时间和是否有号 -->
            <div class="info">
                <div class="item"
                    :class="{ nobooking: item.status === -1 || item.availableNumber === -1, cur: item.workDate == curBookingInfo?.workDate }"
                    v-for="(item, index) in bookingRuleList" :key="index" @click="getFirstScheduleDoctorList(item)">
                    <div class="time-top">{{ item.workDate }} {{ item.dayOfWeek }}</div>
                    <div class="bottom">{{ isHaveBooking(item) }}</div>
                </div>
            </div>
            <el-pagination layout="prev, pager, next" :total="total" @current-change="handleCurrentChange" />
        </div>
        <!-- 底部展示相应医生结构 -->
        <div class="doctor-bottom">
            <!-- 展示即将放号时间 -->
            <div class="will" v-if="curBookingInfo?.status === 1">
                <span class="bottom-time">2323年3月3日放号</span>
            </div>
            <!-- 展示医生结构，上午、下午 -->
            <div class="doctor" v-else>
                <div class="morning">
                    <div class="tip">
                        <svg t="1705127697999" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="4589" width="32" height="32">
                            <path
                                d="M904.101037 676.946871H118.670712c-15.461511 0-28.105271-12.535384-28.105271-28.033021 0-15.461511 12.643759-28.105271 28.105271-28.10527h785.430325c15.461511 0 28.105271 12.643759 28.105271 28.10527s-12.607634 28.033021-28.105271 28.033021z m-56.029916-324.980738c-11.018133 10.945883-28.719396 10.945883-39.665279 0-11.018133-10.945883-11.018133-28.755521 0-39.665279l39.665279-39.665279a27.97522 27.97522 0 0 1 39.593029 0 27.93187 27.93187 0 0 1 0 39.665279l-39.593029 39.665279z m-62.279545 212.776406c-26.082269-128.027094-138.683977-224.444789-274.441826-224.44479-135.649474 0-248.287307 96.417696-274.369576 224.44479H177.915755c21.602766-158.263741 162.454244-280.583081 333.433995-280.583081 171.088125 0 311.903478 122.31934 333.506244 280.583081h-59.064418z m-274.441826-336.612997c-15.461511 0-28.033021-12.535384-28.033021-28.10527V143.95823c0-15.461511 12.535384-28.105271 28.033021-28.10527 15.569886 0 28.105271 12.643759 28.10527 28.10527v56.029916c0 15.606011-12.535384 28.141396-28.10527 28.141396zM174.700628 351.966133L135.035349 312.264729c-10.945883-10.945883-10.945883-28.755521 0-39.665279 11.018133-10.945883 28.719396-10.945883 39.665279 0l39.665279 39.665279a27.93187 27.93187 0 0 1 0 39.665279c-10.909758 10.982008-28.647146 10.982008-39.665279 0.036125z m-28.033021 381.119029h729.40041c15.497636 0 28.033021 12.535384 28.03302 28.03302a28.033021 28.033021 0 0 1-28.03302 28.033021H146.667607c-15.497636 0-28.033021-12.535384-28.03302-28.033021 0.036125-15.497636 12.571509-28.033021 28.03302-28.03302z m84.171312 112.168207h561.093911c15.497636 0 28.033021 12.535384 28.033021 28.033021 0 15.569886-12.535384 28.105271-28.033021 28.10527H230.838919c-15.497636 0-28.033021-12.535384-28.03302-28.10527 0-15.497636 12.535384-28.033021 28.03302-28.033021z"
                                fill="#1296db" p-id="4590"></path>
                        </svg>
                        <span class="text">上午号源</span>
                    </div>
                    <!-- 医生的信息 -->
                    <div class="doc-info" v-for="doctor in morningDoctist" :key="doctor.id"
                        v-show="morningDoctist.length > 0">
                        <!-- 展示医生职位、名字、擅长 -->
                        <div class="left">
                            <div class="doc-intro">
                                <span>{{ doctor?.title }}</span>
                                <span>|</span>
                                <span>{{ doctor?.docname }}</span>
                            </div>
                            <div class="skill">{{ doctor?.skill }}</div>
                        </div>
                        <!-- 展示挂号钱数 -->
                        <div class="right">
                            <div class="money">￥{{ doctor.amount }}</div>
                            <el-button type="primary" @click="goStep2(doctor)">剩余{{ doctor?.availableNumber }}</el-button>
                        </div>
                    </div>
                </div>
                <div class="afternoon">
                    <div class="tip">
                        <svg t="1705129422525" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="6609" width="32" height="32">
                            <path
                                d="M473.386667 241.984a27.861333 27.861333 0 0 1-30.08-25.429333l-4.693334-56.128a27.861333 27.861333 0 0 1 55.488-4.693334l4.714667 56.149334c1.28 15.338667-10.090667 28.8-25.408 30.08zM666.752 273.557333a27.84 27.84 0 0 1-1.493333-39.36l38.314666-41.322666a27.84 27.84 0 0 1 40.832 37.866666L706.133333 272.064c-10.453333 11.285333-28.074667 11.946667-39.36 1.493333zM773.034667 415.786667a27.861333 27.861333 0 0 1 27.690666-28.010667l56.32-0.362667a27.84 27.84 0 1 1 0.362667 55.701334l-56.32 0.362666a27.861333 27.861333 0 0 1-28.053333-27.669333zM764.245333 616.810667a27.861333 27.861333 0 0 1 37.504-12.053334l50.133334 25.728a27.861333 27.861333 0 0 1-25.450667 49.557334l-50.133333-25.728a27.861333 27.861333 0 0 1-12.053334-37.504zM662.250667 729.6a27.861333 27.861333 0 0 1 36.970666 13.589333l23.68 51.136a27.861333 27.861333 0 1 1-50.56 23.381334l-23.68-51.136a27.861333 27.861333 0 0 1 13.589334-36.970667zM308.544 337.28c9.024-12.458667 6.229333-29.866667-6.250667-38.890667l-45.653333-33.024a27.861333 27.861333 0 0 0-32.64 45.141334l45.653333 33.024c12.458667 9.002667 29.866667 6.208 38.890667-6.250667zM263.509333 513.024a27.861333 27.861333 0 0 0-30.357333-25.109333l-56.106667 5.333333a27.84 27.84 0 1 0 5.290667 55.466667l56.064-5.333334a27.84 27.84 0 0 0 25.109333-30.357333zM318.677333 677.269333a27.861333 27.861333 0 0 0-38.506666-8.213333L232.896 699.733333a27.861333 27.861333 0 0 0 30.293333 46.72l47.274667-30.634666c12.906667-8.362667 16.597333-25.6 8.213333-38.506667zM480.064 760.234667a27.84 27.84 0 0 0-33.237333 21.12l-12.245334 54.997333a27.84 27.84 0 1 0 54.357334 12.096l12.245333-54.976a27.84 27.84 0 0 0-21.12-33.237333zM756.842667 499.2c0 130.773333-105.984 236.736-236.714667 236.736-130.752 0-236.736-105.984-236.736-236.714667 0-130.752 105.984-236.736 236.736-236.736 130.730667 0 236.714667 105.984 236.714667 236.736z m-236.714667 194.069333a194.069333 194.069333 0 1 0 0-388.117333 194.069333 194.069333 0 0 0 0 388.117333z"
                                fill="#1296db" p-id="6610"></path>
                        </svg>
                        <span class="text">下午号源</span>
                    </div>
                    <!-- 医生的信息 -->
                    <div class="doc-info" v-for="doctor in afternoonDoctist" :key="doctor.id"
                        v-show="afternoonDoctist.length > 0">
                        <!-- 展示医生职位、名字、擅长 -->
                        <div class="left">
                            <div class="doc-intro">
                                <span>{{ doctor?.title }}</span>
                                <span>|</span>
                                <span>{{ doctor?.docname }}</span>
                            </div>
                            <div class="skill">{{ doctor?.skill }}</div>
                        </div>
                        <!-- 展示挂号钱数 -->
                        <div class="right">
                            <div class="money">￥{{ doctor.amount }}</div>
                            <el-button type="primary" @click="goStep2(doctor)">剩余{{ doctor?.availableNumber }}</el-button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { reqBookingScheduleRule, reqDoctorScheduleList } from '@/api/hospital';
import { BaseMap, BookingScheduleList, Doctor, DoctorList } from '@/api/hospital/type';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// 分页器当前页面
let page = ref<number>(1)
// 分页器一页展示几条数据
let limit = ref<number>(6)
// 科室预约数据总数
let total = ref<number>(0)
// 存储医院挂号数据
let bookingRuleList = ref<BookingScheduleList[]>([])
// 存储医院基本信息
let baseMap = ref<BaseMap>()

// 判断预约挂号信息是否有号
let isHaveBooking = computed(() => (bookingInfo: BookingScheduleList) => {
    if (bookingInfo.status === -1)
        return "停止挂号"
    else if (bookingInfo.status === 0) {
        if (bookingInfo.availableNumber === -1) {
            return "约满了，无号"
        } else {
            return `有号（${bookingInfo.docCount}）`
        }
    } else if (bookingInfo.status === 1)
        return "即将放号"
})

let $route = useRoute()
let $router = useRouter()
// 医院编号
let hoscode = <string>$route.query.hoscode;
// 科室编号
let depcode = <string>$route.query.depcode
// console.log("获取路由携带的参数",$route.query)
// 当前预约挂号信息时间
let curBookingInfo = ref<BookingScheduleList>()
// 预约挂号医生数据
let doctorList = ref<DoctorList>([])
// 上午预约挂号医生数据
let morningDoctist = computed(() => {
    return doctorList.value.filter((doc: Doctor) => {
        return doc.workTime === 0 //过滤并返回上午的医生信息
    })
})
// 下午的医生信息
let afternoonDoctist = computed(() => {
    return doctorList.value.filter((doc: Doctor) => {
        return doc.workTime === 1 //过滤并返回下午的医生信息
    })
})

onMounted(() => {
    getBookingData()
})

// 获取预约挂号数据
const getBookingData = async () => {
    let result = await reqBookingScheduleRule(page.value, limit.value, hoscode, depcode)
    // console.log("预约挂号信息", result)
    let { code, data } = result
    if (code === 200) {
        total.value = data.total
        bookingRuleList.value = data.bookingScheduleList
        baseMap.value = data.baseMap

        // 获取第一个预约挂号信息时间
        curBookingInfo.value = data.bookingScheduleList[0]
        getFirstScheduleDoctorList(curBookingInfo.value);
    }

}

// 获取某一天预约挂号医生信息
const getFirstScheduleDoctorList = async (bookingInfo: BookingScheduleList) => {
    if (bookingInfo.status === 0 && bookingInfo.availableNumber !== -1) {
        curBookingInfo.value = bookingInfo;
        let firstTime = bookingInfo.workDate
        let result = await reqDoctorScheduleList(hoscode, depcode, firstTime)
        // console.log("获取医生信息", result)
        if (result.code === 200) {
            doctorList.value = result.data
        }
    } else {
        curBookingInfo.value = bookingInfo;
        doctorList.value = []

    }
}

// 分页器当前页数发生改变
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
    page.value = val;
    getBookingData()
}

// 点击剩余的挂号数，跳转到第二步页面(选择就诊人页面)
const goStep2 = (doctor:Doctor)=>{
    $router.push({
        path:'/hospital/register_step2',
        query:{docId:doctor.id,hoscode:doctor.hoscode}
    })
}
</script>

<script lang="ts">
export default {
    name: "RegisterDetail",
};
</script>

<style scoped lang="scss">
.wrap {
    .top {
        display: flex;
        flex-direction: row;
        color: #7f7f7f;

        .line {
            margin: 0 10px;
        }

        .dot {
            margin: 0 5px;
        }
    }

    .content {
        margin: 20px 0;
        display: flex;
        flex-direction: column;
        align-items: center;

        .time {
            font-weight: 900;
        }

        .info {
            width: 100%;
            display: flex;
            margin: 50px 0 30px 0;
            cursor: pointer;

            .item {
                flex: 1;
                border: 1px solid #8bc9e8;
                margin: 0 10px;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                transition: all 0.5s;

                &.cur {
                    transform: scale(1.08);
                }

                &.nobooking {
                    border: 1px solid #ccc;

                    .time-top {
                        background: #ccc;
                    }
                }

                .time-top {
                    width: 100%;
                    background: #8bc9e8;
                    text-align: center;
                    line-height: 30px;
                }

                .bottom {
                    width: 100%;
                    text-align: center;
                    line-height: 60px;
                }
            }
        }

    }

    .doctor-bottom {
        .will {
            text-align: center;
            font-size: 30px;
            font-weight: 900;

            .bottom-time {
                color: red;
            }
        }

        .doctor {

            .morning,
            .afternoon {
                margin-bottom: 40px;

                .tip {
                    display: flex;
                    align-items: center;

                    .text {
                        color: rgb(89, 168, 224);
                    }
                }

                .doc-info {
                    display: flex;
                    justify-content: space-between;
                    margin: 10px 0;
                    border-bottom: 1px solid #ccc;

                    .left {
                        .doc-intro {
                            color: rgb(98, 133, 246);
                            margin: 10px 0;

                            span {
                                margin: 0 5px;
                                font-size: 20px;
                                font-weight: 400;
                            }
                        }

                        .skill {
                            margin: 20px 0;
                            color: #7f7f7f;
                        }
                    }

                    .right {
                        width: 150px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .money {
                            color: #7f7f7f;
                            font-size: 900;
                        }
                    }
                }
            }
        }
    }
}
</style>