import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'


export const pageSize = 20
let isFirstInit = false

export const useChatStore =defineStore('chat',()={
  const route = useRoute()
  const cachedStore = useCacheStore()
})