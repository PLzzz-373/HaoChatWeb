import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserInfoType } from '@/services/types'
import apis from '@/services/apis'


export const useUserStore = defineStore('user',()=>{
  const userInfo =  ref<Partial<UserInfoType>>({})
  const isSign = ref(false)

  let localUserInfo = {}
  try{
    localUserInfo = JSON.parse(localStorage.getItem('USER_INFO') || '{}')

  }catch (error){
    localUserInfo = {}
  }

  //从local读取

  if(!Object.keys(userInfo.value).length && Object.keys(localUserInfo).length){
    userInfo.value = localUserInfo
  }

  function getUserDetailAction() {
    apis
      .getUserDetail()
      .send()
      .then((data) => {
        userInfo.value = {...userInfo.value, ...data}
      })
  }

  return {userInfo,isSign,getUserDetailAction}
})