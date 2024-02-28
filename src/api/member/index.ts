import request from "@/utils/request";
import {
  ResCreateOrder,
  ResOrderInfo,
  ResPayResult,
  ResQrcodeData,
  ResMemberInfo,
  ResCertificationType,
  MemberParam,
  ResMemberOrderInfo,
  ResOrderStatus,
  AddOrEditPatient,
} from "./type";
import { ResPatient } from "../hospital/type";

// 枚举地址
enum API {
  // 获取订单号码接口地址
  CREATEORDER_URL = "/order/orderInfo/auth/submitOrder/",
  // 获取订单详情接口地址
  GETORDERINFO_URL = "/order/orderInfo/auth/getOrderInfo/",
  // 取消预约订单接口地址
  CANCELORDER_URL = "/order/orderInfo/auth/cancelOrder/",
  // 获取衣服订单二维码接口地址
  QRCODE_URL = "/order/weixin/createNative/",
  // 查询订单支付结果接口地址
  PAYRESULT_URL = "/order/weixin/queryPayStatus/",
  // 获取当前账号会员信息接口地址
  MEMBERINFO_URL = "/user/auth/getUserInfo",
  // 获取证件类型接口地址
  CERTIFICATIONTYPE_URL = "/cmn/dict/findByDictCode/",
  // 会员认证接口地址
  MEMBERCERTIFICATE_URL = "/user/auth/userAuah",
  // 获取会员订单接口地址
  GETMEMBERORDERINFO_URL = "/order/orderInfo/auth/",
  // 获取当前会员所有订单状态接口地址
  GETORDERSTATUS_URL = "/order/orderInfo/auth/getStatusList",
  // 获取城市数据接口地址
  GETCITY_URL = "/cmn/dict/findByParentId/",
  // 新增就诊人接口地址
  ADDPATIENT_URL = "/user/patient/auth/save",
  // 修改就诊人接口地址
  EDITPATIENT_URL = "/user/patient/auth/update/",
  // 根据id获取就诊人信息接口地址
  GETPATIENTINFOBYID_URL = "/user/patient/auth/get/",
  // 根据id删除就诊人信息接口地址
  DELETEPATIENT = "/user/patient/auth/remove/",
}
// 获取订单id接口
export const reqCreateOrder = (data: any) =>
  request.post<any, ResCreateOrder>(
    API.CREATEORDER_URL + `${data.hoscode}/${data.scheduleId}/${data.patientId}`
  );

// 获取订单详情接口
export const reqGetOrderInfo = (id: number) =>
  request.get<any, ResOrderInfo>(API.GETORDERINFO_URL + id);

// 取消预约订单接口
export const reqCancelOrder = (id: number) =>
  request.get<any, any>(API.CANCELORDER_URL + id);

// 获取衣服订单二维码接口
export const reqGetQrcode = (orderId: number) =>
  request.get<any, ResQrcodeData>(API.QRCODE_URL + orderId);

// 查询订单支付结果接口
export const reqQueryPayState = (orderId: number) =>
  request.get<any, ResPayResult>(API.PAYRESULT_URL + orderId);

// 获取当前账号会员信息接口
export const reqGetMemberInfo = () =>
  request.get<any, ResMemberInfo>(API.MEMBERINFO_URL);

// 获取证件类型接口
export const reqCertificationType = () =>
  request.get<any, ResCertificationType>(
    API.CERTIFICATIONTYPE_URL + "CertificatesType"
  );

// 会员认证接口
export const reqCertificate = (data: MemberParam) =>
  request.post<any, any>(API.MEMBERCERTIFICATE_URL, data);

// 获取会员订单接口
export const reqGetMemberOrderInfo = (
  page: number,
  limit: number,
  patientId?: string,
  orderStatus?: string
) =>
  request.get<any, ResMemberOrderInfo>(
    API.GETMEMBERORDERINFO_URL +
      `${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`
      
  );

// 获取当前会员所有订单状态接口
export const reqGetOrderStatus = () =>
  request.get<any, ResOrderStatus>(API.GETORDERSTATUS_URL);

// 获取城市数据接口
export const reqGetCity = (cityId:number)=>request.get<any,any>(API.GETCITY_URL+cityId)

// 新增或修改就诊人接口地址
export const reqAddOrEditPatient = (data:AddOrEditPatient) => {
  if(data.id){
    request.put<any,any>(API.EDITPATIENT_URL,data)
  }else{
    request.post<any,any>(API.ADDPATIENT_URL,data)
  }
}

// 根据id获取就诊人信息接口
export const reqGetPatientInfoById = (id:number)=>request.get<any,ResPatient>(API.GETPATIENTINFOBYID_URL+id)

// 根据id删除就诊人信息接口
export const reqDeletePatient = (id:number)=>request.delete<any,any>(API.DELETEPATIENT+id)