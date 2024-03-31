import type { LoginInitResType, WsReqMsgContentType } from '@/utils/wsType'
import { WsRequestMsgType, WsResponseMessageType } from '@/utils/wsType'
import { LoginStatus, useWsLoginStore } from '@/stores/ws'
import { useUserStore } from '@/stores/user'


class WS{
  connection: WebSocket | null

  #tasks: WsReqMsgContentType[] = []
  #heartTimer: number | null = null
  #connectionReady: boolean = false

  constructor() {
    this.connection = new WebSocket('ws://127.0.0.1:8090')
    // 收到消息
    this.connection.addEventListener('message', this.onMessage)
    // 建立链接
    this.connection.addEventListener('open', this.#dealTasks)
    // 关闭连接
    this.connection.addEventListener('close', this.#onClose)
    // 连接错误
    this.connection.addEventListener('error', this.#onClose)
  }

  // 重置一些属性
  #onClose = () => {
    this.#connectionReady = false
    // 清除心跳定时器
    if (this.#heartTimer) {
      clearInterval(this.#heartTimer)
      this.#heartTimer = null
    }
  }

  // 检测登录状态
  #detectionLoginStatus = () => {
    const token = localStorage.getItem('TOKEN')
    if (token) {
      this.#send({
        type: WsRequestMsgType.Authorization,
        data: { token },
      })
      // 获取用户详情
      const userStore = useUserStore()
      userStore.getUserDetailAction()
    }
  }

  #dealTasks = () => {
    // 标识连接已建立
    this.#connectionReady = true

    // 先探测登录态
    this.#detectionLoginStatus()

    setTimeout(() => {
      const userStore = useUserStore()
      if (userStore.isSign) {
        // 心跳❤️检测
        this.#senHeartPack()

        // 处理堆积的任务
        this.#tasks.forEach((task) => {
          this.#send(task)
        })
      }
    }, 500)
  }

  // 发送心跳 10s 内发送
  #senHeartPack = () => {
    // 10s 检测心跳
    this.#heartTimer = setInterval(() => {
      this.#send({ type: WsRequestMsgType.HeartBeatDetection })
    }, 9900)
  }

  #send(msg: WsReqMsgContentType) {
    this.connection?.send(typeof msg === 'string' ? msg : JSON.stringify(msg))
  }

  send = (params: WsReqMsgContentType) => {
    if (this.#connectionReady) {
      this.#send(params)
    } else {
      // 放到队列
      this.#tasks.push(params)

    }
  }
  //收到消息回调
  onMessage = (e : MessageEvent) =>{
    const params: {type: WsResponseMessageType; data: unknown} = JSON.parse(e.data)
    const loginStore = useWsLoginStore()
    const userStore = useUserStore()

    switch (params.type){
      case WsResponseMessageType.LoginQrCode:{
        const data = params.data as LoginInitResType
        loginStore.loginQrCode = data.loginUrl
        break
      }
      case WsResponseMessageType.WaitingAuthorize:{
        loginStore.loginStatus = LoginStatus.Waiting
        break
      }
      case WsResponseMessageType.LoginSuccess:{
        userStore.isSign = false
        userStore.userInfo={}
        localStorage.removeItem('USER_INFO')
        localStorage.removeItem('TOKEN')
        loginStore.loginStatus = LoginStatus.Init
        break
      }
      case WsResponseMessageType.TokenExpired:{
        userStore.isSign = false
        userStore.userInfo = {}
        localStorage.removeItem('USER_INFO')
        localStorage.removeItem('TOKEN')
        loginStore.loginStatus = LoginStatus.Init
        break
      }
      default:{
        console.log('接收到未处理类型的消息',params)
        break
      }
    }
  }
}

export default new WS()