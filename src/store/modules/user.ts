import { TResponse } from "@/types/data";
import { Profile } from "@/types/user";
import request from "@/utils/request";
import { setProfile } from "@/utils/storage";
import { defineStore } from "pinia";

export default defineStore('user', {
  state: () => ({
    profile: {} as Profile
  }),
  actions: {
    // 用户名密码登录
    async login(account: string, password: string) {
      const res = await request.post<TResponse<Profile>>('/login', {
        account,
        password
      })
      this.profile = res.data.result
      // 持久化存储信息
      setProfile(this.profile)
    },
    // 获取手机验证码
    async sendMobileMsg(mobile: string) {
      await request.get('/login/code', {
        params: {
          mobile
        }
      })
    },
    // 短信登录接口
    async mobileLogin(mobile: string, code: string) {
      const res = await request.post<TResponse<Profile>>('/login/code', {
        mobile,
        code
      })
      this.profile = res.data.result
      // 持久化存储信息
      setProfile(this.profile)
    },
  }
})