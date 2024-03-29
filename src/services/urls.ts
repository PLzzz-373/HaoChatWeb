const prefix = import.meta.env.PROD ? 'http://127.0.0.1:8080' : ''

export default {
  // 获取用户信息详情
  getUserInfoDetail: `${prefix}/api/user/userInfo`,
}