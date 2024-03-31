const prefix = import.meta.env.PROD ? import.meta.env.VITE_API_PREFIX : ''

export default {
  //聊天室核心功能
  getUserInfoDetail: `${prefix}/api/user/userInfo`, // 获取用户信息详情
  modifyUserName: `${prefix}/api/user/name`, // 修改用户名
  getBadgeList: `${prefix}/api/user/badges`, // 徽章列表
  setUserBadge: `${prefix}/api/user/badge`, // 设置用户徽章
  markMsg: `${prefix}/api/chat/msg/mark`, // 消息标记
  recallMsg: `${prefix}/api/chat/msg/recall`, // 撤回消息
  blockUser: `${prefix}/api/user/black`, // 拉黑用户
  getMsgList: `${prefix}/api/chat/public/msg/page`,//获取消息列表
  sendMsg: `${prefix}/api/chat/msg`,// 发送消息
  getUserInfoBatch: `${prefix}/api/user/public/summary/userInfo/batch`,//批量获取成员信息详情
  getBadgesBatch: `${prefix}/api/user/public/badges/batch`,//批量获取徽章
  groupDetail: `${prefix}/api/room/public/group`, // 群组详情
  createGroup: `${prefix}/api/room/group`, // 新增群组
  getGroupUserList: `${prefix}/api/room/public/group/member/page`,
  inviteGroupMember: `${prefix}/api/room/group/member`, // 邀请群成员
  exitGroup: `${prefix}/api/room/group/member/exit`, // 退群
  //好友相关
  getContactList: `${prefix}/api/user/friend/page`, // 联系人列表
  requestFriendList: `${prefix}/api/user/friend/apply/page`, // 好友申请列表
  sendAddFriendRequest: `${prefix}/api/user/friend/apply`, // 申请好友
  deleteFriend: `${prefix}/api/user/friend`, // 删除好友
  newFriendCount: `${prefix}/api/user/friend/apply/unread`, // 申请未读数
  //会话相关
  getSessionList: `${prefix}/api/chat/public/contact/page`, // 会话列表
  sessionDetail: `${prefix}/api/chat/public/contact/detail`, // 会话详情
  sessionDetailWithFriends: `${prefix}/api/chat/public/contact/detail/friend`, // 会话详情(联系人列表发消息用)
}