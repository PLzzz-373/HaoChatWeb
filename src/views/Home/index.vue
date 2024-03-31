<script setup lang="ts">


import { useImgPreviewStore, useVideoPreviewStore } from '@/stores/preview'

const imageStore = useImgPreviewStore()
const videoStore = useVideoPreviewStore()
</script>

<template>
  <main class="home">
    <div class="wrapper" ref="container">
      <RouterView/>
    </div>
    <footer class="footer">
      <a href="https://b23.tv/NMSMxsu"> gugugu</a>
    </footer>
    <el-image-viewer
      v-if="imageStore.isShowing"
      :z-index="5000"
      :initial-index="0"
      :zoom-rate="1.1"
      :hide-on-click-modal="true"
      :url-list="[imageStore.previewUrl]"
      @close="imageStore.close()"
    />
    <div v-if="videoStore.isPlaying" class="video-play" style="pointer-events: none">
      <Icon icon="guanbi1" class="close" :size="30" @click="videoStore.close()" />
      <VideoPlayer :url="videoStore.previewUrl" style="pointer-events: auto" />
    </div>
    <LoginBox/>
  </main>
</template>

<style lang="scss" src="./styles.scss" scoped />