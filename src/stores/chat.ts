import { defineStore } from 'pinia'
import { ref } from 'vue'


export const pageSize = 20

export const useChatStore = defineStore('chat',()=>{
  //消息列表滚动到底部事件
  const chatListToBottomAction = ref<()=>void>()
  //消息列表
  const chatMessageList = ref<MessageItemType[]>
})