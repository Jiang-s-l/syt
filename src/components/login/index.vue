<template>
  <div class="login_containter">
    <el-dialog
      v-model="userStore.loginDialogVisible"
      title="用户登录"
      @close="resetForm(ruleFormRef)"
    >
      <!-- 对话框主体内容结构 -->
      <el-row>
        <!-- 左侧结构：手机号码登录，微信扫一扫登录 -->
        <el-col :span="12">
          <div class="loginLeft">
            <!-- 手机登录 -->
            <div v-show="scene === 0">
              <el-form
                :model="userInfo"
                status-icon
                :rules="rules"
                ref="ruleFormRef"
              >
                <el-form-item prop="phone">
                  <el-input
                    v-model="userInfo.phone"
                    autocomplete="off"
                    placeholder="请输入手机号码"
                    :prefix-icon="User"
                    clearable
                  />
                </el-form-item>
                <el-form-item prop="code">
                  <el-input
                    v-model="userInfo.code"
                    autocomplete="off"
                    placeholder="请输入手机验证码"
                    :prefix-icon="Lock"
                    clearable
                    :disabled="!isPhone"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button
                    :disabled="!isPhone || countdownFlag"
                    @click="getCode"
                  >
                    <span v-if="!countdownFlag">获取验证码</span>
                    <CountDown
                      v-else
                      :countdownFlag="countdownFlag"
                      @getTimeFlag="getTimeFlag"
                    >
                    </CountDown>
                  </el-button>
                </el-form-item>
              </el-form>
              <div class="bottom">
                <el-button
                  style="width: 100%"
                  type="primary"
                  size="default"
                  @click="loginIn(ruleFormRef)"
                >
                  用户登录
                </el-button>
                <el-divider />
                <p>微信扫码登录</p>
                <svg
                  @click="changeScene"
                  style="cursor: pointer"
                  t="1692436272349"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4035"
                  width="48"
                  height="48"
                >
                  <path
                    d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                    fill="#28C445"
                    p-id="4036"
                  ></path>
                  <path
                    d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                    fill="#28C445"
                    p-id="4037"
                  ></path>
                </svg>
              </div>
            </div>
            <!-- 微信扫码登录 -->
            <div class="wechat" v-show="scene === 1">
              <div id="wx_container"></div>
              <el-divider />
              <div class="phone">
                <p>手机短信验证码登录</p>
                <svg
                  @click="changePhoneLogin"
                  t="1704294124337"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4248"
                  width="48"
                  height="48"
                >
                  <path
                    d="M512 884.053333c-40.96 0-75.093333-34.133333-75.093333-75.093333s34.133333-75.093333 75.093333-75.093333 75.093333 34.133333 75.093333 75.093333S552.96 884.053333 512 884.053333zM512 771.413333c-20.48 0-37.546667 17.066667-37.546667 37.546667s17.066667 37.546667 37.546667 37.546667c20.48 0 37.546667-17.066667 37.546667-37.546667S532.48 771.413333 512 771.413333z"
                    fill="#FF9000"
                    p-id="4249"
                  ></path>
                  <path
                    d="M679.253333 993.28c-3.413333 0-6.826667 0-10.24-3.413333-40.96-23.893333-109.226667-23.893333-109.226667-23.893333l0 0L276.48 965.973333c-54.613333 0-98.986667-44.373333-98.986667-98.986667L177.493333 139.946667c0-54.613333 44.373333-98.986667 98.986667-98.986667l471.04 0c54.613333 0 98.986667 44.373333 98.986667 98.986667l0 727.04c0 54.613333-44.373333 98.986667-98.986667 98.986667-10.24 0-17.066667-6.826667-17.066667-17.066667s6.826667-17.066667 17.066667-17.066667c34.133333 0 61.44-27.306667 61.44-61.44L808.96 139.946667c0-34.133333-27.306667-61.44-61.44-61.44L276.48 78.506667c-34.133333 0-61.44 27.306667-61.44 61.44l0 727.04c0 34.133333 27.306667 61.44 61.44 61.44l283.306667 0c3.413333 0 78.506667 0 126.293333 30.72 10.24 6.826667 10.24 17.066667 6.826667 23.893333C692.906667 989.866667 686.08 993.28 679.253333 993.28z"
                    fill="#FF9000"
                    p-id="4250"
                  ></path>
                  <path
                    d="M590.506667 150.186667l-153.6 0c-10.24 0-17.066667-6.826667-17.066667-17.066667s6.826667-17.066667 17.066667-17.066667l153.6 0c10.24 0 17.066667 6.826667 17.066667 17.066667C607.573333 139.946667 600.746667 150.186667 590.506667 150.186667z"
                    fill="#FF9000"
                    p-id="4251"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :span="12">
          <div class="loginRight">
            <div class="top">
              <div class="item">
                <img src="@/assets/images/code_app.png" alt="二维码" />
                <svg
                  t="1685263287521"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2450"
                  width="16"
                  height="16"
                >
                  <path
                    d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                    fill="#cdcdcd"
                    p-id="2451"
                  ></path>
                  <path
                    d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                    fill="#cdcdcd"
                    p-id="2452"
                  ></path>
                </svg>
                <p>微信扫一扫关注</p>
                <p>“快速预约挂号”</p>
              </div>
              <div class="item">
                <img src="@/assets/images/code_app.png" alt="二维码" />
                <svg
                  t="1685263518283"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3668"
                  width="16"
                  height="16"
                >
                  <path
                    d="M256 85.333333h512c64.8 0 117.333333 52.533333 117.333333 117.333334v618.666666c0 64.8-52.533333 117.333333-117.333333 117.333334H256c-64.8 0-117.333333-52.533333-117.333333-117.333334V202.666667c0-64.8 52.533333-117.333333 117.333333-117.333334z m0 64a53.333333 53.333333 0 0 0-53.333333 53.333334v618.666666a53.333333 53.333333 0 0 0 53.333333 53.333334h512a53.333333 53.333333 0 0 0 53.333333-53.333334V202.666667a53.333333 53.333333 0 0 0-53.333333-53.333334H256z m170.666667 618.666667a32 32 0 0 1 0-64h170.666666a32 32 0 0 1 0 64H426.666667z"
                    fill="#000000"
                    p-id="3669"
                  ></path>
                </svg>
                <p>扫一扫下载</p>
                <p>“预约挂号”APP</p>
              </div>
            </div>
          </div>
          <p class="tip">尚医通官方指定平台</p>
          <p class="tip">快速挂号 安全放心</p>
        </el-col>
      </el-row>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            @click="
              userStore.loginDialogVisible = false;
              resetForm(ruleFormRef);
            "
          >
            关闭
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useUserStore from "@/store/modules/user";
import { computed, reactive, ref, watch } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
// import { reqCode } from '@/api/hospital';
import { ElMessage, FormRules, FormInstance } from "element-plus";
import CountDown from "@/components/countdown/index.vue";
import { reqWxLogin } from "@/api/hospital";
import { useRoute, useRouter } from "vue-router";
// import { ResWxLogin } from '@/api/hospital/type';

// 定义控制获取验证码倒计时显示与隐藏标志（为flase不显示倒计时，为true显示倒计时）
let countdownFlag = ref<boolean>(false);

// 获取user仓库中的数据，可以控制对话框的显示与隐藏
const userStore = useUserStore();

let $route = useRoute();
let $router = useRouter();

const userInfo = reactive({
  phone: "", //手机号码
  code: "", //验证码
});

//计算出当前表单元素收集的内容‘手机号码’格式是否正确
let isPhone = computed(() => {
  //手机号码正则表达式
  const reg =
    /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
  //返回布尔值:真代表手机号码、假代表的即为不是手机号码
  //   console.log(userInfo.phone)
  return reg.test(userInfo.phone);
});

//获取验证码按钮的回调
const getCode = async () => {
  // console.log("点击了获取验证码", "isPhone:" + isPhone.value, "countdownFlag:" + countdownFlag.value)
  // 开启倒计时模式
  countdownFlag.value = true;

  //法一：直接调用获取验证码接口
  /* let result = await reqCode(userInfo.phone)
    // console.log(result.data)
    if (result.code === 200) {
        userInfo.code = result.data;
        console.log(userInfo)
    }else{
        ElMessage.error((error as Error).message)
    }
    */

  //法二：使用pinia仓库并存储验证码
  // userStore.getCode(userInfo.phone) 返回一个Promise对象，使用try/catch方法
  try {
    // 返回验证码成功
    await userStore.getCode(userInfo.phone);
    userInfo.code = userStore.code;
    ElMessage({
      message: "获取手机验证码成功",
      type: "success",
    });
  } catch (error) {
    // 返回验证码失败
    ElMessage.error((error as Error).message);
    userInfo.code = "";
  }
};

// 获取验证码按钮倒计时结束标志回调
const getTimeFlag = (timeFlag: boolean) => {
  // timeFlag为false表示倒计时结束
  if (!timeFlag) {
    countdownFlag.value = false;
  }
};

// 登录表单校验
// 获取form表单ref实例
const ruleFormRef = ref<FormInstance>();
// 自定义手机号码校验规则
// @ts-ignore
const validatePhone = (rule: any, value: any, callback: any) => {
  // rule：即为表单验证对象
  // value：即为输入内容
  // callback：回调函数
  const reg =
    /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("请输入正确的手机号码格式"));
  }
};
// 自定义验证码校验规则
// @ts-ignore
const validateCode = (rule: any, value: any, callback: any) => {
  if (/^\d{6}$/.test(value)) {
    callback();
  } else {
    callback(new Error("请输入正确的验证码格式"));
  }
};
const rules = reactive<FormRules<typeof userInfo>>({
  phone: [{ validator: validatePhone, trigger: "blur" }],
  code: [{ validator: validateCode, trigger: "blur" }],
});

// 点击用户登录按钮
const loginIn = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      //校验成功
      // 发起登录请求
      // 登录请求成功，顶部组件展示用户名称，并关闭弹窗
      // 登录失败，提示错误信息
      try {
        await userStore.userLogin(userInfo);
        // 登录成功，关闭对话框
        userStore.loginDialogVisible = false;
        ElMessage({
          message: "登录成功",
          type: "success",
        });
        // 获取url的query参数，看是不是在登录前了不让跳转的页面
        let { redirect }: any = $route.query;
        if (redirect) {
          $router.push(redirect);
        } else {
          $router.push("/home");
        }
      } catch (error) {
        ElMessage.error((error as Error).message);
      }
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

// 关闭弹窗按钮
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  setTimeout(() => {
    scene.value = 0;
  }, 500);
};

// 0代表收集号码登录  如果是1 微信扫码登录
let scene = ref<number>(0);
//点击微信小图标切换为微信扫码登录
const changeScene = async () => {
  // 切换场景为1(展示微信扫码页面)
  scene.value = 1;

  // 向后台发送请求，获取生成微信扫码的二维码页面的参数
  //还需要携带一个参数:告诉学校服务器用户授权成功以后重定向项目某一个页面
  let redirect_URL = encodeURIComponent(window.location.origin + "/wxlogin");
  // let result:ResWxLogin = await reqWxLogin(redirect_URL)//(ResWxLogin报红)
  let result: any = await reqWxLogin(redirect_URL);
  // console.log("获取生成微信扫码的二维码页面的参数",result)

  // 生成微信扫码的二维码页面
  // 参数查看网址https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html
  /* 
        self_redirect	否	true：手机点击确认登录后可以在 iframe 内跳转到 redirect_uri，
                            false：手机点击确认登录后可以在 top window 跳转到 redirect_uri。默认为 false。
        id	    是	第三方页面显示二维码的容器id
        appid	是	应用唯一标识，在微信开放平台提交应用审核通过后获得
        scope	是	应用授权作用域，拥有多个作用域用逗号（,）分隔，网页应用目前仅填写snsapi_login即可
        redirect_uri	是	重定向地址，需要进行UrlEncode(就是用户授权成功后，微信服务器向公司后台推送code的地址)
        state	否	用于保持请求和回调的状态，授权请求后原样带回给第三方。（就是公司服务器重定向的地址并携带用户信息）
                    该参数可用于防止csrf攻击（跨站请求伪造攻击），建议第三方带上该参数，可设置为简单的随机数加session进行校验
        style	否	提供"black"、"white"可选，默认为黑色文字描述。二维码外观
        href	否	自定义样式链接，第三方可根据实际需求覆盖默认样式。详见文档底部FAQ
    */
  // @ts-ignore（忽略ts警告）
  var obj = new WxLogin({
    self_redirect: true,
    id: "wx_container",
    appid: result.data.appid,
    scope: "snsapi_login",
    redirect_uri: result.data.redirectUri,
    state: result.data.state,
    style: "black",
    href: "",
  });
};

// 点击手机小图标切换为手机验证码登录
const changePhoneLogin = () => {
  scene.value = 0;
};

// 监听场景数值
watch(
  scene,
  (newVal: number) => {
    // console.log(newVal);
    if (newVal === 1) {
      userStore.queryState();
    }
  },
  { immediate: true }
);
</script>

<script lang="ts">
export default {
  name: "Login",
};
</script>

<style scoped lang="scss">
.login_containter {
  // 修改element-plus中el-dialog的class值，使用深度选择器
  ::v-deep(.el-dialog__body) {
    //弹框身体部分上下边框
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }

  .loginLeft {
    border: 1px solid #ccc;
    padding: 20px;

    .wechat {
      display: flex;
      flex-direction: column;
      align-items: center;

      .phone {
        display: flex;
        flex-direction: column;
        align-items: center;

        p {
          margin: 0px 0px 10px 0px;
        }

        svg {
          cursor: pointer;
        }
      }
    }

    .bottom {
      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        margin: 0px 0px 10px 0px;
      }
    }
  }

  .loginRight {
    .top {
      display: flex;
      justify-content: space-around;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          width: 130px;
          height: 130px;
        }

        p {
          margin: 5px 0px;
        }
      }
    }
  }

  .tip {
    text-align: center;
    margin: 20px 0px;
    font-size: 20px;
    font-weight: 900;
  }
}
</style>
