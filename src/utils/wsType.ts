import type { UserInfoType } from '@/services/types'


export enum WsResponseMessageType{
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
  TokenExpired,
}
export enum WsRequestMsgType {
  /**
   * 1.请求登录二维码
   */
  RequestLoginQrCode = 1,
  /**
   * 2心跳检测
   */
  HeartBeatDetection,
  /**
   * 3用户认证
   */
  Authorization,

  LOGOUT
}

export type WsReqMsgContentType = { type: WsRequestMsgType; data?: Record<string, unknown> }
export type LoginInitResType = { loginUrl: string }

export type LoginSuccessResType = Pick<UserInfoType, 'avatar' | 'name' | 'uid'> & {
  /**
   * 用户的登录凭证，每次请求携带
   */
  token: string
}
