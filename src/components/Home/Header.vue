<template>
  <el-header>
    <el-row class="header-row">
      <el-col :span="12" class="header-left">
        <!-- 收缩/展开按钮 -->
        <el-icon :size="22" class="collapse-icon" @click="toggleSidebar">
          <DArrowRight v-if="isCollapse" />
          <DArrowLeft v-else />
        </el-icon>

        <!-- 面包屑 -->
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item v-for="item in breadcrumbList" :to="item.path">{{ item.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>

      <el-col :span="12" class="header-right">

        <!-- 语言切换 -->
        <span class="language">中/英</span>

        <!-- 搜索 -->
        <el-icon :size="22">
          <Search />
        </el-icon>

        <!-- 消息通知 -->
        <el-popover placement="bottom" :width="320" trigger="click">
          <template #reference>
            <el-badge :value="11" :max="99" :show-zero="false" :offset="[0, 0]">
              <el-icon :size="22">
                <Bell />
              </el-icon>
            </el-badge>
          </template>
          <el-tabs v-model="activeName" class="tabs" @tab-click="handleTabClick">
            <el-tab-pane label="通知(11)" name="first">
              <ul>
                <li>
                  <span>你好，我有一个帽衫</span>
                  <el-divider />
                </li>
                <li>
                  <span>你好，我有一个帽衫</span>
                  <el-divider />
                </li>
                <li>
                  <span>你好，我有一个帽衫</span>
                  <el-divider />
                </li>
                <li>
                  <span>你好，我有一个帽衫</span>
                  <el-divider />
                </li>
                <li>
                  <span>你好，我有一个帽衫</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="消息(0)" name="second">Config</el-tab-pane>
            <el-tab-pane label="待办(0)" name="third">Role</el-tab-pane>
          </el-tabs>
        </el-popover>


        <!-- 全屏 -->
        <el-tooltip effect="dark" content="全屏" placement="bottom" :hide-after="0">
          <el-icon :size="22" @click="handleFullScreen">
            <FullScreen />
          </el-icon>
        </el-tooltip>


        <!-- 头像下拉 -->
        <el-dropdown>
          <el-avatar :src="userInfo.avatar" :size="40" fit="cover">未显示</el-avatar>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="userInfoDialogVisible = true">个人信息</el-dropdown-item>
              <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <!-- 个人信息对话框 -->
        <el-dialog v-model="userInfoDialogVisible" title="个人信息" width="500" draggable>

          <el-form ref="userInfoRef" :model="userInfo" :rules="userInfoRules">

            <el-form-item label="姓名" label-width="120px" prop="username">
              <el-input v-model="userInfo.username" autocomplete="off" placeholder="请输入姓名" />
            </el-form-item>

            <el-form-item label="性别" label-width="120px">
              <el-select v-model="userInfo.gender" placeholder="请选择性别">
                <el-option label="女" :value="0" />
                <el-option label="男" :value="1" />
                <el-option label="保密" :value="2" />
              </el-select>
            </el-form-item>

            <el-form-item label="头像" label-width="120px" prop="file">
              <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :show-file-list="false" :on-change="handleAvatarChange" :auto-upload="false">
                <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </el-upload>
            </el-form-item>

            <el-form-item label="介绍" label-width="120px" prop="introduction">
              <el-input type="textarea" autosize v-model="userInfo.introduction" autocomplete="off"
                placeholder="请输入个人介绍" />
            </el-form-item>

            <el-form-item label="角色" label-width="120px">
              <h3>{{ userInfo.role === 0 ? '普通用户' : '管理员' }}</h3>
            </el-form-item>
          </el-form>

          <template #footer>
            <div class="dialog-footer">
              <el-button @click="userInfoDialogVisible = false">取消</el-button>
              <el-button type="primary" @click="submitForm(userInfoRef)">更新</el-button>
            </div>
          </template>
        </el-dialog>
      </el-col>
    </el-row>
  </el-header>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue'
import { useLayoutStore } from '@/stores/layout.ts';
import { useUserStore } from '@/stores/user.ts';
import { storeToRefs } from 'pinia';
import { ElMessageBox, type FormInstance, type FormRules, type TabsPaneContext } from 'element-plus';
import router from '@/router';
import { upload } from '@/api/index.ts';

/**
 * 面包屑
 */
const layoutStore = useLayoutStore();
const { isCollapse, breadcrumbList } = storeToRefs(layoutStore);
const { toggleSidebar } = layoutStore;


/**
 * 消息通知
 */
const activeName = ref('first')
const handleTabClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}


/**
 * 全屏
 */
const handleFullScreen = () => {
  const element = document.documentElement; // 获取整个文档
  if (!document.fullscreenElement) {
    // 如果当前不是全屏状态，则进入全屏
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ((element as any).mozRequestFullScreen) {
      (element as any).mozRequestFullScreen(); // Firefox
    } else if ((element as any).webkitRequestFullscreen) {
      (element as any).webkitRequestFullscreen(); // Chrome, Safari, Opera
    } else if ((element as any).msRequestFullscreen) {
      (element as any).msRequestFullscreen(); // IE/Edge
    }
  } else {
    // 如果已经是全屏状态，则退出全屏
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
  }
};


/**
 * 头像
 */
// 个人信息对话框
const userInfoDialogVisible = ref(false)
const userStore = useUserStore(); // userInfo是响应式数据，故保存在pinia中
const { userInfo } = storeToRefs(userStore);
const { clearUserInfo } = userStore;


userInfo.value = { // 表单数据
  ...userInfo.value,
  file: null
}

const userInfoRules = reactive<FormRules>({ // 表单验证规则
  username: [
    { required: true, message: '账号必填', trigger: 'change' },
    { min: 1, max: 15, message: '长度在1~15', trigger: 'change' },
  ],
  password: [
    { required: true, message: '密码必填', trigger: 'blur', },
  ],
  file: [
    { required: true, message: '头像必填', trigger: 'change' },
  ],
  introduction: [
    { required: true, message: '简介必填', trigger: 'change' },
    { min: 1, max: 100, message: '长度在1~100', trigger: 'change' },
  ]
})

// 个人信息确认按钮
const userInfoRef = ref<FormInstance>() // 表单实例
console.log('userInfo', userInfo.value);
const submitForm = async (userInfoRef: FormInstance | undefined) => {
  if (!userInfoRef) return
  await userInfoRef.validate((valid, fields) => {
    if (valid) {
      // 上传接口
      upload(userInfo)
        .then(res => {
          console.log('upload res', res);
          // userInfo.value.avatar = res.data.avatar
          // userInfo.value.username = res.data.username
          // userInfo.value.introduction = res.data.introduction
        })
        .catch(err => {
          console.log(err);
        })
      userInfoDialogVisible.value = false
    } else {
      console.log('表单验证失败', fields);
    }
  })
}

// 头像上传
const handleAvatarChange = (file: any) => {
  userInfo.value.file = file.raw
  userInfo.value.avatar = URL.createObjectURL(file.raw)
}

// 退出登录
const handleLogout = (done: () => void) => {
  ElMessageBox.confirm('确定要退出登录吗？')
    .then(() => {
      localStorage.removeItem('token'); // token不是响应式数据，故保存在localStorage中
      clearUserInfo(); // 清除pinia中的userInfo
      router.push('/login');
      ElMessage({
        type: 'success',
        message: '已经退出登录',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消退出登录',
      })
    })
}
</script>

<style scoped lang="scss">
.el-header {

  border-bottom: 1px solid #e6e6e6;

  .header-row {
    width: 100%;
    height: 100%;

    .header-left {
      display: flex;
      justify-content: start;
      align-items: center;

      .collapse-icon {
        cursor: pointer;
        margin-right: 20px;
      }
    }

    .header-right {
      display: flex;
      justify-content: end;
      align-items: center;

      .el-icon {
        cursor: pointer;
        margin-left: 20px;
      }

      .language {
        cursor: pointer;
      }

      .el-avatar {
        margin-left: 20px;
        cursor: pointer;
      }

      // 个人信息对话框，样式穿透
      :deep(.el-dialog) {
        .avatar-uploader .avatar {
          width: 178px;
          height: 178px;
          display: block;
        }

        .avatar-uploader .el-upload {
          border: 1px dashed var(--el-border-color);
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: var(--el-transition-duration-fast);
        }

        .avatar-uploader .el-upload:hover {
          border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          text-align: center;
        }
      }
    }
  }
}
</style>