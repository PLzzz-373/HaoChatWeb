import { useWsLoginStore, LoginStatus } from '@/stores/ws'
import { useUserStore } from '@/stores/user'

// 1.登录返回二维码 2.用户扫描成功等待授权 3.用户登录成功返回用户信息 4.收到消息 5.上下线推送 6.前端token失效
export enum MessageType {
  /**
   * 1.登录返回二维码
   */
  LoginQrCode = 1,
  /**
   * 2.用户扫描成功等待授权
   */
  WaitingAuthorize,
  /**
   * 3.用户登录成功返回用户信息
   */
  LoginSuccess,
  /**
   * 4.收到消息
   */
  ReceiveMessage,
  /**
   * 5.上下线推送
   */
  OnOffLine,
  /**
   * 6.前端token失效
   */
  TokenExpired
}

class WS {
  connection: WebSocket | null

  #tasks: string[] = []
  #connectionReady: boolean = false

  constructor() {
    this.connection = new WebSocket('ws://123.207.254.89:8090')
    this.connection.addEventListener('message', this.onMessage)
    this.connection.addEventListener('open', this.#dealTasks)
  }

  #dealTasks = () => {
    this.#connectionReady = true
    this.#tasks.forEach((task) => {
      this.connection?.send(task)
    })
  }

  send = (params: string) => {
    if (this.#connectionReady) {
      this.connection?.send(params)
    } else {
      // 放到队列
      this.#tasks.push(params)
    }
  }

  onMessage = (e: MessageEvent) => {
    const params: { type: MessageType; data: { loginUrl: string } } = JSON.parse(e.data)
    const loginStore = useWsLoginStore()
    const userStore = useUserStore()
    switch (params.type) {
      case MessageType.LoginQrCode: {
        loginStore.loginQrCode = params.data.loginUrl
        break
      }
      case MessageType.WaitingAuthorize: {
        loginStore.loginStatus = LoginStatus.Waiting
        break
      }
      case MessageType.LoginSuccess: {
        //
        // {
        //   "uid": 10000,
        //   "avatar": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erIJoJWYBGtV9aBemHLFQEcJvFUURZyv3mfvbiadPgIKas9XBKlzRpyWiboV4VV4cz7BbXiaoLfgeFjg/132",
        //   "token": "10000",
        //   "name": "🐳 康康"
        // }
        userStore.userInfo = params.data
        loginStore.loginStatus = LoginStatus.Success
        break
      }
      default: {
        console.log('接收到未处理类型的消息:', params)
        break
      }
    }
  }
}

export default new WS()
