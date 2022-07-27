<!--
 * @Author: Kasumi
 * @Date: 2022-07-27 11:06:17
 * @LastEditTime: 2022-07-27 20:57:47
 * @LastEditors: Kasumi
 * @Description: 登录页面的表单组件
 * @FilePath: \vite-project-xtx\src\views\login\components\login-form.vue
 * 你所热爱的, 就是你的生活
-->
<script lang="ts" setup name="LoginForm">
import Message from '@/components/message';
import { ref, watch } from 'vue';
import useStore from '@/store'
import router from '@/router';
import { useField, useForm } from 'vee-validate' // 表单校验的工具包
import { useCountDown } from '@/hooks/index' // 引入倒计时组件

const { user } = useStore()

const type = ref<'account' | 'mobile'>('account')


const { validate, resetForm } = useForm({
  initialValues: { // 设置默认值
    account: 'xiaotuxian001',
    password: '123456',
    isAgree: true
  },
  validationSchema: { // 校验规则
    account(value: string) {
      // value 是将来使用该规则的表单元素的值

      if (!value) return '请输入用户名'
      if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '字母开头且6-20个字符'

      // 如何反馈校验成功还是失败，返回 true 才是成功，其他情况失败，返回失败原因。
      return true
    },
    password(value: string) {
      if (!value) return '请输入密码'
      if (!/^\w{6,12}$/.test(value)) return '密码必须是6-24位字符'
      return true
    },
    isAgree(value: boolean) {
      if (!value) return '请同意协议'
      return true
    },
    mobile(value: string) {
      if (!value) return '请输入手机号'
      if (!/^1[3-9]\d{9}$/.test(value)) return '手机号格式错误'
      return true
    },
    code(value: string) {
      if (!value) return '请输入验证码'
      if (!/^\d{6}$/.test(value)) return '验证码格式错误'
      return true
    },
  }
})

// 通过 useField 提供 value 值和错误信息
const { value: account, errorMessage: accountError } = useField<string>('account')
const { value: password, errorMessage: passwordError } = useField<string>('password')
const { value: isAgree, errorMessage: isAgreeError } = useField<boolean>('isAgree')
const { value: mobile, errorMessage: mobileError, validate: validateMobile } = useField<string>('mobile')
const { value: code, errorMessage: codeError } = useField<string>('code')

// 监听 type 的变化
watch(type, () => {
  // 重置表单
  resetForm()
})

const { time, start } = useCountDown(60)
const mobileRef = ref<HTMLElement | null>(null)
const send = async () => {
  if (time.value > 0) return
  // 单独校验手机号
  const res = await validateMobile()
  if (!res.valid) {
    mobileRef.value?.focus() // 自动聚焦到手机号的输入框
    return
  }
  await user.sendMobileMsg(mobile.value)
  Message.success('获取验证码成功')
  start()
}

////////////////////////////////////////////////
const login = async () => {
  // 表单校验
  const res = await validate()
  // if (!res.valid) return
  try {
    await user.login(account.value, password.value)
    Message.success('登录成功')
    router.push('/')
  } catch (error) {
    Message.error('用户名或密码错误!')
  }
}
////////////////////////////////////////////////

</script>
<template>
  <div class="account-box">
    <div class="toggle">
      <a href="javascript:;" v-if="type === 'mobile'" @click="type = 'account'"> <i class="iconfont icon-user"></i>
        使用账号登录
      </a>
      <a href="javascript:;" v-else @click="type = 'mobile'"> <i class="iconfont icon-msg"></i> 使用短信登录 </a>
    </div>
    <div class="form">
      <template v-if="type === 'account'">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input type="text" placeholder="请输入用户名或手机号" v-model="account" />
          </div>
          <!-- 错误信息 -->
          <div class="error"><i class="iconfont icon-warning" v-if="accountError" />{{ accountError }}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <input type="password" placeholder="请输入密码" v-model="password" />
          </div>
          <!-- 错误信息 -->
          <div class="error"><i class="iconfont icon-warning" v-if="passwordError" />{{ passwordError }}</div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input type="text" placeholder="请输入手机号" v-model="mobile" ref="mobileRef" />
          </div>
          <!-- 错误信息 -->
          <div class="error"><i class="iconfont icon-warning" v-if="mobileError" />{{ mobileError }}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <input type="password" placeholder="请输入验证码" v-model="code" />
            <span class="code" @click="send">{{ time === 0 ? '发送验证码' : `${time}s后发送` }}</span>
          </div>
          <!-- 错误信息 -->
          <div class="error"><i class="iconfont icon-warning" v-if="codeError" />{{ codeError }}</div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <XtxCheckbox v-model="isAgree" />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <!-- 错误信息 -->
        <div class="error"><i class="iconfont icon-warning" v-if="isAgreeError" />{{ isAgreeError }}</div>
      </div>
      <a href="javascript:;" class="btn" @click="login">登录</a>
    </div>
    <div class="action">
      <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="" />
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: @xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 40px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        >i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: @priceColor;
          }

          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      >.error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      cursor: pointer;
    }

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>