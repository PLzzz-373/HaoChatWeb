import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useImgPreviewStore = defineStore('image',()=>{
  const previewUrl = ref('')//图片预览链接
  const isShowing = ref(false)

  const show = (url:string) =>{
    previewUrl.value = url
    isShowing.value = true
  }

  const close = () =>{
    isShowing.value = false
    previewUrl.value = ''
  }
  return {
    previewUrl,
    isShowing,
    show,
    close,
  }

})
//视频预览
export const useVideoPreviewStore = defineStore('video', ()=>{
  const previewUrl = ref('')//预览链接
  const isPlaying = ref(false)
  const open = (url:string) => {
    previewUrl.value = url
    isPlaying.value = true
  }
  const close = () => {
    previewUrl.value = ''
    isPlaying.value = false
  }
  return {
    previewUrl,
    isPlaying,
    open,
    close,
  }
})