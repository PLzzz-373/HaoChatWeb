import { createAlova } from 'alova'
import VueHook from 'alova/vue'
import GlobalFetch from 'alova/GlobalFetch'
import { ElMessage } from 'element-plus'
function getToken(){
  let tempToken = ''
  return ()=>{
    if(tempToken) return tempToken
    const  token = localStorage.getItem('TOKEN')
    if(token){
      tempToken = token
    }
    return tempToken
  }
}
const token = getToken()
export const alovaIns = createAlova({
  baseURL:'',
  statesHook: VueHook,
  //请求适配器
  requestAdapter: GlobalFetch(),
  //全局拦截器设置
  beforeRequest({config}) {
    config.headers.Authorization = `Bearer ${token()}`
    config.headers['Content-Type'] = 'application/json; charset=utf-8'
  },
  // 响应拦截器，也与axios类似
  responsed: async (response) => {
    const json = await response.json()
    if (response.status !== 200 || !json.success) {
      // 这边抛出错误时，将会进入请求失败拦截器内
      if (json.errMsg) {
        !token && response.status !== 401 && ElMessage.error(json.errMsg)
        throw new Error(json.errMsg)
      } else {
        throw new Error(json.message)
      }
    }
    return json.data
  },
})