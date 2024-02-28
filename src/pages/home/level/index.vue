<template>
  <div class="level">
    <h1>医院</h1>
    <div class="content">
      <div class="left">等级：</div>
      <ul class="hospital">
        <li :class="{ active: levelActiveFLag == '' }" @click="changeLevel('')">
          全部
        </li>
        <li
          v-for="item in hospitalLevelList"
          :class="{ active: levelActiveFLag == item.value }"
          :key="item.value"
          @click="changeLevel(item.value)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reqHospitalLevelAndRegion } from "@/api/home";
import {
  HospitalLAndRtResData,
  HospitalLevelAndRegionList,
} from "@/api/home/type";
import { onMounted, ref } from "vue";

// 存储所有医院等级信息
let hospitalLevelList = ref<HospitalLevelAndRegionList>([]);

onMounted(() => {
  getHospitalLevelList();
});

// 获取医院所有等级信息
const getHospitalLevelList = async () => {
  let result: HospitalLAndRtResData = await reqHospitalLevelAndRegion(
    "Hostype"
  );
  // console.log("获取到的医院等级信息", result);
  if (result.code === 200) {
    hospitalLevelList.value = result.data;
  }
};

// 自定义事件
const emit = defineEmits(['getLevel']);

// 存储医院等级高亮响应式数据
let levelActiveFLag = ref<string>("");
// 所选医院等级改变时
const changeLevel = (level: string) => {
  levelActiveFLag.value = level;
  //触发自定义事件:将医院等级参数回传给父组件
  emit("getLevel",level)
};
</script>

<script lang="ts">
export default {
  name: "Level",
};
</script>

<style scoped lang="scss">
.level {
  margin-top: 10px;
  color: #7f7f7f;

  h1 {
    font-weight: 900;
    margin: 10px 0px;
  }

  .content {
    margin: 20px 0px;
    display: flex;

    .left {
      // 文本内的换行无效
      white-space: nowrap;
    }

    .hospital {
      display: flex;

      li {
        margin-right: 20px;

        &.active {
          color: rgb(0, 174, 255);
        }
      }

      :hover {
        color: rgb(0, 174, 255);
        // 设置光标的类型,在鼠标指针悬停在元素上时显示小手
        cursor: pointer;
      }
    }
  }
}
</style>
