<template>
    <div class="header">
        <p><el-icon>
                <House />
            </el-icon></p>
        <p class="xiegang">/</p>
        <p>会员中心</p>
    </div>
    <div class="member">
        <!-- 左侧导航区 -->
        <div class="menu">
            <!-- 使用@select方法实现路由跳转并携带参数 -->
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router @select="handleSelect">
                <el-menu-item index="/member/certification">
                    <el-icon>
                        <Postcard />
                    </el-icon>
                    <span>实名认证</span>
                </el-menu-item>
                <el-menu-item index="/member/order">
                    <el-icon>
                        <Memo />
                    </el-icon>
                    <span>挂号订单</span>
                </el-menu-item>
                <el-menu-item index="/member/patient">
                    <el-icon>
                        <User />
                    </el-icon>
                    <span>就诊人管理</span>
                </el-menu-item>
                <el-menu-item index="/member/account">
                    <el-icon>
                        <Document />
                    </el-icon>
                    <span>账号信息</span>
                </el-menu-item>
                <el-menu-item index="/member/opinion">
                    <el-icon>
                        <ChatDotRound />
                    </el-icon>
                    <span>意见反馈</span>
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
import { House, Postcard, Memo, User, Document, ChatDotRound } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router';

//获取路由器
let $router = useRouter();
//获取当前路由的信息
let $route = useRoute()

//左侧菜单点击事件的回调
const handleSelect = (key: string) => {
    //console.log(key, keyPath)
    //跳转到对应二级路由并携带参数
    $router.push({ path: key });
};
</script>

<script lang="ts">
export default {
    name: "",
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

.member {
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