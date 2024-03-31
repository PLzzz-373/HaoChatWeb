<script setup lang="ts">
import QrCode from 'qrcode.vue'
import { LoginStatus, useWsLoginStore } from '@/stores/ws'
import { computed, watchEffect } from 'vue'


const loginStore = useWsLoginStore()
const visible = computed({
  get(){
    return loginStore.showLogin
  },
  set(value){
    loginStore.showLogin = value
  }
})
const loginQrcode = computed(()=>loginStore.loginQrCode)
const loginStatus = computed(()=>loginStore.loginStatus)

watchEffect(()=>{
  //打开了窗口 并且 二维码还没获取
  if(visible.value && !loginQrcode.value){
    //获取登录二维码
    loginStore.getLoginQrCode()
  }
})


</script>

<template>
  <ElDialog class="login-box-modal" :width="376" v-model="visible" center>
    <div class="login-box">
      <img src="@/assets/logo.jpeg" alt="HaoChat" class="login-logo">
      <p class="login-slogan">好聊~</p>
      <div class="login-qrcode-wrapper" v-loading="!loginQrcode">
        <QrCode class="login-qrcode"
                v-if="loginQrcode"
                :value="loginQrcode"
                :size="328"
                :margin="5"
        />
      </div>

      <p class="login-desc" v-if="loginStatus === LoginStatus.Waiting">
        <ElIcon class="login-desc-icon" :size="32" color="var(--color-wechat)">
          <IEpSuccessFilled/>
        </ElIcon>
        扫码成功~，点击“登录”继续登录
      </p>
      <p class="login-desc" v-if="loginStatus === LoginStatus.Init">
        使用「<strong class="login-desc-bold">微信</strong>」扫描二维码登录~~
      </p>
    </div>

  </ElDialog>
</template>

<style lang="scss" src="./styles.scss" scoped>

</style>