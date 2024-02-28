<template>
    <div class="header">
        <p><el-icon>
                <DataBoard />
            </el-icon></p>
        <p class="xiegang">/</p>
        <p>医院信息</p>
    </div>
    <div class="hospital">

        <!-- 左侧导航区 -->
        <div class="menu">
            <!-- 使用@select方法实现路由跳转并携带参数 -->
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router @select="handleSelect">
                <el-menu-item index="/hospital/register">
                    <el-icon>
                        <Calendar />
                    </el-icon>
                    <span>预约挂号</span>
                </el-menu-item>
                <el-menu-item index="/hospital/detail">
                    <el-icon>
                        <document />
                    </el-icon>
                    <span>医院详情</span>
                </el-menu-item>
                <el-menu-item index="/hospital/notice">
                    <el-icon>
                        <Bell />
                    </el-icon>
                    <span>预约须知</span>
                </el-menu-item>
                <el-menu-item index="/hospital/close">
                    <el-icon>
                        <Warning />
                    </el-icon>
                    <span>停诊信息</span>
                </el-menu-item>
                <el-menu-item index="/hospital/search">
                    <el-icon>
                        <Search />
                    </el-icon>
                    <span>查询/取消</span>
                </el-menu-item>
            </el-menu>
        </div>
        <!-- 右侧内容展示区域：路由组件展示位置 -->
        <div class="content">
            <!-- 子组件展示结构的地方 -->
            <router-view :key="$route.path"></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDetailStore } from '@/store/modules/hospitalDetail';
import { Document, Calendar, Bell, Search, Warning, DataBoard } from '@element-plus/icons-vue'
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// import {useStore} from 'pinia';

//获取路由器
let $router = useRouter();
//获取当前路由的信息
let $route = useRoute()

//获取仓库对象
const store = useDetailStore()

//左侧菜单点击事件的回调
const handleSelect = (key: string) => {
    //console.log(key, keyPath)
    //跳转到对应二级路由并携带参数
    $router.push({ path: key, query: { hoscode: $route.query.hoscode } });
    // 通知pinia仓库发请求获取医院详情数据，并存储到仓库中
    store.getHospitalInfo(<string>$route.query.hoscode);
};

// 组件挂载完毕
onMounted(() => {
    // console.log($route.query.hoscode)
    // 当前路由没有携带query参数，则跳转到home页面
    if ($route.query.hoscode == undefined) {
        let router = useRouter();
        router.push('/home')
    }
    // 通知pinia仓库发请求获取医院详情数据，并存储到仓库中
    store.getHospitalInfo(<string>$route.query.hoscode);
    // 通知pinia仓库发请求获取科室详情数据，并存储到仓库中
    store.getDepartmentInfo(<string>$route.query.hoscode);
})



</script>

<script lang="ts">
export default {
    name: "HospitalDetail",
};
</script>

<style scoped lang="scss">
.header {
    color: #7f7f7f;
    display: flex;
    align-items: center;
    margin: 20px 0 20px 30px;

    .xiegang {
        margin: 0px 15px;
    }
}

.hospital {
    display: flex;

    .menu {
        flex: 2; //菜单占2份
    }

    .content {
        flex: 8; //菜单占2份
        margin-left: 30px
    }
}
</style>