/*
 * @Author: Kasumi
 * @Date: 2022-07-29 10:48:02
 * @LastEditTime: 2022-07-29 10:49:37
 * @LastEditors: Kasumi
 * @Description: 登录信息数据持久化存储
 * @FilePath: \vite-project-xtx\src\utils\storage.ts
 * 你所热爱的, 就是你的生活
 */
import { Profile } from '@/types/user'
const PROFILE_KEY = '🤡'

/**
 * 设置个人信息
 * @param profile
 */
export function setProfile(profile: Profile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}

/**
 * 获取个人信息
 * @returns
 */
export function getProfile(): Profile {
  return JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}')
}

/**
 * 移除个人信息
 */
export function removeProfile(): void {
  localStorage.removeItem(PROFILE_KEY)
}