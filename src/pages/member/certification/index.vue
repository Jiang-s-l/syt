<template>
  <div>
    <!-- 展示实名认证的结构 -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">实名信息</div>
      </template>
      <!-- 展示提示结构 -->
      <div class="tip">
        <el-icon>
          <InfoFilled />
        </el-icon>
        <p>
          完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。
        </p>
      </div>
      <!-- 已实名认证底部的结构 -->
      <div v-if="memberInfo?.authStatus === 1">
        <el-descriptions :column="1" size="default" border>
          <el-descriptions-item width="0" label-align="center">
            <template #label> 用户姓名 </template>
            {{ memberInfo?.name }}
          </el-descriptions-item>
          <el-descriptions-item width="0" label-align="center">
            <template #label> 证件类型 </template>
            {{ memberInfo?.certificatesType === "10" ? "身份证" : "户口本" }}
          </el-descriptions-item>
          <el-descriptions-item width="5" label-align="center">
            <template #label> 证件号码 </template>
            {{ memberInfo?.certificatesNo }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <!-- 未实名认证底部结构 -->
      <div v-else class="form">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          status-icon
        >
          <el-form-item label="用户姓名" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入用户姓名" />
          </el-form-item>
          <el-form-item label="证件类型" prop="certificatesType">
            <el-select
              v-model="ruleForm.certificatesType"
              placeholder="请选择证件类型"
            >
              <el-option
                v-for="(item, index) in certificationList"
                :key="index"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码" prop="certificatesNo">
            <el-input
              v-model="ruleForm.certificatesNo"
              placeholder="请输入证件号码"
            />
          </el-form-item>
          <el-form-item label="上传证件" prop="certificatesUrl">
            <!--               
                :auto-upload="false" 
                v-model:file-list="fileList"

            -->
            <el-upload
              ref="upload"
              action="/api/oss/file/fileUpload?fileHost=userAuah"
              list-type="picture-card"
              :limit="1"
              :on-exceed="handleExceed"
              :on-success="handleSuccess"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <img
                style="width: 100%; height: 100%"
                src="../../../assets/images/auth_example.png"
                alt="上传示例图片"
              />
            </el-upload>
            <!-- 上传图片预览的弹框 -->
            <el-dialog v-model="dialogImageVisible">
              <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
              提交
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { InfoFilled } from "@element-plus/icons-vue";
import {
  CertificationTypeList,
  MemberInfo,
  ResCertificationType,
  ResMemberInfo,
  MemberParam,
} from "@/api/member/type";
import { onMounted, reactive, ref } from "vue";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import {
  reqCertificate,
  reqCertificationType,
  reqGetMemberInfo,
} from "@/api/member";
import type { UploadInstance, UploadProps } from "element-plus";
import useUserStore from "@/store/modules/user";

let userStore = useUserStore()

onMounted(() => {
  getMemberInfo();
  getCertificationType();
});

// 表单设置ref
const ruleFormRef = ref<FormInstance>();
// 实名认证表单数据
const ruleForm = reactive<MemberParam>({
  certificatesNo: "",
  certificatesType: "",
  certificatesUrl: "",
  name: "",
});

// 存储会员信息
let memberInfo = ref<MemberInfo>();
// 获取当前用户的会员信息
const getMemberInfo = async () => {
  let result: ResMemberInfo = await reqGetMemberInfo();
  // console.log("会员信息",result)
  if (result.code === 200) {
    memberInfo.value = result.data;
  }
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

// 定义upload组件标识
let upload = ref<UploadInstance>();
// 上传实名认证图片数量超过1的回调方法
const handleExceed = () => {
  ElMessage.error("图片只能上传一张");
};

// 上传实名认证图片成功
const handleSuccess = (response: any, uploadFile: any) => {
  //   console.log("图片上传成功回调", response);
  if (response.code === 200) {
    ruleForm.certificatesUrl = URL.createObjectURL(uploadFile.raw!);
    // 图片上传成功，清除证件图片的验证规则
    ruleFormRef.value?.clearValidate('certificatesUrl')
  }
};

// 图片预览的图片地址
const dialogImageUrl = ref("");
// 图片预览的弹窗是否出现
const dialogImageVisible = ref(false);
// 实名认证上传图片预览回调
const handlePictureCardPreview: UploadProps["onPreview"] = (
  uploadFile: any
) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogImageVisible.value = true;
};

// 删除实名认证图片回调方法
const handleRemove: UploadProps["onRemove"] = () => {
  //清除表单的上传图片路径
  ruleForm.certificatesUrl = "";
};

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
// 实名认证表单校验规则
const rules = reactive<FormRules<MemberParam>>({
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

  certificatesUrl: [{ required: true, message: "请选择上传证件图片", trigger: "change" },],
});

// 提交实名认证表单数据
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      // console.log("submit!",ruleForm);
      let result: any = await reqCertificate(ruleForm);
      // console.log(result)
      if (result.code === 200) {
        ElMessage.success("认证成功");
        // 重新获取会员信息
        getMemberInfo();
        modifyUserName()
      } else {
        console.log("error submit!", fields);
        ElMessage.error("认证失败");
      }
    } else {
      console.log("error submit!", fields);
      ElMessage.warning("请将信息输入正确后，再点击提交按钮");
    }
  });
};

// 重置实名认证表单数据
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  //清空已上传的图片
  upload.value!.clearFiles();
  formEl.resetFields();
};

// 实名认证通过后修改登录名称
const modifyUserName = ()=>{
  let token = JSON.parse(localStorage.getItem("userInfo") as string).token
  let userInfo = {name:ruleForm.name,token:token}
  localStorage.setItem('userInfo',JSON.stringify(userInfo)) 
  userStore.setUserInfo()
  console.log(name)
}
</script>

<script lang="ts">
export default {
  name: "Certification",
};
</script>

<style scoped lang="scss">
.box-card {
  .card-header {
    color: #7f7f7f;
    font-weight: 900;
    font-size: 30px;
  }

  .tip {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #7f7f7f;
    margin: 10px 0 30px 0;
  }

  .form {
    width: 50%;
    margin: 20px auto;
  }
}
</style>
