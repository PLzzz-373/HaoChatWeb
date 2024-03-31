<script setup lang="ts">

import { ref } from 'vue'
import apis from '@/services/apis'
import { useChatStore } from '@/stores/chat'
import { ElMessage } from 'element-plus'
const chatStore = useChatStore()
const isSelect = ref(false)
const inPutMsg = ref('')
const sendMsgHandler = ()=>{
  //空消息禁止发送
  if(!inPutMsg.value?.length){
    return
  }
  //发送消息
  apis
    .sendMsg({
      roomId:1,
      msgType:1,
      body:{
        content: inPutMsg.value
      }
    })
    .send()
    .then((res)=>{
      //消息列表新增一条消息
      chatStore.pushMsg(res)
      //清空输入列表
      inPutMsg.value=''
    })
    .catch((error)=>{
      ElMessage.error(error.message || '消息发送失败')
    })
}
</script>

<template>
  <div class="chat-box">
    <div class="chat-wrapper">
      <template v-if="isSelect">
        <ElIcon :size="160" color="#999"><IEpChatDotRound/></ElIcon>
      </template>
      <template v-else>
        <div class="chat">
          <ChatList/>
          <div class="chat-msg-send">
            <div class="msg-input-wrapper">
              <input type="text" class="msg-input" v-model="inputMsg" @keyup.enter="sendMsgHandler"/>
              <div class="chat-not-login-mask" :hidden="isSign">
                <ElIcon class="icon-lock">
                  <IEpLock/>
                </ElIcon>
                <a class="login-link" @click="onShowLoginBoxHandler">点我登录</a>之后再发言
              </div>
            </div>
            <button class="send-button":disabled="!inputMsg.length" @click="sendMsgHandler">🚀</button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" src="./styles.scss" scoped />