// 定义会员详情模块数据ts接口
export interface ResponseData {
    code: number;
    message: string;
    ok: boolean;
}

// 提交订单接口返回数据接口ts类型
export interface ResCreateOrder extends ResponseData {
    data: number;
}

// 订单数据ts类型
export interface OrderInfo {
    id: number;
    createTime: string;
    updateTime: string;
    isDeleted: number;
    param: {
        orderStatusString: string;
    };
    userId: number;
    outTradeNo: string;
    hoscode: string;
    hosname: string;
    depcode: string;
    depname: string;
    scheduleId: string;
    title: string;
    reserveDate: string;
    reserveTime: number;
    patientId: number;
    patientName: string;
    patientPhone: string;
    hosRecordId: string;
    number: number;
    fetchTime: string;
    fetchAddress: string;
    amount: number;
    quitTime: string;
    orderStatus: number; //订单三种状态：-1：取消预约；0：预约未支付；1：预约支付成功
}

// 订单接口数据ts类型
export interface ResOrderInfo extends ResponseData {
    data: OrderInfo;
}

// 支付二维码数据ts类型
export interface QrcodeData {
    codeUrl: string;
    orderId: number;
    totalFee: number;
    resultCode: string;
}

// 获取支付二维码数据接口ts类型
export interface ResQrcodeData extends ResponseData {
    data: QrcodeData;
}

// 查询支付结果数据接口ts类型
export interface ResPayResult extends ResponseData {
    data: boolean;
}

// 实名认证表单数据ts类型
export interface MemberParam {
    certificatesNo: string;
    certificatesType: string;
    certificatesUrl: string;
    name: string;
}

// 会员信息数据的ts类型
export interface MemberInfo {
    id: number;
    createTime: string;
    updateTime: string;
    isDeleted: number;
    param: {};
    openid: any;
    nickName: any;
    phone: string;
    name: string;
    certificatesType: string; //10:身份证；20：户口本
    certificatesNo: string;
    certificatesUrl: string;
    authStatus: number; //0:未验证；1：已验证
    status: number;
}
// 获取会员信息数据接口的ts类型
export interface ResMemberInfo extends ResponseData {
    data: MemberInfo
}

// 证件类型数据ts类型
export interface CertificationType {
    id: number
    createTime: string
    updateTime: string
    isDeleted: number
    param: {}
    parentId: number
    name: string
    value: string
    dictCode: string
    hasChildren: boolean
}
// 所有证件类型数据ts类型
export type CertificationTypeList = CertificationType[]
// 获取证件类型接口数据ts类型
export interface ResCertificationType extends ResponseData {
    data: CertificationTypeList
}

/*  */

// 一个账号下的所有订单数据ts类型
export type Records = OrderInfo[]
// 获取订单数据的ts类型
export interface ResMemberOrderInfo extends ResponseData {
    data: {
        records: Records;
        total: number;
        size: number;
        current: number;
        orders: any[];
        hitCount: boolean;
        searchCount: boolean;
        pages: number;
    }

}

// 订单状态ts类型
export interface OrderStatus{
    comment:string,
    status:number
}
// 所有订单状态ts类型
export type OrderStatusList = OrderStatus[]
// 获取订单状态接口ts类型
export interface ResOrderStatus extends ResponseData{
    data:OrderStatusList
}

//新增与修改已有的就诊人参数的数据ts类型
export interface AddOrEditPatient {
    id?: string,
    name: string,
    certificatesType: string,
    certificatesNo:string,
    sex:number,
    birthdate:string,
    phone:string,
    isMarry:number,
    isInsure:number,
    addressSelected:string[],
    address:string,
    contactsName:string,
    contactsCertificatesType:string,
    contactsCertificatesNo:string,
    contactsPhone:string
}
