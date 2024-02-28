<template>
    <div class="register">
        <div class="top">
            <div class="title">{{ hosname }}</div>
            <div class="level">
                <svg t="1691145717403" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="2260" width="16" height="16">
                    <path
                        d="M881.066667 394.666667c-21.333333-23.466667-51.2-36.266667-81.066667-36.266667H618.666667v-117.333333c0-44.8-29.866667-85.333333-87.466667-117.333334-17.066667-10.666667-38.4-12.8-57.6-8.533333-19.2 4.266667-36.266667 17.066667-46.933333 34.133333-2.133333 2.133333-2.133333 4.266667-4.266667 6.4l-125.866667 281.6H204.8c-59.733333 0-108.8 46.933333-108.8 106.666667v258.133333c0 57.6 49.066667 106.666667 108.8 106.666667h544c53.333333 0 98.133333-38.4 106.666667-89.6l51.2-337.066667c4.266667-34.133333-6.4-64-25.6-87.466666z m-593.066667 448H204.8c-25.6 0-44.8-19.2-44.8-42.666667v-256c0-23.466667 19.2-42.666667 44.8-42.666667h83.2v341.333334z m554.666667-373.333334L789.333333 806.4c-4.266667 21.333333-21.333333 36.266667-42.666666 36.266667H352V471.466667l130.133333-290.133334c2.133333-4.266667 4.266667-4.266667 6.4-4.266666 2.133333 0 4.266667 0 8.533334 2.133333 25.6 14.933333 55.466667 38.4 55.466666 64v149.333333c0 17.066667 14.933333 32 32 32h213.333334c12.8 0 25.6 4.266667 34.133333 14.933334 8.533333 6.4 12.8 19.2 10.666667 29.866666z"
                        fill="#bbbbbb" p-id="2261"></path>
                </svg>
                <span>{{ hosLevel }}</span>
            </div>
        </div>
        <!-- 展示内容区域 -->
        <div class="content">
            <div class="left">
                <img :src="logoData" alt="医院LOGO" />
            </div>
            <div class="right">
                <div>挂号规则</div>
                <div class="time">
                    <span>预约周期：{{ cycle }}</span>
                    <span style="margin: 0 30px">放号时间：{{ releaseTime }}</span>
                    <span>停放时间：{{ stopTime }}</span>
                </div>
                <div class="address">具体位置：{{ fullAddress }}</div>
                <div class="route" style="line-height: 20px">具体路线：{{ route }}</div>
                <div class="quitTime">退号时间：就诊前一工作日{{ quitTime }}前取消</div>
                <div class="ruler">
                    <p>预约挂号规则</p>
                    <div class="ruleInfo" v-for="(item, index) in rules" :key="index">
                        {{ item }}
                    </div>
                </div>
            </div>
        </div>
        <!-- 放置每一个医院的科室数据 -->
        <div class="department">
            <div class="navLeft">
                <ul>
                    <li v-for="(department, index) in hospitalStore.departmentList" :key="department.depcode"
                        :class="{ active: curIndex === index }" @click="handleClick(index)">
                        {{ department.depname }}
                    </li>
                </ul>
            </div>
            <div class="departmentInfo">
                <!-- 用一个div代表:大科室与小科室 -->
                <div class="showDepartment" v-for="(department) in hospitalStore.departmentList"
                    :key="department.depcode">
                    <h1 class="cur">{{ department.depname }}</h1>
                    <ul>
                        <li @click="clickDepartment(item)" v-for="item in department.children" :key="item.depcode">{{ item.depname }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDetailStore } from "@/store/modules/hospitalDetail";
// @ts-ignore
import useUserStore from "@/store/modules/user";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// 获取user仓库数据
// @ts-ignore
const userStore = useUserStore()
// 获取路由器
const $router = useRouter();
// 获取路由对象
const $route = useRoute(); 

let hospitalStore = useDetailStore();
// console.log(hospitalStore);
// 从仓库中获取医院相关信息
// 医院名称
let hosname = computed(() => {
    return hospitalStore.hospitalInfo.hospital?.hosname || "";
});
// 医院等级
let hosLevel = computed(() => {
    return hospitalStore.hospitalInfo.hospital?.param.hostypeString;
});
// 医院Logo
let logoData = computed(() => {
    return `data:image/jpge;base64,${hospitalStore.hospitalInfo.hospital?.logoData}`;
});
// 医院预约周期
let cycle = computed(() => {
    return hospitalStore.hospitalInfo.bookingRule?.cycle;
});
// 医院放号时间
let releaseTime = computed(() => {
    return hospitalStore.hospitalInfo.bookingRule?.releaseTime;
});
// 医院停挂时间
let stopTime = computed(() => {
    return hospitalStore.hospitalInfo.bookingRule?.stopTime;
});
// 医院具体地址
let fullAddress = computed(() => {
    return hospitalStore.hospitalInfo.hospital?.param.fullAddress;
});
// 医院规划路线
let route = computed(() => {
    return hospitalStore.hospitalInfo.hospital?.route;
});
// 医院退号时间
let quitTime = computed(() => {
    return hospitalStore.hospitalInfo.bookingRule?.quitTime;
});
// 医院预约规则
let rules = computed(() => {
    return hospitalStore.hospitalInfo.bookingRule?.rule;
});

//控制科室高亮的响应式数据
let curIndex = ref<number>(0);
// 点击左侧大的科室事件
const handleClick = (index: number) => {
    // console.log(index)
    // 点击科室高亮效果
    curIndex.value = index

    let curDept = document.querySelectorAll('.cur')
    console.log(curDept)
    curDept[index].scrollIntoView({
        behavior:"smooth"
    })

}


// 点击子科室方法
const clickDepartment = (item:any)=>{
    // 展示的登录组件
    // userStore.loginDialogVisible = true
    
    // 点击子科室跳转到挂号页面并携带参数hoscode、depcode
    // console.log($route.query.hoscode,item.depcode)
    let hoscode = $route.query.hoscode;
    let depcode = item.depcode
    $router.push({
        path:'/hospital/register_detail',
        query:{hoscode,depcode}
    })

}

</script>

<script lang="ts">
export default {
    name: "Register",
};
</script>

<style scoped lang="scss">
.register {
    .top {
        display: flex;
        align-items: center;
        margin: 20px 0px;

        .title {
            font-size: 30px;
        }

        .level {
            font-size: 18px;
            color: #7f7f7f;
            display: flex;
            align-items: center;
            margin-left: 20px;
            height: 40px;
        }
    }

    .content {
        display: flex;

        .left {
            width: 80px;

            img {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                border: 1px #7f7f7f solid;
            }
        }

        .right {
            flex: 1;
            margin-left: 20px;

            div:first-child {
                font-size: 25px;
            }

            .time,
            .address,
            .route,
            .quitTime,
            .ruleInfo {
                margin-top: 12px;
                color: #7f7f7f;
            }

            .ruler>p {
                margin-top: 20px;
                font-size: 25px;
            }
        }
    }

    .department {
        display: flex;
        width: 100%;
        height: 500px;
        margin-top: 40px;

        .navLeft {
            width: 100px;
            height: 100%;
            background: rgb(248, 248, 248);

            ul {
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;

                li {
                    cursor: pointer;
                    flex: 1;
                    line-height: 40px;
                    text-align: center;

                    &.active {
                        border-left: 1px solid rgba(255, 0, 89, 0.527);
                        color: rgba(255, 0, 89, 0.527);
                        background: white;
                    }

                }
            }
        }

        .departmentInfo {
            flex: 1;
            margin-left: 20px;
            height: 100%;
            overflow: auto;

            // 浏览器自带导航条消失
            /* &::-webkit-scrollbar {
                display: none;
            } */

            .cur {
                background-color: rgb(248, 248, 248);
                line-height: 40px;
                font-size: 20px;
                color: #7f7f7f;
                padding-left: 10px;
            }

            ul {
                display: flex;
                flex-wrap: wrap;
                padding-left: 1%;

                li {
                    color: #7f7f7f;
                    width: 33%;
                    line-height: 40px;
                    cursor: pointer;
                    &:hover{
                    color: black;
                    }
                }
            }
        }
    }
}
</style>
