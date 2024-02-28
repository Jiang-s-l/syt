<template>
    <div class="close">
        <h1 class="hosname">
            {{ hospitalStore.hospitalInfo.hospital?.hosname }}停诊信息
        </h1>
        <el-empty description="暂无信息" :image-size="300" />
    </div>
</template>

<script setup lang="ts">
import { useDetailStore } from '@/store/modules/hospitalDetail';

//获取医院详情仓库的数据
let hospitalStore = useDetailStore();
</script>

<script lang="ts">
export default {
    name: "Close",
};
</script>

<style scoped lang="scss">
.close {
    .hosname {
        text-align: center;
        font-size: 30px;
    }
}
</style>