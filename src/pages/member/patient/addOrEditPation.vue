<template>
  <div class="form">
    <el-divider content-position="left">就诊人信息</el-divider>
    <el-form
      ref="ruleFormPatientRef"
      :model="ruleFormPatient"
      :rules="rulesPatient"
      label-width="120px"
      status-icon
    >
      <el-form-item label="用户姓名" prop="name">
        <el-input v-model="ruleFormPatient.name" placeholder="请输入用户姓名" />
      </el-form-item>
      <el-form-item label="证件类型" prop="certificatesType">
        <el-select
          v-model="ruleFormPatient.certificatesType"
          placeholder="请选择证件类型"
        >
          <el-option
            v-for="item in certificationList"
            :key="item.id"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码" prop="certificatesNo">
        <el-input
          v-model="ruleFormPatient.certificatesNo"
          placeholder="请输入证件号码"
        />
      </el-form-item>
      <el-form-item label="用户性别" prop="sex">
        <el-radio-group v-model="ruleFormPatient.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthdate">
        <el-date-picker
          v-model="ruleFormPatient.birthdate"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择出生日期"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input
          v-model="ruleFormPatient.phone"
          placeholder="请输入手机号码"
        />
      </el-form-item>

      <el-divider content-position="left"
        >建档信息（完善后部分医院首次就诊不排队建档）</el-divider
      >
      <el-form-item label="婚姻状况" prop="isMarry">
        <el-radio-group v-model="ruleFormPatient.isMarry">
          <el-radio :label="1">已婚</el-radio>
          <el-radio :label="0">未婚</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="自费/医保" prop="isInsure">
        <el-radio-group v-model="ruleFormPatient.isInsure">
          <el-radio :label="1">自费</el-radio>
          <el-radio :label="0">医保</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="当前的住址" prop="addressSelected">
        <el-cascader :props="props" v-model="ruleFormPatient.addressSelected" />
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input
          placeholder="请你输入用户详细地址"
          v-model="ruleFormPatient.address"
        ></el-input>
      </el-form-item>

      <el-divider content-position="left">联系人信息（选填）</el-divider>

      <el-form-item label="用户姓名" prop="contactsName">
        <el-input
          placeholder="请你输入用户姓名"
          v-model="ruleFormPatient.contactsName"
        ></el-input>
      </el-form-item>
      <el-form-item label="证件类型" prop="contactsCertificatesType">
        <el-select
          placeholder="请你选择证件的类型"
          style="width: 100%"
          v-model="ruleFormPatient.contactsCertificatesType"
        >
          <el-option
            v-for="item in certificationList"
            :key="item.id"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码" prop="contactsCertificatesNo">
        <el-input
          placeholder="请你输入证件号码"
          v-model="ruleFormPatient.contactsCertificatesNo"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="contactsPhone">
        <el-input
          placeholder="请你输入用户手机号码"
          v-model="ruleFormPatient.contactsPhone"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="default"
          @click="submitForm(ruleFormPatientRef)"
          >提交</el-button
        >
        <el-button
          type="primary"
          size="default"
          @click="resetForm(ruleFormPatientRef)"
          >重写</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import {
  ElMessage,
  type CascaderProps,
  type FormInstance,
  type FormRules,
} from "element-plus";
import {
  AddOrEditPatient,
  CertificationTypeList,
  ResCertificationType,
} from "@/api/member/type";
import {
  reqAddOrEditPatient,
  reqCertificationType,
  reqGetCity,
reqGetPatientInfoById,
} from "@/api/member";
import { ResPatient } from "@/api/hospital/type";

const $emit = defineEmits(["changeSceneAndGetPatients"]);
const $props = defineProps(['currentPatientId','patientList'])

onMounted(() => {
  getCertificationType();
  console.log("就诊人id",$props.currentPatientId);
  getPatientInfo();
});

// 获取就诊人信息
const getPatientInfo = async ()=>{
    if($props.currentPatientId === -1) return
    let result:ResPatient =await reqGetPatientInfoById($props.currentPatientId)
    Object.assign(ruleFormPatient,result.data)
    console.log(ruleFormPatient)
}
// 存储级联选择器的数据
let showData = [];
//级联数据，懒加载获取
const props: CascaderProps = {
  expandTrigger: "hover" as const, //控制子节点的展开方式
  lazy: true, //懒加载数据
  // 加载级联选择器方法
  async lazyLoad(node, resolve) {
    // const { level } = node;
    // console.log("级联选择器",level,node)
    let result: any = await reqGetCity((node.data?.id as number) || 86);
    // console.log("获取的城市数据", result);
    if (result.code === 200) {
      showData = result.data.map((item: any) => {
        return {
          id: item.id,
          value: item.name,
          label: item.name,
          leaf: !item.hasChildren,
        };
      });
      resolve(showData);
    }
  },
};

// 存储证件类型信息数据
let certificationList = ref<CertificationTypeList>([]);
// 获取证件类型信息
const getCertificationType = async () => {
  let result: ResCertificationType = await reqCertificationType();
  if (result.code === 200) {
    certificationList.value = result.data;
  }
};

// 表单ref
const ruleFormPatientRef = ref<FormInstance>();
// 表单信息
let ruleFormPatient = reactive<AddOrEditPatient>({
  name: "",
  certificatesType: "",
  certificatesNo: "",
  sex: 0,
  birthdate: "",
  phone: "",
  isMarry: 0,
  isInsure: 0,
  addressSelected: [],
  address: "",
  contactsName: "",
  contactsCertificatesType: "",
  contactsCertificatesNo: "",
  contactsPhone: "",
});

// 用户姓名校验规则
// @ts-ignore
const validateName = (rule: any, value: any, callback: any) => {
  const e =
    /^[\u00B7\u3007\u3400-\u9FFF\uE000-\uF8FF\uF900-\uFAFF\u{20000}-\u{2FFFF}\u{30000}-\u{3FFFF}]+$/u;
  if (e.test(value)) {
    callback();
  } else {
    callback(new Error("请输入正确格式的中国姓名"));
  }
};
// 证件号码校验规则
// @ts-ignore
const validateCertificatesNo = (rule: any, value: any, callback: any) => {
  // 身份证正则表达式
  const sfz =
    /^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$/;
  // 户口本正则表达式
  // 规则： 15位数字, 18位数字, 17位数字 + X
  // 样本： 441421999707223115
  const hkb = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (sfz.test(value) || hkb.test(value)) {
    callback();
  } else {
    callback(new Error("请输入正确格式的证件号码"));
  }
};
// 表单校验规则
const rulesPatient = reactive<FormRules<AddOrEditPatient>>({
  name: [
    { required: true, message: "请输入用户姓名", trigger: "blur" },
    { validator: validateName, trigger: "blur" },
  ],
  certificatesType: [
    { required: true, message: "请选择证件类型", trigger: "change" },
  ],
  certificatesNo: [
    { required: true, message: "请输入证件号码", trigger: "blur" },
    { validator: validateCertificatesNo, trigger: "blur" },
  ],
  sex: [
    {
      required: true,
      message: "Please select activity resource",
      trigger: "change",
    },
  ],
  birthdate: [
    {
      type: "date",
      required: true,
      message: "请选择出生日期",
      trigger: "change",
    },
  ],
});

// 提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log("submit!",$props.currentPatientId);
      
      console.log(ruleFormPatient);
      try {
        await reqAddOrEditPatient(ruleFormPatient);
        if (ruleFormPatient.id) {
          ElMessage.success("更新就诊人成功");
        } else {
          ElMessage.success("添加就诊人成功");
        }
        $emit("changeSceneAndGetPatients");
      } catch (error) {
        if (ruleFormPatient.id) {
          ElMessage.error("更新就诊人失败");
        } else {
          ElMessage.error("添加就诊人失败");
        }
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};

// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<script lang="ts">
export default {
  name: "AddOrEditPatient",
};
</script>

<style scoped lang="scss"></style>
