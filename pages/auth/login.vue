/*
 * @Description:
 * @Author: moran
 * @Date: 2019-07-31 11:01:48
 * @Last Modified by: danding
 * @Last Modified time: 2019-08-01 16:49:44
 */

<template>
  <div class="login-wrapper">
    <div class="login" :style="{ backgroundImage: `url(${bgImg})` }">
      <div class="login-content pm-flex">
        <div class="pm-flex-1">
          <div class="login-left-module">
            <div>
              <p class="hello-icon"></p>
              <p class="hello-txt">欢迎您登录大象</p>
            </div>
            <el-form
              ref="loginForm"
              class="login-form"
              :model="loginForm"
              :rules="rules"
            >
              <el-form-item prop="cell">
                <el-input
                  v-model="loginForm.cell"
                  maxlength="11"
                  placeholder="用户名"
                  @keyup.enter.native="submitForm"
                >
                  <i slot="prefix" class="el-input__icon el-icon-user" />
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="loginForm.password"
                  show-password
                  placeholder="密码"
                  @keyup.enter.native="submitForm"
                >
                  <i slot="prefix" class="el-input__icon el-icon-lock" />
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  size="medium"
                  class="submit-btn"
                  type="primary"
                  :loading="submitLoading"
                  @click="submitForm"
                  >登录</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="pm-flex-1 login-right-module">
          <img class="logo-img" src="~/assets/common/logo_lg.png" alt="大象" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { RULES } from '@/constants/auth';

const { mapActions, mapState, mapMutations } = createNamespacedHelpers('auth');

export default {
  layout: 'empty',
  middleware: 'anonymous',
  head() {
    return {
      title: '登录'
    };
  },
  data() {
    return {
      rules: RULES,
      loginForm: {
        // 表单值
        cell: '',
        password: ''
      }
    };
  },
  computed: {
    ...mapState(['bgImg', 'codeImgUrl', 'submitLoading'])
  },
  methods: {
    ...mapMutations(['changeCodeUrl']),
    ...mapActions(['handleLogin']),
    submitForm() {
      this.$refs.loginForm.validate(valid => {
        valid && this.handleLogin(this.loginForm);
      });
    }
  }
};
</script>

<style scoped lang="less">
.login-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #F5F6F6;
}
.login {
  position: absolute;
  top: 0;
  left: 9.27%;
  z-index: 999;
  width: 90.73%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: left center;
  background-size: contain;
}

.login-content {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  width: 862px;
  height: 580px;
  margin: auto;
  background: #fff;
  box-shadow:0px 20px 35px rgba(0,0,0,0.12);
  border-radius:10px;
}

.el-input--small {
  font-size: 15px;
}

.login-left-module {
  padding: 86px 69px 0;
}

.login-right-module {
  position: relative;
  background: url("~@/static/images/login/login_right_bg.png") no-repeat;
  background-size: 100% 100%;
}

.hello-icon {
  width: 102px;
  height: 46px;
  background: url("~@/assets/login/login_hello.png") no-repeat;
  background-size: 100% 100%;
}

.hello-txt {
  padding-bottom: 54px;
  font-weight:500;
  line-height:16px;
  color: #9B9B9B;
}

.login-logo {
  text-align: center;
  padding: 10px 0;
}

.logo-img {
  position: absolute;
  right: 19px;
  top: 19px;
  width: 80px;
  height: 32px;
}

.logo-text {
  font-size: 34px;
  display: inline-block;
  color: #333;
}

.login-form {
  width: 100%;
}

.code-input {
  width: 167px;
  margin-right: 6px;
}

.change-code {
  font-size: 12px;
  color: #1687D9;
  vertical-align: middle;
}

.submit-btn {
  width: 100%;
  background-color: #4375FF;
  &:hover {
    opacity: .93;
  }
}
</style>
