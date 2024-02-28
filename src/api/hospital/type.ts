// 定义详情模块数据ts接口
export interface ResponseData {
	code: number,
	message: string,
	ok: boolean,
}

// 挂号规则
export interface BookingRule {
	cycle: number;
	releaseTime: string;
	stopTime: string;
	quitDay: number;
	quitTime: string;
	rule: string[];
}

// 医院等级和详细地址
export interface Param {
	hostypeString: string;
	fullAddress: string;
}

// 医院信息
export interface Hospital {
	id: string;
	createTime: string;
	updateTime: string;
	isDeleted: number;
	param: Param;
	hoscode: string;
	hosname: string;
	hostype: string;
	provinceCode: string;
	cityCode: string;
	districtCode: string;
	address: string;
	logoData: string;
	intro: string;
	route: string;
	status: number;
	bookingRule?: any;
}

// 代表医院详情的数据接口
export interface HospitalDetail {
	bookingRule: BookingRule;
	hospital: Hospital;
}

// 请求地址返回医院数据接口
export interface ResHospitalDetail extends ResponseData {
	data: HospitalDetail
}


/* 科室ts类型 */
// 科室数据ts类型
export interface Department {
	depcode: string;
	depname: string;
	children?: Department[];
}

// 存储科室数组ts类型
export type DepartmentInfo = Department[]

// 请求地址接口返回医院数据接口
export interface ResDepartment extends ResponseData {
	data: DepartmentInfo;
}

// 用户登录接口需要携带参数类型
export interface LoginData {
	phone: string,
	code: string
}

// 登录接口返回用户信息数据类型
export interface UserInfo {
	name: string,
	token: string
}

// 登录接口返回的数据的ts类型
export interface ResUserLogin extends ResponseData {
	data: UserInfo
}

// 定义微信扫码登录需要参数的数据类型
export interface WxLogin {
	redirectUri: string
	appid: string
	scope: string
	state: string
}

// 微信扫码登录需要参数接口返回的ts类型
export interface ResWxLogin extends ResponseData {
	data: WxLogin
}

/* 预约挂号接口返回数据ts类型 */
export interface BaseMap {
	workDateString: string
	releaseTime: string
	bigname: string
	stopTime: string
	depname: string
	hosname: string
}

export interface BookingScheduleList {
	workDate: string
	workDateMd: string
	dayOfWeek: string
	docCount: number
	reservedNumber: number
	availableNumber: number
	status: number
}

export interface HosipitalBookingData {
	total: number
	bookingScheduleList: BookingScheduleList[]
	baseMap: BaseMap
}

export interface ResHosipitalBookingData extends ResponseData {
	data: HosipitalBookingData
}

/* 获取医院预约挂号某天医生数据接口ts类型 */
export interface Doctor {
	id: string
	createTime: string
	updateTime: string
	isDeleted: number
	param: {
		dayOfWeek: string
		depname: string
		hosname: string
	}
	hoscode: string
	depcode: string
	title: string
	docname: string
	skill: string
	workDate: string
	workTime: number
	reservedNumber: number
	availableNumber: number
	amount: number
	status: number
	hosScheduleId: string
}

export type DoctorList = Doctor[];

export interface ResDoctorScheduleList extends ResponseData{
	data:DoctorList
}

/* 就诊人相关数据ts类型 */
//代表的是一个就诊人数据ts类型
export interface Patient {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
        "certificatesTypeString": string,
        "contactsCertificatesTypeString": string,
        "cityString": null,
        "fullAddress": string,
        "districtString": null,
        "provinceString": null
    },
    "userId": number,
    "name": string,
    "certificatesType": string,
    "certificatesNo": string,
    "sex": number,//0：女；1：男
    "birthdate": string,
    "phone": string,
    "isMarry": number,//0：未婚；1：已婚
    "provinceCode": null,
    "cityCode": null,
    "districtCode": null,
    "address": string,
    "contactsName": string,
    "contactsCertificatesType": string,
    "contactsCertificatesNo": string,
    "contactsPhone": string,
    "isInsure": number,//医保：医保0；自费1
    "cardNo": null,
    "status": string
}
export type PatientList = Patient[];
export interface ResPatientData extends ResponseData {
    data: PatientList
}
// 一个就诊人的ts类型
export interface ResPatient extends ResponseData {
    data: Patient
}

/* 医生数据接口ts类型 */
export interface ResDoctorData extends ResponseData{
	data:Doctor
}