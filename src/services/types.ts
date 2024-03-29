


export enum SexType {
  Man = 1,
  Female,
}
export type UserInfoType = {
  /**
   * 用户唯一标识
   */
  uid: number
  /**
   * 用户头像
   */
  avatar: string
  /**
   * 用户名
   */
  name: string
  /**
   * 剩余改名次数
   */
  modifyNameChance: number
  /**
   * 性别 1为男性，2为女性
   */
  sex: SexType
}

export type CacheBadgeItem = {
  /** 是否需要更新数据源。 */
  needRefresh?: boolean
  /** 最后更新时间 更新超过 10 分钟异步去更新。 */
  lastModifyTime: number
  /** 徽章说明 */
  describe: string
  /** 徽章图标 */
  img: string
  /** 徽章 ID */
  itemId: number
}

export type CacheUserItem = {
  /** 是否需要更新数据源。 */
  needRefresh?: boolean
  /** 最后更新时间 更新超过 10 分钟异步去更新。 */
  lastModifyTime: number
  /** 获得的徽章 */
  itemIds: number[]
  /** 佩戴的徽章 */
  wearingItemId: number
  /** 归属地 */
  locPlace: string
  /** 头像 */
  avatar: string
  /** 最后一次上下线时间 */
  lastOptTime: number
  /** 用户名称 */
  name: string
  /** uid */
  uid: number
}
