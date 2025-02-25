<template>
  <div class="trademark-container">
    <el-card>
      <!-- 顶部按钮 -->
      <el-button type="primary" icon="Plus"> 添加品牌 </el-button>
      <!-- 表格 -->
      <el-table :data="tableData" :border="true" width="100%" :key="tableKey">
        <el-table-column label="序号" width="80px">
          <template #default="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column label="品牌名称">
          <template #default="scope"> 123 </template>
        </el-table-column>

        <el-table-column label="品牌logo">
          <template #default="scope"> 123 </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
            >
              Edit
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <Pagination></Pagination>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const tableData: any = [];

const handleEdit = (index: number, row: any) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: any) => {
  console.log(index, row);
};

const tableKey = ref(0);

const handleResize = () => {
  tableKey.value++; // 触发表格重新渲染
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style lang="scss" scoped>
.trademark-container {
  .el-table {
    margin: 10px 0;
  }
}
</style>
