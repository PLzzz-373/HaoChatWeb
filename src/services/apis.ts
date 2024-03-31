import { alovaIns } from '@/services/request'
import type {
  BadgeType,
  CacheBadgeItem,
  CacheBadgeReq, CacheUserItem, CacheUserReq, ContactItem, EmojiItem, GroupDetailReq,
  ListResponse,
  MarkMsgReq, MessageReq,
  MessageType, RequestFriendItem, SessionItem,
  UserInfoType
} from '@/services/types'
import urls from '@/services/urls'
const getRequest = <T>(url: string, config?: any) =>
  alovaIns.Get<T>(url, { ...config, localCache: 0 })
const postRequest = <T>(url: string, params?: any) => alovaIns.Post<T, unknown>(url, params)
const putRequest = <T>(url: string, params?: any) => alovaIns.Put<T, unknown>(url, params)
const deleteRequest = <T>(url: string, params?: any) => alovaIns.Delete<T, unknown>(url, params)
export default {
  /** 获取用户详细信息 */
  getUserDetail: () => getRequest<UserInfoType>(urls.getUserInfoDetail),
  /** 批量获取徽章信息 */
  getBadgesBatch: (badges: CacheBadgeReq[]) =>
    postRequest<CacheBadgeItem[]>(urls.getBadgesBatch, { reqList: badges }),
  /** 批量获取成员详细信息 */
  getUserInfoBatch: (users: CacheUserReq[]) =>
    postRequest<CacheUserItem[]>(urls.getUserInfoBatch, { reqList: users }),
  /** 获取消息列表 */
  getMsgList: (params?: any) => getRequest<ListResponse<MessageType>>(urls.getMsgList, params),
  /** 发送消息 */
  sendMsg: (data?: MessageReq) => postRequest<MessageType>(urls.sendMsg, data),
  /** 标记消息，点赞等 */
  markMsg: (data?: MarkMsgReq) => alovaIns.Put<void>(urls.markMsg, data),
  /** 获取勋章列表 */
  getBadgeList: () => getRequest<BadgeType[]>(urls.getBadgeList, {}),
  /** 设置用户勋章 */
  setUserBadge: (badgeId: number) => putRequest<void>(urls.setUserBadge, { badgeId }),
  /** 修改用户名 */
  modifyUserName: (name: string) => putRequest<void>(urls.modifyUserName, { name }),
  /** 撤回消息 */
  recallMsg: (data: { msgId: number; roomId: number }) => putRequest<void>(urls.recallMsg, data),
  /** 拉黑用户 */
  blockUser: (data: { uid: number }) => putRequest<void>(urls.blockUser, data),
  /** 获取好友列表 */
  getContactList: (params?: any) =>
    getRequest<ListResponse<ContactItem>>(urls.getContactList, { params }),
  /** 获取好友申请列表 */
  requestFriendList: (params?: any) =>
    getRequest<ListResponse<RequestFriendItem>>(urls.requestFriendList, { params }),
  /** 发送添加好友请求 */
  sendAddFriendRequest: (params: { targetUid: number; msg: string }) =>
    postRequest<EmojiItem[]>(urls.sendAddFriendRequest, params),
  /** 同意好友申请 */
  applyFriendRequest: (params: { applyId: number }) =>
    putRequest(urls.sendAddFriendRequest, params),
  /** 同意好友申请 */
  deleteFriend: (params: { targetUid: number }) => deleteRequest(urls.deleteFriend, params),
  /** 好友申请未读数 */
  newFriendCount: () => getRequest<{ unReadCount: number }>(urls.newFriendCount),
  /** 会话列表 */
  getSessionList: (params?: any) =>
    getRequest<ListResponse<SessionItem>>(urls.getSessionList, params),
  /** 新增群组 */
  createGroup: (params: { uidList: number[] }) =>
    postRequest<{ id: number }>(urls.createGroup, params),
  /** 邀请群成员 */
  inviteGroupMember: (params: { roomId: number; uidList: number[] }) =>
    postRequest(urls.inviteGroupMember, params),
  /** 删除群成员 */
  removeGroupMember: (params: { roomId: number; uid: number }) =>
    deleteRequest(urls.inviteGroupMember, params),
  /** 群组详情 */
  groupDetail: (params: { id: number }) => getRequest<GroupDetailReq>(urls.groupDetail, { params }),
  /** 会话详情 */
  sessionDetail: (params: { id: number }) =>
    getRequest<SessionItem>(urls.sessionDetail, { params }),
  /** 会话详情(联系人列表发消息用) */
  sessionDetailWithFriends: (params: { uid: number }) =>
    getRequest<SessionItem>(urls.sessionDetailWithFriends, { params }),
  /** 退群 */
  exitGroup: ({ roomId }: { roomId: number }) =>
    deleteRequest<Boolean>(urls.exitGroup, {
      roomId,
    }),
}