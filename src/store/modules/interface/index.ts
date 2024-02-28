/* 用于存储store文件夹里数据的ts类型 */

import { HospitalDetail,DepartmentInfo, UserInfo } from "@/api/hospital/type";

// 定义仓库内部存储数据state的ts类型
export interface DetailState {
    hospitalInfo:HospitalDetail,
    departmentList:DepartmentInfo
};

// 用户仓库相关state数据的ts类型定义
export interface UserState{
    loginDialogVisible:boolean,//用于控制登录组件的dialog的显示与隐藏
    code:string,//存储用户登录验证码
    userInfo:UserInfo,//存储用户信息   
}