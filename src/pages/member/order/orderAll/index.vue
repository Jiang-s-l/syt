<template>
  <div>
    <!-- 展示支付详情的结构 -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">挂号订单</div>
      </template>
      <div class="content">
        <div class="top">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="就诊人">
              <el-select
                v-model="formInline.patientId"
                placeholder="请选择患者名称"
                clearable
                @change="getMemberOrderList"
              >
                <el-option label="全部就诊人" value=""></el-option>
                <el-option
                  v-for="item in patientList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="订单状态">
              <el-select
                v-model="formInline.orderStatus"
                placeholder="请选择订单状态"
                clearable
                @change="getMemberOrderList"
              >
                <el-option label="全部订单" value=""></el-option>
                <el-option
                  v-for="(item, index) in orderStatusList"
                  :key="index"
                  :label="item.comment"
                  :value="item.status"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="bottom">
          <el-table :data="tableData" stripe>
            <el-table-column prop="reserveDate" label="就诊时间" />
            <el-table-column prop="hosname" label="医院" />
            <el-table-column prop="depname" label="科室" />
            <el-table-column prop="title" label="医生" />
            <el-table-column prop="amount" label="医事服务费" />
            <el-table-column prop="patientName" label="就诊人" />
            <el-table-column prop="param.orderStatusString" label="订单状态" />
            <el-table-column fixed="right" label="操作">
              <template #default="{ row }">
                <el-button
                  link
                  type="primary"
                  size="small"
                  @click.prevent="goDetail(row)"
                >
                  详情
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            style="margin-top: 15px"
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            :small="false"
            :disabled="false"
            background
            layout="prev, pager, next, jumper,->,sizes,total"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reqGetPatients } from "@/api/hospital";
import { PatientList, ResPatientData } from "@/api/hospital/type";
import { reqGetMemberOrderInfo, reqGetOrderStatus } from "@/api/member";
import {
  OrderStatusList,
  Records,
  ResMemberOrderInfo,
  ResOrderStatus,
} from "@/api/member/type";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

let $router = useRouter();

// 存储表单中所选中的筛选数据
const formInline = reactive({
  patientId: "",
  orderStatus: "",
});
// 存储当前会员所有就诊人信息
let patientList = ref<PatientList>([]);
// 存储当前会员所有订单状态信息
let orderStatusList = ref<OrderStatusList>([]);

// 存储表格数据
let tableData = ref<Records>([]);

// 当前分页器页码
let currentPage = ref<number>(1);
// 分页器一页显示条数
let pageSize = ref<number>(10);
// 会员订单总数
let total = ref<number>(0);

onMounted(() => {
  getMemberOrderList();
  getMemberAllPatientList();
  getOrderAllStatus();
});

// 获取当前会员所有就诊人信息
const getMemberAllPatientList = async () => {
  let result: ResPatientData = await reqGetPatients();
  // console.log("所有就诊人信息",result)
  if (result.code === 200) {
    patientList.value = result.data;
  }
};
// 获取当前会员所有订单状态信息
const getOrderAllStatus = async () => {
  let result: ResOrderStatus = await reqGetOrderStatus();
  console.log("订单状态信息", result);
  if (result.code === 200) {
    orderStatusList.value = result.data;
  }
};

// 获取会员订单列表
const getMemberOrderList = async () => {
  let result: ResMemberOrderInfo = await reqGetMemberOrderInfo(
    currentPage.value,
    pageSize.value,
    formInline.patientId,
    formInline.orderStatus
  );
  //   console.log(result);
  if (result.code == 200) {
    tableData.value = result.data.records;
    total.value = result.data.total;
  }
};

// 当前页码发生变化
// @ts-ignore
const handleCurrentChange = (val: number) => {
  //   console.log(`${val} items per page`);
  //   currentPage.value = val
  getMemberOrderList();
};
// 分页器一页数目发生变化
// @ts-ignore
const handleSizeChange = (val: number) => {
  //   console.log(`current page: ${val}`);
  //   pageSize.value = val
  getMemberOrderList();
};

// 点击表格详情按钮回调方法
const goDetail = (row: any) => {
  $router.push({
    path: "/member/order/",
    query: { id: row.id },
  });
};

</script>

<script lang="ts">
export default {
  name: "OrderAll",
};
</script>

<style scoped lang="scss">
.box-card {
  .card-header {
    color: #7f7f7f;
    font-weight: 900;
    font-size: 30px;
  }

  .content {
    .top {
      .demo-form-inline {
        .el-select {
          --el-select-width: 220px;
        }
      }
    }

    .bottom {
      width: 100%;
    }
  }
}
</style>
