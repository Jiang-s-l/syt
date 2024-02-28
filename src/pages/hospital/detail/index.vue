<template>
    <div class="detail">
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
        <div class="logo_route">
            <div class="left">
                <img :src="logoData" alt="医院LOGO" />
            </div>
            <div class="right">
                <span class="iconPlace">
                    <svg t="1692263799534" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="3039" width="16" height="16">
                        <path
                            d="M513.2 898.3c-106.4 0-206.6-9.2-282.3-26.1-88.9-19.9-137.4-47.5-132-83.3 3.7-25 19.5-37.2 58.5-51.6 32.6-12 96.8-27.2 148.5-35.6 12-2 21.4 5.4 23.4 17.3 2 12-6.4 21-18.3 23-44.4 7.2-105.8 20.8-132 31.2-29 11.5-26.2 14.8-26.2 17 0 1.8 0.6 8.9 20.4 18.2 19.2 9 47 17.4 80.4 24.5 71.7 15 165.6 23.3 264.7 23.3 99 0 193-8.3 264.7-23.3 33.5-7 61.3-15.5 80.4-24.5 19.9-9.2 16.2-16.2 17-17.8-1-2-3.7-5.9-32.7-17.3-26.2-10.4-82.4-23.7-126.7-30.9-12-2-20.3-10.3-18.4-22.3 2-12 12.4-20.3 24.4-18.4 51.7 8.3 109 24.3 142 35.5 39.3 13.3 54.8 26.6 58.6 51.8 5.4 35.8-43.2 63.5-132.2 83.2-75.6 16.9-175.8 26.1-282.2 26.1z"
                            fill="#3259CE" p-id="3040"></path>
                        <path
                            d="M510.8 98.2c-134.1 0-239.5 108.4-239.3 242.4 0 4 0.1 8.2 0.3 12.3 1.4 28.6 10.2 57.2 21.4 83.4v0.1l17.9 34.5c1.5 2.9 148.7 277.2 165.1 303.1 9.2 14.5 24.6 20.7 35.5 20.7 10.6 0 27.6-5.7 35.3-20.7 12.3-24 175.8-303.1 175.8-303.1s15.2-26.2 18.7-34.6c13.4-31.7 18.9-49.2 20.3-83.7 0.1-3.6 0.2-9.4 0.2-12.3C761.9 206 644.9 98.2 510.8 98.2z m2.4 368.9c-74.2 0-134.3-60.1-134.3-134.3 0-74.2 60.1-134.3 134.3-134.3 74.2 0 134.3 60.1 134.3 134.3 0 74.2-60.1 134.3-134.3 134.3z"
                            fill="#3259CE" p-id="3041"></path>
                    </svg>
                </span>
                <div>
                    <div class="address">
                        <span>具体地址：{{ fullAddress }}</span>
                    </div>
                    <div class="route" style="line-height: 20px;">
                        规划路线：{{ route }}
                    </div>
                </div>

            </div>
        </div>
        <div class="intro">
            <p>医院介绍</p>
            <div class="hospitalIntro">
                {{ intro }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDetailStore } from '@/store/modules/hospitalDetail';
import { computed } from 'vue';

let hospitalStore = useDetailStore();
console.log(hospitalStore)
// 从仓库中获取医院相关信息
// 医院名称
let hosname = computed(() => {
    return hospitalStore.hospitalInfo.hospital?.hosname || ''
})
// 医院等级
let hosLevel = computed(() => {
    return hospitalStore.hospitalInfo.hospital?.param.hostypeString
})
// 医院Logo
let logoData = computed(() => {
    return `data:image/jpge;base64,${hospitalStore.hospitalInfo.hospital?.logoData}`
})
// 医院具体地址
let fullAddress = computed(() => {
    return hospitalStore.hospitalInfo.hospital?.param.fullAddress
})
// 医院规划路线
let route = computed(() => {
    return hospitalStore.hospitalInfo.hospital?.route
})
// 医院介绍
let intro = computed(() => {
    return hospitalStore.hospitalInfo.hospital?.intro
})
</script>

<script lang="ts">
export default {
    name: "Detail",
};
</script>

<style scoped lang="scss">
.detail {
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

    .logo_route {
        display: flex;

        .left {
            width: 80px;

            img {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                border:1px #7f7f7f solid;
            }
        }

        .right {
            flex: 1;
            margin-left: 20px;
            display: flex;
            margin-top: 12px;

            .iconPlace {
                margin-right: 8px;
            }

            .address,
            .route {
                display: flex;
                margin-bottom: 12px;
                color: #7f7f7f;
            }
        }
    }

    .intro {
        margin-top: 60px;
        p{
            margin-bottom: 10px;
            font-size: 20px;
        }
        .hospitalIntro {
            line-height: 30px;
            color: #7f7f7f;
        }
    }
}</style>