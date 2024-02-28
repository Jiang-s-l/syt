// 定义用户相关数据的仓库

import { reqCode, reqUserLogin } from "@/api/hospital";
import { LoginData, ResUserLogin, UserInfo } from "@/api/hospital/type";
import { defineStore } from "pinia";
import { UserState } from "./interface";

const useUserStore = defineStore('User', {
    state: (): UserState => {
        return {
            loginDialogVisible: false,//用于控制登录组件的dialog的显示与隐藏
            code: '',//存储用户登录验证码
            userInfo: ((JSON.parse(localStorage.getItem('userInfo') as string) || {}) as UserInfo),//存储用户信息
        }
    },
    actions: {
        // 获取手机登录验证码
        //正常开发的时候,只需要发一个请求，后台就会将验证码推送到用户手机设备当中
        //当然咱们目前服务器不能向用户手机设备推送验证码(花钱)
        async getCode(phone: string) {
            // console.log("--------",phone)
            let result: any = await reqCode(phone)
            // console.log(result)
            if (result.code === 200) {
                if (result.data === null) {
                    this.code = ''
                    return Promise.reject(new Error("频繁获取验证码，请2分钟后再试"))
                } else {
                    this.code = result.data;
                    return 'ok';
                }
            } else {
                return Promise.reject(new Error(result.message))
            }
        },

        // 查询微信扫码接口（就是看本地存储是否存储数据）
        queryState() {
            // 开启定时器每隔一段时间每隔一段时间问：本地是否拥有用户信息
            let timer = setInterval(() => {
                // 本地存储有信息
                if (localStorage.getItem('userInfo')) {
                    // 关闭对话框
                    this.loginDialogVisible = false;
                    // 将数据存储到pinia中
                    this.userInfo = JSON.parse(localStorage.getItem('userInfo') as string);
                    // 关闭定时器
                    clearInterval(timer);
                }
            }, 1000)
        },

        // 点击登录按钮操作
        async userLogin(loginData: LoginData) {
            // 登录请求
            let result: ResUserLogin = await reqUserLogin(loginData)
            // console.log(result)
            if (result.code === 200) {
                this.userInfo = result.data
                // 本地存储用户信息
                localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }

        },

        // 退出登录
        loginout() {
            this.userInfo = { name: '', token: '' }
            this.code = ''
        },

        setUserInfo(){
            this.userInfo = JSON.parse(localStorage.getItem('userInfo') as string)
        }
    },
    getters: {},
})

export default useUserStore;