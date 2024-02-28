/// <reference types="vite/client" />


// 解决vue3+ts报错：找不到模块“./App.vue”或其相应的类型声明
/* declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const vueComponent: DefineComponent<{}, {}, any>;
  export default vueComponent;
}
 */

// 解决无法找到模块“element-plus/dist/locale/zh-cn.mjs”的声明文件
declare module "element-plus/dist/locale/zh-cn.mjs"
