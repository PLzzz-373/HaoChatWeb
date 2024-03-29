import { alovaIns } from '@/services/request'
import type { UserInfoType } from '@/services/types'
import urls from '@/services/urls'

export default {
  getUserDetail: () => alovaIns.Get<UserInfoType, unknown>(urls.getUserInfoDetail),
}