
// 定义首页模块ts数据类型
export interface ResPonseData {
  code: number;
  message: string;
  ok: boolean;
}

// 代表已有医院数据的ts类型（每个医院的具体信息）
export interface Hospital {
  id: string;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    fullAddress: string;
    hostypeString: string;
  };
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
  bookingRule: {
    cycle: number;
    quitDay: number;
    quitTime: string;
    releaseTime: string;
    rule: string[];
    stopTime: string;
  };
}

// 存储全部已有医院数组的类型（数组中包含每个医院的信息）
// type关键字：type (类型别名)，顾名思义，类型别名只是给类型起一个新名字。它并不是一个类型，只是一个别名而已
export type Content = Hospital[];

// 获取已有医院接口返回的数据ts类型（接口返回的data数据）
export interface HospitalResponseData extends ResPonseData {
  data: {
    content: Content;
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: {
      sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
      };
      pageNumber: number;
      pageSize: number;
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    size: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    totalElements: number;
    totalPages: number;
  };
}

/* 医院等级和区域 */
// 代表医院等级和区域数据的ts类型（医院等级和区域的具体信息）
export interface HospitalLevelAndRegion {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {};
  parentId: number;
  name: string;
  value: string;
  dictCode: string;
  hasChildren: boolean;
}
// 存储全部医院等级和区域的类型
export type HospitalLevelAndRegionList = HospitalLevelAndRegion[];
// 获取医院等级和区域接口返回的数据ts类型（接口返回的data数据）
export interface HospitalLAndRtResData extends ResPonseData {
  data: HospitalLevelAndRegionList;
}

// 根据医院名称获取医院列表
export interface HospitalInfoByName extends ResPonseData{
  data:Content;
}
