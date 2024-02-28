<template>
  <el-card class="box-card pointer" @click="goDetai(hospitalInfo)" shadow="hover">
    <div class="content">
      <div class="left">
        <div class="hospital-name">{{ hospitalInfo.hosname }}</div>
        <div class="tip">
          <div class="level">
            <svg t="1691145717403" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="2260" width="16" height="16">
              <path
                d="M881.066667 394.666667c-21.333333-23.466667-51.2-36.266667-81.066667-36.266667H618.666667v-117.333333c0-44.8-29.866667-85.333333-87.466667-117.333334-17.066667-10.666667-38.4-12.8-57.6-8.533333-19.2 4.266667-36.266667 17.066667-46.933333 34.133333-2.133333 2.133333-2.133333 4.266667-4.266667 6.4l-125.866667 281.6H204.8c-59.733333 0-108.8 46.933333-108.8 106.666667v258.133333c0 57.6 49.066667 106.666667 108.8 106.666667h544c53.333333 0 98.133333-38.4 106.666667-89.6l51.2-337.066667c4.266667-34.133333-6.4-64-25.6-87.466666z m-593.066667 448H204.8c-25.6 0-44.8-19.2-44.8-42.666667v-256c0-23.466667 19.2-42.666667 44.8-42.666667h83.2v341.333334z m554.666667-373.333334L789.333333 806.4c-4.266667 21.333333-21.333333 36.266667-42.666666 36.266667H352V471.466667l130.133333-290.133334c2.133333-4.266667 4.266667-4.266667 6.4-4.266666 2.133333 0 4.266667 0 8.533334 2.133333 25.6 14.933333 55.466667 38.4 55.466666 64v149.333333c0 17.066667 14.933333 32 32 32h213.333334c12.8 0 25.6 4.266667 34.133333 14.933334 8.533333 6.4 12.8 19.2 10.666667 29.866666z"
                fill="#bbbbbb" p-id="2261"></path>
            </svg>
            <span>{{hospitalInfo.param.hostypeString}}</span>
          </div>
          <div class="time">
            <svg t="1691146209497" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="4507" width="16" height="16">
              <path
                d="M512 832c-176.448 0-320-143.552-320-320S335.552 192 512 192s320 143.552 320 320-143.552 320-320 320m0-704C300.256 128 128 300.256 128 512s172.256 384 384 384 384-172.256 384-384S723.744 128 512 128"
                fill="#bbbbbb" p-id="4508"></path>
              <path
                d="M544 505.856V320a32 32 0 0 0-64 0v199.104c0 8.48 3.36 16.64 9.376 22.624l107.296 107.296a31.904 31.904 0 0 0 45.248 0 32 32 0 0 0 0-45.248L544 505.856z"
                fill="#bbbbbb" p-id="4509"></path>
            </svg>
            <span>每天{{ hospitalInfo.bookingRule?.releaseTime }}放号</span>
          </div>
        </div>
      </div>
      <div class="right">
        <img :src=" `data:image/jpge;base64,${hospitalInfo.logoData}` " alt="医院LOGO" />
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
  export default {
    name: 'Card',
  }
</script>

<script setup lang="ts">
import { Hospital } from '@/api/home/type';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

let $router = useRouter();
// 接收父组件传递的props->即为已有的医院数据
  defineProps(["hospitalInfo"]);
  onMounted(()=>{
    
  })

  // 
  const goDetai = (hospitalInfo:Hospital)=>{
    // console.log("获取点击卡片的信息",hospitalInfo)
    // 点击医院卡片,跳转到此医院详情页面
    $router.push({path:"/hospital/register",query:{hoscode:hospitalInfo.hoscode}})
  }
</script>

<style scoped lang="scss">

.pointer{
  cursor: pointer;
}
.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .left {
    width: 60%;

    .tip {
      color: #bbb;
      margin-top: 15px;
      display: flex;
      justify-content: space-between;

      .level,
      .time {
        display: flex;
        align-items: center;

        span {
          margin-left: 5px;
        }
      }
    }
  }

  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 50px;
    }
  }
}
</style>
