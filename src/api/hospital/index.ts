// 引入二次封装的axios
import request from "@/utils/request";
import {
  ResDepartment,
  ResHospitalDetail,
  LoginData,
  ResUserLogin,
  ResWxLogin,
  ResHosipitalBookingData,
  ResDoctorScheduleList,
  ResPatientData,
  ResDoctorData,
} from "./type";
// 枚举请求地址
enum API {
  // 获取医院详情接口地址
  HOSPITALDETAIL_URL = "/hosp/hospital/",
  // 获取某一医院的科室数据地址
  HOSPITALDEPARTMENT_URL = "/hosp/hospital/department/",
  //获取验证码接口
  GETUSERCODE_URL = "/sms/send/",
  // 用户登录接口
  USERLOGIN_URL = "/user/login/",
  // 微信扫码登录需要参数接口
  WXLOGIN_URL = "/user/weixin/getLoginParam/",
  // 可预约排班数据接口地址
  BOOKINGSCHEDULERULE_URL = "/hosp/hospital/auth/getBookingScheduleRule/",
  // 某天预约挂号医生数据接口
  DOCTORSCHEDULELIST_URL = "/hosp/hospital/auth/findScheduleList/",
  // 某一账号下就诊人信息接口
  GETPATIENTS_URL = "/user/patient/auth/findAll/",
  // 根据医生id获取医生排班数据接口
  GETDOCTORSCHEDULEBYID_URL = "/hosp/hospital/getSchedule/",
}

// 获取医院详情接口
export const reqHospitalDetail = (hoscode: string) =>
  request.get<any, ResHospitalDetail>(API.HOSPITALDETAIL_URL + hoscode);

// 获取医院数据书记接口
export const reqHospitalDepartmentInfo = (hoscode: string) =>
  request.get<any, ResDepartment>(API.HOSPITALDEPARTMENT_URL + hoscode);

// 获取验证码接口
export const reqCode = (phone: string) =>
  request.get<any, any>(API.GETUSERCODE_URL + phone);

// 用户登录接口
export const reqUserLogin = (data: LoginData) =>
  request.post<any, ResUserLogin>(API.USERLOGIN_URL, data);

// 获取微信扫码登录生成二维码需要参数接口
export const reqWxLogin = (wxRedirectUri: string) =>
  request.get<any, ResWxLogin>(
    API.WXLOGIN_URL + `?wxRedirectUri=${wxRedirectUri}`
  );

// 获取医院挂号预约排班数据接口
export const reqBookingScheduleRule = (
  page: number,
  limit: number,
  hoscode: string,
  depcode: string
) =>
  request.get<any, ResHosipitalBookingData>(
    API.BOOKINGSCHEDULERULE_URL + `${page}/${limit}/${hoscode}/${depcode}`
  );

// 获取医院挂号某天医生数据接口
export const reqDoctorScheduleList = (
  hoscode: string,
  depcode: string,
  workDate: string
) =>
  request.get<any, ResDoctorScheduleList>(
    API.DOCTORSCHEDULELIST_URL + `${hoscode}/${depcode}/${workDate}`
  );

// 获取某一账号下就诊人信息接口
export const reqGetPatients = () =>
  request.get<any, ResPatientData>(API.GETPATIENTS_URL);

// 根据医生id获取排班医生数据
export const reqGetDoctorScheduleById = (scheduleId: string) =>
  request.get<any, ResDoctorData>(API.GETDOCTORSCHEDULEBYID_URL + scheduleId);
