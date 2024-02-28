<template>
    <div>
        <span>获取验证码({{time}}s)</span>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
// 倒计时时间
let time = ref<number>(5)
// 此时props为reactive定义的响应式数据
let props = defineProps<{
    //接受父组件传递过来的props->countdownFlag:用于控制计数器组件显示与隐藏的
   countdownFlag?: boolean,
}>()

let emit = defineEmits(['getTimeFlag'])


// 监听父组件传递的countdownFlag是否变化
watch(()=>props.countdownFlag,(countdownFlag)=>{
    console.log("标志发生变化",countdownFlag)
    if(countdownFlag){
        // 开启倒计时,时间为0时清除倒计时
        let timer = window.setInterval(()=>{
            time.value--;
            if(time.value === 0){
                emit('getTimeFlag',false)
                clearInterval(timer);
            }
        },1000)
    }
},{immediate:true})





// console.log(props)
</script>

<script lang="ts">
export default {
    name: "Countdown",
};
</script>

<style scoped>

</style>