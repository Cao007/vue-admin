<template>
  <svg aria-hidden="true" :style="{ width, height, color }">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "SvgIcon",
  props: {
    prefix: {
      type: String,
      default: "icon",
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#666666",
    },
    width: {
      type: String,
      default: "16px",
    },
    height: {
      type: String,
      default: "16px",
    },
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`);
    return { symbolId };
  },
});
</script>
