// 本地配置到 .env 里面修改。生产配置在 .env.production 里面
const prefix = import.meta.env.PROD ? import.meta.env.VITE_API_PREFIX : ''
export default {
  getMemberStatistic: `${prefix}/api/chat/public/member/statistic`,
  getUserInfoBatch: `${prefix}/api/user/public/summary/userInfo/batch`,
  getBadgesBatch: `${prefix}/api/user/public/badges/batch`,
  getAllUserBaseInfo: `${prefix}/api/room/group/member/list`, // 房间内的所有群成员列表-@专用
  getMsgList: `${prefix}/api/chat/public/msg/page`,
  sendMsg: `${prefix}/api/chat/msg`,
  getUserInfoDetail: `${prefix}/api/user/userInfo`, // 获取用户信息详情
  modifyUserName: `${prefix}/api/user/name`, // 修改用户名
  getBadgeList: `${prefix}/api/user/badges`, // 徽章列表
  setUserBadge: `${prefix}/api/user/badge`, // 设置用户徽章
  markMsg: `${prefix}/api/chat/msg/mark`, // 消息标记
  blockUser: `${prefix}/api/user/black`, // 拉黑用户
  recallMsg: `${prefix}/api/chat/msg/recall`, // 撤回消息
  fileUpload: `${prefix}/api/oss/upload/url`, // 文件上传
  addEmoji: `${prefix}/api/user/emoji`, // 增加表情
  deleteEmoji: `${prefix}/api/user/emoji`, // 删除表情
  getEmoji: `${prefix}/api/user/emoji/list`, // 查询表情包

  // -------------- 好友相关 ---------------
  getContactList: `${prefix}/api/user/friend/page`, // 联系人列表
  requestFriendList: `${prefix}/api/user/friend/apply/page`, // 好友申请列表
  sendAddFriendRequest: `${prefix}/api/user/friend/apply`, // 申请好友
  deleteFriend: `${prefix}/api/user/friend`, // 删除好友
  newFriendCount: `${prefix}/api/user/friend/apply/unread`, // 申请未读数

  // -------------- 聊天室相关 ---------------
  getSessionList: `${prefix}/api/chat/public/contact/page`, // 会话列表
  getMsgReadList: `${prefix}/api/chat/msg/read/page`, // 消息的已读未读列表
  getMsgReadCount: `${prefix}/api/chat/msg/read`, // 消息已读未读数
  createGroup: `${prefix}/api/room/group`, // 新增群组
  getGroupUserList: `${prefix}/api/room/public/group/member/page`,
  inviteGroupMember: `${prefix}/api/room/group/member`, // 邀请群成员
  exitGroup: `${prefix}/api/room/group/member/exit`, // 退群
  addAdmin: `${prefix}/api/room/group/admin`, // 添加管理员
  revokeAdmin: `${prefix}/api/room/group/admin`, // 添加管理员
  groupDetail: `${prefix}/api/room/public/group`, // 群组详情
  sessionDetail: `${prefix}/api/chat/public/contact/detail`, // 会话详情
  sessionDetailWithFriends: `${prefix}/api/chat/public/contact/detail/friend`, // 会话详情(联系人列表发消息用)
}
