<template>
  <div class="home">
    <img src="../../assets/Icon-arrow-left.svg" class="arrow" @click="gotoPage('/signIn')">
    <div style="height: 28px;"></div>
    <div style="font-size: 28px; color: rgb(112,112,112)">手機登入驗證</div>
    <div style="margin-top: 20%; font-size: 16px; color: rgb(49, 100, 126);">請輸入發送到您手機的驗證碼</div>
    <!-- 密碼輸入 -->
    <div style="margin-top: 15%;" @click="focusCode">
      <el-row :gutter="20" style="width: 80%; margin: 0 auto;">
        <el-col :span="4" v-for="(code, idx) in 6" :key="idx + 'c'">
          <div v-if="!codeArr[idx]" :class="{ isReady: (idx === 0 || codeArr[idx - 1] !== undefined), notReady: (idx !== 0 && codeArr[idx - 1] === undefined) }"></div>
          <div v-else style="color: rgb(242, 116, 73); font-weight: 700; font-size: 10vw;">{{ codeArr[idx] }}</div>
        </el-col>
      </el-row>
    </div>
    <input ref="code" v-model="codeArr" type="text" style="margin-top: 0px; opacity: 0;">
    <el-button round type="sign" class="button mt-15" :disabled="codeArr.length < 6">NEXT</el-button>
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
      codeArr: ''
    }
  },
  mounted() {
    console.log(this.register);
    var _this = this;
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
      register: 'register'
    }),
  },
  methods: {
    ...mapActions({
      gotoPage(route) {
        this.$router.push(route);
      },
    }),
    focusCode() {
      this.$refs.code.focus();
    }
  }
}
</script>

<style scoped>
  .el-button--sign.is-active,
  .el-button--sign:active {
    background: rgb(255, 180, 75, 0.7);
    border-color: rgb(255, 180, 75, 0.7);
    color: #fff;
  }

  .el-button--sign:disabled {
    background: rgb(255, 180, 75, 0.3);
    border-color: rgb(255, 180, 75, 0.3);
    color: #fff;
  }

  .el-button--sign:focus,
  .el-button--sign:hover {
    background: rgb(255, 180, 75, 0.7);
    border-color: rgb(255, 180, 75, 0.7);
    color: #fff;
  }

  .el-button--sign {
    color: #FFF;
    background-color: rgb(255, 180, 75);
    border-color: rgb(255, 180, 75);
  }

  .isReady {
    border-bottom: 4px solid rgb(255, 180, 75);
    height: 40px;
  }

  .notReady {
    border-bottom: 4px solid rgb(215,215,215);
    height: 40px;
  }

  .position {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .active {
    transform: translateY(-100%);
  }
  .sign_in_btn {
    top: 410px;
  }
  .mt-50 {
    margin-top: 50px;
  }
  .mt-25 {
    margin-top: 25px;
  }
  .arrow {
    position: absolute;
    top: 30px;
    left: 7%;
  }
  .button {
    width: 80%;
    height: 50px;
    border-radius: 25px;
  }
</style>