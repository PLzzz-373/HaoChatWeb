import type { CacheUserItem } from '@/services/types'
import { defineStore } from 'pinia'
import { useGlobalStore } from '@/stores/global'
import { reactive } from 'vue'


export type BaseUserItem = Pick<CacheUserItem, 'uid' | 'avatar' | 'name'>

export const useCachedStore = defineStore(
  'cached',
  ()=>{
    const globalStore = useGlobalStore()
    const userCachedList = reactive<Record<number,Partial<any>>
  }
)