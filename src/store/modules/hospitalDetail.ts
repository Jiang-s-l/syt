import { reqHospitalDepartmentInfo, reqHospitalDetail } from '@/api/hospital';
import { HospitalDetail, ResHospitalDetail } from '@/api/hospital/type';
import { defineStore } from 'pinia';
import { DetailState } from './interface';
import router from '@/router/index.ts'
import { ElMessage } from 'element-plus';

// pinia仓库写法：组合式API、选择式API（vue3推荐使用组合式API）

// 选项式API
export const useDetailStore = defineStore('Detail', {
    state: () :DetailState=> {
        return {
            // 医院详情数据
            hospitalInfo:({} as HospitalDetail),
            departmentList:[]
            
        }
    },
    actions: {
        // 获取某一医院详情数据
        async getHospitalInfo(hoscode:string){
            // console.log(hoscode)
            let result:ResHospitalDetail =await reqHospitalDetail(hoscode);
            // console.log("获取医院详情信息",result)
            if(result.code === 200){
                this.hospitalInfo = result.data;
            }else{
                ElMessage.error('获取医院信息失败，请重新选择')
                router.push('/home')
            }
        },
        // 获取某一医院科室数据
        async getDepartmentInfo(hoscode:string){
            let result = await reqHospitalDepartmentInfo(hoscode)
            // console.log("科室数据", result)
            if (result.code === 200) {
                this.departmentList = result.data
            }
        },
    },
    getters: {

    }

});



