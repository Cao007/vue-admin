<template>
  <div class="trademark-container">
    <el-card>
      <!-- 顶部按钮 -->
      <el-button type="primary" icon="Plus" @click="addTrademark">
        添加品牌
      </el-button>

      <!-- 表格 -->
      <el-table :data="trademarkList" :border="true">
        <el-table-column label="序号" width="80px" type="index">
        </el-table-column>

        <el-table-column label="品牌名称">
          <template #default="{ row }"> {{ row.tmName }} </template>
        </el-table-column>

        <el-table-column label="品牌logo">
          <template #default="{ row }">
            <img
              :src="row.logoUrl"
              style="width: 50px; height: 50px"
              alt="图片未加载"
            />
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="{ row, $index }">
            <el-button
              size="small"
              @click="editTrademark($index, row)"
              icon="Edit"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete($index, row)"
              icon="Delete"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="pageSizes"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>

    <!-- 对话框：表单 -->
    <el-dialog
      v-model="dialogFormVisible"
      title="新增品牌"
      width="500"
      draggable
    >
      <el-form :model="form">
        <el-form-item label="品牌名称" :label-width="80">
          <el-input v-model="form.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="品牌Logo" :label-width="80">
          <el-input v-model="form.logoUrl" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { trademarkListApi } from "@/api/product/trademark";
import type { Trademark } from "@/api/product/trademark/type";

const trademarkList = ref([] as Trademark[]);
const total = ref(0);
const currentPage = ref(1); // 当前页码page
const pageSize = ref(10); // 每页条数limit
const pageSizes = ref([10, 20, 30, 40, 50]);

// 获取品牌列表数据
const getTrademarkList = async () => {
  try {
    const res = await trademarkListApi({
      page: currentPage.value,
      limit: pageSize.value,
    });
    trademarkList.value = res.data.records;
    total.value = res.data.total;
  } catch (error) {
    console.log(error);
  }
};

// 当前页改变
const handleCurrentChange = (val: number) => {
  getTrademarkList();
  console.log(`current page: ${val}`);
};
// 每页条数改变
const handleSizeChange = (val: number) => {
  currentPage.value = 1;
  getTrademarkList();
  console.log(`${val} items per page`);
};

// 表格编辑
const handleEdit = (index: number, row: any) => {
  console.log(index, row);
};

// 表格删除
const handleDelete = (index: number, row: any) => {
  console.log(index, row);
};

// 对话框
const dialogFormVisible = ref(false);
const form = ref({
  tmName: "",
  logoUrl: "",
});

// 新增品牌
const addTrademark = () => {
  form.value = { tmName: "", logoUrl: "" };
  dialogFormVisible.value = true;
};

// 编辑品牌
const editTrademark = (index: number, row: any) => {
  dialogFormVisible.value = true;
  form.value = row;
};

// 删除品牌
const deleteTrademark = (index: number, row: any) => {
  console.log(index, row);
};

onMounted(async () => {
  getTrademarkList();
});
</script>

<style lang="scss" scoped>
.trademark-container {
  .el-table {
    height: 70vh;
    margin: 10px 0;
  }
}
</style>
