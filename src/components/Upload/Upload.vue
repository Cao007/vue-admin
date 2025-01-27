<template>
  <div class="upload-container">
    <el-upload class="avatar-uploader" :show-file-list="false" :on-change="handleAvatarChange" :auto-upload="false">
      <img v-if="props.avatar" :src="avatar" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon">
        <Plus />
      </el-icon>
    </el-upload>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import EnvConfig from '@/config';

// 接受父组件传递的avatar
const props = defineProps({
  avatar: {
    type: String,
    default: ''
  }
})

// 传递给父组件file.raw和URL.createObjectURL(file.raw)
const emit = defineEmits(['uploadaAvatar'])

const handleAvatarChange = (file: any) => {
  emit('uploadaAvatar', ref({
    file: file.raw,
    avatar: URL.createObjectURL(file.raw)
  }))
}

</script>

<style lang="scss" scoped>
.upload-container {
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
</style>