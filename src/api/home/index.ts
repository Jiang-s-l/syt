// 统一管理首页模块接口
import request from "@/utils/request";
import { HospitalInfoByName, HospitalLAndRtResData, HospitalResponseData } from "./type";

// 通过枚举管理首页模块的接口地址
enum API {
    // 获取已有的医院的接口地址
    HOSPITAL_URL = "/hosp/hospital",
    // 获取医院的等级和地区的接口地址
    HOSPITAL_LEVEL_AND_REGION_URL = "/cmn/dict/findByDictCode",
    // 根据关键字医院的名字获取医院数据地址
    HOSPITALINFO_BY_NAME_URL = "/hosp/hospital/findByHosname/",
}

// 获取已有医院的信息接口
// 写any的原因：如果返回错误提示也可以接受符合类型，提高兼容性
export const reqHospital = (page: number, limit: number, hostype = "", districtCode = "") =>
    request.get<any, HospitalResponseData>(
        API.HOSPITAL_URL +
        `/${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`
    );

// 获取医院的等级和地区的信息接口
export const reqHospitalLevelAndRegion = (dictCode: string) =>
    request.get<any, HospitalLAndRtResData>(
        API.HOSPITAL_LEVEL_AND_REGION_URL + `/${dictCode}`
    );

// 根据输入的医院的关键字获取医院信息
export const reqHospitalInfoByName = (hosname:string)=>request.get<any,HospitalInfoByName>(API.HOSPITALINFO_BY_NAME_URL+hosname)

