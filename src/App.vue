<script setup lang="ts">
import { RouterView } from 'vue-router'
// 全局导入 toast 样式
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
// element dark 模式
import 'element-plus/theme-chalk/dark/css-vars.css'
</script>

<template>
  <div class="app_wrapper">
    <RouterView />
  </div>
</template>

<style scoped>
.app_wrapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url(@/assets/login_bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
@supports (background-image: url('@/assets/login_bg.webp')) {
  .app-wrapper {
    background-image: url('@/assets/login_bg.webp');
  }
}
</style>
