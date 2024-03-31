import { defineStore } from 'pinia'
import { useChatStore } from '@/stores/chat'
import { reactive, ref, watch } from 'vue'
import type { ContactItem, RequestFriendItem } from '@/services/types'
import { RoomTypeEnum } from '@/enums'


export const useGlobalStore = defineStore('global',()=>{
  const chatStore = useChatStore()
  const unReadMark = reactive<{newFriendUnreadCount: number;newMsgUnreadCount: number }>({
    newFriendUnreadCount: 0,
    newMsgUnreadCount: 0,
  })
  const currentReadUnreadList = reactive<{ show: boolean; msgId: number | null }>({
    show: false,
    msgId: null,
  })
  const currentSession = reactive<{ roomId: number; type: RoomTypeEnum }>({
    roomId: 1,
    type: RoomTypeEnum.Group,
  })
  /** 点击联系人选中的联系人项 */
  const currentSelectedContact = ref<ContactItem | RequestFriendItem>()
  const addFriendModalInfo = reactive<{ show: boolean; uid?: number }>({
    show: false,
    uid: undefined,
  })
  // 创建群聊
  const createGroupModalInfo = reactive<{
    show: boolean
    isInvite: boolean
    selectedUid: number[]
  }>({
    show: false,
    isInvite: false,
    selectedUid: [],
  })
  return {
    unReadMark,
    currentSession,
    addFriendModalInfo,
    currentSelectedContact,
    currentReadUnreadList,
    createGroupModalInfo,
  }
})