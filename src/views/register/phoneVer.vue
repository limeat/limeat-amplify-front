<template>
  <div class="home">
    <div :class="{ showLoading: loadingBar, noShowLoading: !loadingBar }">
      <img src="../../assets/dergedcbh.gif" width="50" class="center_img">
    </div>
    <img src="../../assets/Icon-arrow-left.svg"
      class="arrow"
      @click="gotoPage('/signIn')">
    <div style="height: 28px;"></div>
    <div style="font-size: 28px; color: rgb(112,112,112)">手機登入驗證</div>
    <div style="margin-top: 20%; font-size: 16px; color: rgb(49, 100, 126);">請輸入發送到您手機的驗證碼</div>
    <!-- 密碼輸入 -->
    <div style="margin-top: 15%; height: 80px;" @click="focusCode">
      <el-row :gutter="20"
        style="width: 80%; margin: 0 auto;">
        <el-col :span="4"
          v-for="(code, idx) in 6"
          :key="idx + 'c'">
          <div v-if="!codeArr[idx]"
            :class="{ isReady: (idx === 0 || codeArr[idx - 1] !== undefined), notReady: (idx !== 0 && codeArr[idx - 1] === undefined) }">
          </div>
          <div v-else
            style="color: rgb(242, 116, 73); font-weight: 700; font-size: 10vw;">
            {{ codeArr[idx] }}
          </div>
        </el-col>
      </el-row>
    </div>
    <el-input ref="code"
      :maxlength="6"
      v-model="codeArr"
      type="text"
      style="position: fixed; bottom: 0; opacity: 0;"/>
    <button class="button btnSignUp" @click="checkCode">NEXT</button>
    <div style="position: relative;">
      <div style="margin-top: 5%; font-size: 16px; color: rgb(49, 100, 126);">沒收到簡訊？</div>
      <div v-if="second !== 0"
        style="position: absolute; right: 15%; font-size: 21px; top: -3px; color: rgb(242, 116, 73); font-weight: 600;">
        {{ second }}s
      </div>
      <div v-else
        style="position: absolute; right: 15%; font-size: 16px; top: 1px; color: rgb(242, 116, 73);"
        @click="resetCode">
        重新發送
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions, createNamespacedHelpers } from 'vuex';
import gql from 'graphql-tag';
const register = createNamespacedHelpers('register');

export default {
  name: 'Home',
  data() {
    return {
      codeArr: '',
      loadingBar: false,
      second: 0,
    }
  },
  mounted() {
    this.setTime();
    setTimeout(() => {
      alert(`你的驗證碼為：${this.register.code}`);
    }, 1000)
    // document.onkeydown = function(e) {
    //   const keyValue   = window.event.keyCode;
    //   const nowLength  = _this.codeArr.length;
    //   // 數字鍵
    //   if (keyValue < 58 && keyValue > 47) {
    //     if (nowLength < 6) {
    //       _this.codeArr += (parseInt(keyValue) - 48).toString();
    //       console.log(_this.codeArr);
    //     }
    //   }
    //   // 退回鍵
    //   if (keyValue === 8) {
    //     console.log(nowLength)
    //   }
    // }
  },
  computed: {
    ...register.mapGetters({
      register: 'register',
    }),
  },
  methods: {
    ...register.mapActions({
      getVerCode: 'getVerCode'
    }),
    gotoPage(route) {
      this.$router.push(route);
    },
    setTime() {
      this.second = 60;
      var si = setInterval(this.minus, 1000);
      setTimeout(() => {
        this.second = 0;
        clearInterval(si);
      }, 60000);
    },
    minus() {
      this.second -= 1;
    },
    resetCode() {
      this.codeArr = '';
      this.setTime();
      this.getVerCode({ phone: this.register.phone, status: 2 });
      setTimeout(() => {
        alert(`你的驗證碼為：${this.register.code}`);
      }, 1000)
    },
    checkCode() {
      if (this.codeArr === this.register.code) {
        this.loadingBar = true;
        setTimeout(() => {
          this.loadingBar = false;
        }, 2000);
        this.$router.push('/selectPrice')
      }
      else {
        alert('驗證碼有誤');
        // this.$router.push('/selectPrice')
      }
    },
    focusCode() {
      this.$refs.code.focus();
    }
  }
}
</script>

<style scoped>
  .showLoading {
    opacity: 0.8;
    z-index: 100000;
    position: fixed;
    top: 0;
    width: 100%;
    background-color: black;
    height: 100vh;
    transition: 0.5s;
  }
  .center_img {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
  .noShowLoading {
    opacity: 0;
    z-index: 0;
  }
  .isReady {
    border-bottom: 4px solid rgb(255, 180, 75);
    height: 40px;
  }
  .notReady {
    border-bottom: 4px solid rgb(215,215,215);
    height: 40px;
  }
  .arrow {
    position: absolute;
    top: 30px;
    left: 7%;
  }
</style>