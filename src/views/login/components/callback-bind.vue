<!--
 * @Author: Kasumi
 * @Date: 2022-07-29 15:07:42
 * @LastEditTime: 2022-07-29 17:13:52
 * @LastEditors: Kasumi
 * @Description: 绑定手机界面
 * @FilePath: \vite-project-xtx\src\views\login\components\callback-bind.vue
 * 你所热爱的, 就是你的生活
-->
<script name="CallbackBind" lang="ts" setup>
import { QQUserInfo, QQUserInfoRes } from '@/types/user'
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { mobileRule, codeRule } from '@/utils/validate'
import { useCountDown } from '@/hooks';
import useStore from '@/store';
import Message from '@/components/message';
import router from '@/router';
const { user } = useStore()

const qqInfo = ref<QQUserInfo>({} as QQUserInfo)

let openId = ''
const qc = QC.Login as loginObj
// 1. 判断QQ是否登录
if (qc.check()) {
  // 2. 获取QQ用户信息
  QC.api('get_user_info').success((res: QQUserInfoRes) => {
    qqInfo.value = res.data
  })
  // 3. 获取openId
  qc.getMe((id) => {
    openId = id
  })
}

// 表单校验
const { validate } = useForm({
  validationSchema: {
    mobile: mobileRule,
    code: codeRule,
  },
})

const { value: mobile, errorMessage: mobileError, validate: validateMobile } = useField<string>('mobile')
const { value: code, errorMessage: codeError } = useField<string>('code')

const bind = async () => {
  const res = await validate()
  if (!res.valid) return
  // 如果校验成功，发送请求进行绑定
  await user.qqBindLogin(openId, mobile.value, code.value)
  Message.success('QQ绑定成功')
  router.push('/')
}

// 发送验证码
const { time, start } = useCountDown(60)
const send = async () => {
  if (time.value > 0) return
  // 注意这儿只需要检验 mobile 就行啦
  const res = await validateMobile()
  if (!res.valid) return
  // 发送请求绑定qq
  await user.sendQQBindMsg(mobile.value)
  Message.success('获取验证码成功')
  // 开启倒计时
  start()
}
</script>
<template>
  <div class="xtx-form">
    <div class="user-info">
      <img :src="qqInfo.figureurl_2" alt="" />
      <p>Hi，{{ qqInfo.nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input class="input" type="text" placeholder="绑定的手机号" v-model="mobile" />
      </div>
      <div class="error">{{ mobileError }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input class="input" type="text" placeholder="短信验证码" v-model="code" />
        <span class="code" @click="send">{{ time === 0 ? '发送验证码' : `${time}s后发送` }} </span>
      </div>
      <div class="error">{{ codeError }}</div>
    </div>
    <a href="javascript:;" class="submit" @click="bind">立即绑定</a>
  </div>
</template>

<style scoped lang="less">
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;

  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }

  p {
    padding-left: 10px;
  }
}

.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;

  &:hover {
    cursor: pointer;
  }
}
</style>