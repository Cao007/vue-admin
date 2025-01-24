<template>
  <div class="login-container">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">

      <h2>vue后台管理系统</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" placeholder="请输入账号" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码" show-password />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          提交
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import router from '@/router'
import { login } from '@/api/index.ts'
import { useUserStore } from '@/stores/user'

interface RuleForm {
  username: string
  password: string
}

const ruleFormRef = ref<FormInstance>()

// 表单数据
const ruleForm = reactive<RuleForm>({
  username: '',
  password: '',
})

// 表单验证规则
const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '账号必填', trigger: 'blur' },
    { min: 1, max: 15, message: '长度在1~15', trigger: 'blur' },
  ],
  password: [
    {
      required: true,
      message: '密码必填',
      trigger: 'blur',
    },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      login(ruleForm)
        .then((res) => {
          if (res.data.code === 200) {
            // 将用户信息存储到pinia中
            const userStore = useUserStore()
            const { changeUserInfo } = userStore
            changeUserInfo(res.data.data)

            // 跳转首页
            router.push('/')

            ElMessage.success(res.data.message)
          } else {
            ElMessage.error(res.data.message)
          }
        })
        .catch((err) => {
          ElMessage.error(err);
        })
    } else {
      console.log('表单验证失败', fields);
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>

<style scoped lang="scss">
.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .el-form {
    display: flex;
    flex-direction: column;
    width: 400px;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 0 20px 6px rgba(0, 0, 0, 0.1);

    h2 {
      font-size: 30px;
      text-align: center;
      margin-bottom: 18px;
    }
  }
}
</style>