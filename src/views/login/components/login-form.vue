<!--
 * @Author: Kasumi
 * @Date: 2022-07-27 11:06:17
 * @LastEditTime: 2022-08-01 11:43:04
 * @LastEditors: Kasumi
 * @Description: 登录页面的表单组件
 * @FilePath: \vite-project-xtx\src\views\login\components\login-form.vue
 * 你所热爱的, 就是你的生活
-->
<script lang="ts" setup name="LoginForm">
import Message from '@/components/message';
import { onMounted, ref, watch } from 'vue';
import useStore from '@/store'
import router from '@/router';
import { useField, useForm } from 'vee-validate' // 表单校验的工具包
import { useCountDown } from '@/hooks/index' // 引入倒计时组件
import { accountRule, codeRule, isAgreeRule, mobileRule, passwordRule } from '@/utils/validate'; // 引入校验规则
import { useRoute } from 'vue-router';

const { user, cart } = useStore()
const route = useRoute()

const type = ref<'account' | 'mobile'>('account')


const { validate, resetForm } = useForm({
  initialValues: { // 设置默认值
    account: 'xiaotuxian001',
    password: '123456',
    isAgree: true,
    mobile: '13312345678',
    code: ''
  },
  validationSchema: { // 校验规则
    account: accountRule,
    mobile: mobileRule,
    code: codeRule,
    password: passwordRule,
    isAgree: isAgreeRule
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

const login = async () => {
  // 表单校验
  const res = await validate()
  // if (!res.valid) return
  try {
    if (type.value === 'account') {
      // 账号登录
      if (res.errors.account || res.errors.password || res.errors.isAgree) return
      await user.login(account.value, password.value)
    } else {
      // 验证码登录
      if (res.errors.mobile || res.errors.code || res.errors.isAgree) return
      await user.mobileLogin(mobile.value, code.value)
    }
    // 登录成功后，合并购物车
    cart.mergeLocalCart()
    // 通过第三方登录，跳转到首页
    Message.success('登录成功')
    const redirectUrl = (route.query.redirectUrl as string) || '/'
    router.push(redirectUrl)
    // router.push('/')
  } catch (error) {
    Message.error('用户名或密码错误!')
  }
}

// onMounted(() => {
//   ; (QC.Login as loginFn)({
//     btnId: 'qqLoginBtn',
//   })
// })
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
      <!-- QQ登录 -->
      <!-- <span id="qqLoginBtn"></span> -->
      <!-- 当前页面打开 -->
      <a
        href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&amp;response_type=token&amp;scope=all&amp;redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback"><img
          src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="QQ登录" border="0" /></a>
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