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

        <el-table-column label="id" width="80px" type="index">
          <template #default="{ row }"> {{ row.id }} </template>
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
          <template #default="{ row }">
            <el-button size="small" @click="editTrademark(row)" icon="Edit">
              编辑
            </el-button>
            <el-popconfirm
              width="240"
              :title="`确定要删除 ${row.tmName} 品牌吗`"
              @confirm="deleteTrademark(row.id)"
            >
              <template #reference>
                <el-button size="small" type="danger" icon="Delete">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 4, 5]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @change="getTrademarkList"
      />
    </el-card>

    <!-- 对话框：表单 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="dialogTitle"
      width="500"
      draggable
    >
      <el-form
        :model="trademarkFormData"
        ref="trademarkFormRef"
        :rules="trademarkFormRules"
      >
        <el-form-item label="品牌名称" :label-width="100" prop="tmName">
          <el-input v-model="trademarkFormData.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="品牌Logo" :label-width="100" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/common/uploads/aliyun"
            :headers="{
              Token: token,
            }"
            :show-file-list="false"
            :before-upload="handleBeforeUpload"
            :on-success="handleUploadSuccess"
          >
            <img
              v-if="trademarkFormData.logoUrl"
              :src="trademarkFormData.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogCancel">取消</el-button>
          <el-button type="primary" @click="dialogConfirm"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import {
  trademarkAddApi,
  trademarkDeleteApi,
  trademarkListApi,
  trademarkUpdateApi,
} from "@/api/product/trademark";
import type { Trademark } from "@/api/product/trademark/type";
import { ElMessage, type UploadProps } from "element-plus";
import { useUserStore } from "@/stores/modules/user";

// 获取用户信息
const userStore = useUserStore();
const { token } = userStore;

/**
 * 表格
 */
const trademarkList = ref([] as Trademark[]);
const total = ref(0);
const currentPage = ref(1); // 当前页码
const pageSize = ref(3); // 每页条数

// 获取品牌列表数据
const getTrademarkList = async () => {
  try {
    const res = await trademarkListApi({
      currentPage: currentPage.value,
      pageSize: pageSize.value,
    });
    trademarkList.value = res.data.trademarks;
    total.value = res.data.pagination.total;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// 新增品牌按钮
const addTrademark = () => {
  // 重置表单校验结果
  trademarkFormRef.value?.resetFields();
  // 重置表单数据
  trademarkFormData.value = {
    id: 0,
    tmName: "",
    logoUrl: "",
  };
  dialogTitle.value = "新增品牌";
  dialogFormVisible.value = true;
};

// 编辑品牌按钮
const editTrademark = (row: Trademark) => {
  // 重置表单数据和校验结果
  trademarkFormRef.value?.resetFields();
  // 回显数据，使用浅拷贝，防止引用问题
  trademarkFormData.value = { ...row };
  dialogTitle.value = "编辑品牌";
  dialogFormVisible.value = true;
};

// 删除品牌按钮
const deleteTrademark = async (id: number) => {
  try {
    const res = await trademarkDeleteApi(id);
    ElMessage.success(res.message);
    // 重新获取品牌列表数据
    getTrademarkList();
  } catch (error) {
    console.log(error);
    return false;
  }
};

/**
 * 对话框
 */
const dialogFormVisible = ref(false);
const dialogTitle = ref("");
// 表单实例
const trademarkFormRef = ref();
// 表单数据
const trademarkFormData = ref<Trademark>({
  id: 0,
  tmName: "",
  logoUrl: "",
});
// 表单校验规则
const trademarkFormRules = reactive({
  tmName: [
    { required: true, message: "请输入品牌名称", trigger: "blur" },
    {
      min: 1,
      max: 10,
      message: "品牌名称长度在 1 到 10 个字符",
      trigger: "blur",
    },
  ],
  logoUrl: [{ required: true, message: "请上传品牌Logo", trigger: "change" }],
});

// 图片上传之前
const allowedTypes = new Set(["image/jpeg", "image/png", "image/gif"]);
const handleBeforeUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (!allowedTypes.has(rawFile.type)) {
    ElMessage.error("文件格式不支持，仅支持 JPG、PNG 和 GIF");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error("文件大小不能超过 5MB");
    return false;
  }
  return true;
};

// 图片上传成功
const handleUploadSuccess: UploadProps["onSuccess"] = (response) => {
  // 回显图片
  trademarkFormData.value.logoUrl = response.data.file.url;
  // 清除掉对应图片校验结果
  trademarkFormRef.value?.clearValidate("logoUrl");
};

// 对话框取消按钮
const dialogCancel = () => {
  dialogFormVisible.value = false;
};

// 对话框确认按钮
const dialogConfirm = async () => {
  try {
    // 表单校验通过
    if (!trademarkFormRef) return;
    await trademarkFormRef.value.validate();

    // 发起请求
    if (trademarkFormData.value.id === 0) {
      const res = await trademarkAddApi(trademarkFormData.value);
      ElMessage.success(res.message);
    } else if (dialogTitle.value === "编辑品牌") {
      const res = await trademarkUpdateApi(
        trademarkFormData.value.id as number,
        trademarkFormData.value
      );
      ElMessage.success(res.message);
    }

    // 重新获取品牌列表数据
    getTrademarkList();
  } catch (error) {
    console.log(error);
    return false;
  }
  dialogFormVisible.value = false;
};

onMounted(async () => {
  getTrademarkList();
});
</script>

<style lang="scss" scoped>
.trademark-container {
  // 表格
  .el-table {
    height: 70vh;
    margin: 10px 0;
  }

  // 上传组件
  :deep(.avatar-uploader) {
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);

      &:hover {
        border-color: var(--el-color-primary);
      }

      // 图片
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }

      // 上传图标
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
      }
    }
  }
}
</style>
