import { TResponse } from "@/types/data";
import { Profile } from "@/types/user";
import request from "@/utils/request";
import { getProfile, removeProfile, setProfile } from "@/utils/storage";
import { defineStore } from "pinia";
import useStore from "..";

export default defineStore('user', {
  state: () => ({
    profile: getProfile() as Profile
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

    // 退出登录
    logout() {
      this.profile = {} as Profile
      removeProfile()
      const { cart } = useStore()
      cart.clearCart() // 清空购物车
    },

    //  source: 1 为 pc，2 为 webapp，3 为微信小程序, 4 为 Android, 5 为 ios, 6 为 qq, 7 为微信
    async qqLogin(openId: string) {
      const res = await request.post<TResponse<Profile>>('/login/social', {
        unionId: openId,
        source: 6
      })
      // 1. 保存用户信息到 state 中
      this.profile = res.data.result
      setProfile(res.data.result)
    },

    // 绑定 QQ 的短信验证码
    async sendQQBindMsg(mobile: string) {
      await request.get('/login/social/code', {
        params: {
          mobile
        }
      })
    },

    // 绑定QQ
    async qqBindLogin(openId: string, mobile: string, code: string) {
      const res = await request.post<TResponse<Profile>>('/login/social/bind', {
        mobile,
        code,
        unionId: openId
      })
      this.profile = res.data.result
      setProfile(res.data.result)
    },

    //////
    async sendQQPathMsg(mobile: string) {
      await request.get('/register/code', {
        params: {
          mobile
        }
      })
    },

    async qqPatchLogin(data: any) {
      const res = await request.post<TResponse<Profile>>(
        `/login/social/${data.openId}/complement`,
        data
      )
      // 1. 保存用户信息到 state 中
      this.profile = res.data.result
      setProfile(res.data.result)
    }
  }
})