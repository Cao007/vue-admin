<template>
  <div class="login-container">
    <div class="login-form">
      <h1>vue-admin管理系统</h1>
      <el-form
        ref="loginFormRef"
        :model="loginFormData"
        :rules="rules"
        label-width="auto"
        status-icon
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginFormData.username">
            <template #prefix>
              <svg-icon name="user" />
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginFormData.password"
            type="password"
            show-password
          >
            <template #prefix>
              <svg-icon name="password" />
            </template>
          </el-input>
        </el-form-item>

        <el-form-item class="bottom-btns">
          <el-button class="btn" type="primary" @click="submitForm">
            登录
          </el-button>
          <el-button class="btn" @click="resetForm(loginFormRef)"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElNotification, type FormInstance } from "element-plus";
import { ref, reactive } from "vue";
import { useUserStore } from "@/stores/modules/user";
import { useRouter, useRoute } from "vue-router";
import { getTime } from "@/utils/time";

const loginFormRef = ref();
const loginFormData = reactive({
  username: "admin",
  password: "111111",
});
const rules = reactive({
  username: [
    { required: true, message: "姓名必填", trigger: "blur" },
    { min: 3, max: 20, message: "长度在3~20", trigger: "blur" },
  ],
  password: [
    { required: true, message: "密码必填", trigger: "blur" },
    { min: 3, max: 20, message: "长度在3~20", trigger: "blur" },
  ],
});
const router = useRouter();
const route = useRoute();

const userStore = useUserStore();
const { login } = userStore;

const submitForm = async () => {
  if (!loginFormRef.value) return;

  try {
    await loginFormRef.value.validate();
    const res = await login(loginFormData);
    ElNotification({
      type: "success",
      title: res.message,
      message: `${getTime()}`,
    });
    router.push({ path: (route.query.redirect as string) || "/" });
  } catch (err: any) {
    // 业务上的请求失败,响应非200
    console.log(err);
  }
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form {
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 220px;
    background-color: #fff;
    padding: 0 20px;
    border-radius: 20px;
    box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.16),
      -3px -3px 6px rgba(0, 0, 0, 0.08), 0px 6px 10px rgba(0, 0, 0, 0.12);

    h1 {
      text-align: center;
      margin: 10px 0;
      font-size: 30px;
    }

    .el-form {
      flex: 1;

      .bottom-btns {
        display: flex;

        .btn {
          flex: 1;
        }
      }
    }
  }
}
</style>
