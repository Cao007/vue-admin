<template>
  <template v-for="menu in userMenu">
    <el-sub-menu v-if="
      menu.children &&
      menu.children.length > 0 &&
      menu.children[0].menuType == 1
    " :key="menu._id" :index="menu.path">
      <template #title>
        <!-- <i :class="menu.icon"></i> -->
        <el-icon>
          <Setting />
        </el-icon>
        <span>{{ menu.menuName }}</span>
      </template>
      <tree-menu :userMenu="menu.children" />
    </el-sub-menu>
    <el-menu-item v-else-if="menu.menuType == 1" :index="menu.path">
      <template #title>
        <!-- <i :class="menu.icon"></i> -->
        <el-icon>
          <Setting />
        </el-icon>
        <span>{{ menu.menuName }}</span>
      </template>
    </el-menu-item>
  </template>

</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue';

// vue3方式使用props
const props = defineProps({
  userMenu: {
    type: Array as PropType<Array<{ _id: string, path: string, icon: string, menuName: string, menuType: number, children: Array<any> }>>,
    default: () => [],
  },
});
</script>