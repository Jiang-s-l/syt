<template>
    <div>
        <div v-if="$route.query.id">
            <OrderDetail/>
        </div>
        <div v-else>
            <OrderAll/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import OrderDetail from '@/pages/member/order/orderDetail/index.vue'
import OrderAll from '@/pages/member/order/orderAll/index.vue'
let $route = useRoute();

</script>

<script lang="ts">
export default {
    name: "Order",
};
</script>

<style scoped lang="scss">

</style>