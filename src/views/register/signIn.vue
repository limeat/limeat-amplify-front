<template>
  <div class="home">
    <div :class="{ showLoading: loadingBar, noShowLoading: !loadingBar }">
      <img src="../../assets/dergedcbh.gif" width="50" class="center_img">
    </div>
    <img src="../../assets/Icon-arrow-left.svg" class="arrow" @click="gotoPage('/')">
    <div style="height: 28px;"></div>
    <div style="font-size: 28px; color: rgb(112,112,112)">登入</div>
    <!-- LOGO -->
    <div style="height: 145px;">
      <img src="../../assets/LIMeat.svg" width="156" style="margin-top: 20px;">
    </div>
    <div style="margin: 46px auto;">
      <!-- 帳號 -->
      <input style="width: 80%;" v-model="account" placeholder="手機號碼，例：+886912345678"/>
      <div v-if="notUser" style="color: rgb(242, 116, 73); text-align: center; font-size: 15px; padding-top: 5px;">{{ errorText }}</div>
      <!-- 密碼 -->
      <button class="button btnSignUp" style="margin-top: 25px;" @click="checkPhone">取得手機驗證碼</button>
      <div style="margin: 25px auto; width: 80%;">
        <mu-row gutter>
          <!-- 分隔線 -->
          <mu-col :span="5">
            <div class="line"></div>
          </mu-col>
          <mu-col :span="2" class="color-grey">OR</mu-col>
          <!-- 分隔線 -->
          <mu-col :span="5">
            <div class="line"></div>
          </mu-col>
        </mu-row>
        <mu-row>
          <!-- 臉書登入 -->
          <mu-col :span="6">
            <img src="../../assets/facebook.png" width="70">
          </mu-col>
          <!-- Google 登入 -->
          <mu-col :span="6">
            <img src="../../assets/google.png" width="70">
          </mu-col>
        </mu-row>
        <div style="color: rgb(112,112,112); margin-top: 15px; font-size: 15px;">還不是用戶嗎？
          <span style="color: rgb(242,116,73)" @click="gotoPage('/signUp')">註冊</span>
        </div>
        <div style="height: 10px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions, createNamespacedHelpers } from 'vuex';
const register = createNamespacedHelpers('register');



export default {
  name: 'Home',
  data() {
    return {
      showLogo: false,
      notUser: false,
      loadingBar: false,
      account: '',
      password: '',
      errorText: '',
      testPhone: '0912345678'
    }
  },
  mounted() {
    document.body.addEventListener('focusout',()=>{     
      window.scrollTo({ top:0, left:0, behavior: "smooth" })
    })
  },
  methods: {
    ...register.mapActions({
      getVerCode: 'getVerCode'
    }),
    gotoPage(route) {
      this.$router.push(route);
    },
    checkPhone() {
      if (!this.account) {
        this.notUser = true;
        this.errorText = '請輸入手機號碼';
      }
      else if (this.account.indexOf('+886') === -1) {
        this.notUser = true;
        this.errorText = '手機號碼格式錯誤';
      }
      else {
        this.notUser = false;
        const postData = {
          phone: this.account, status: 2
        };
        this.loadingBar = true;
        setTimeout(() => { this.loadingBar = false }, 2000);
        // 取得驗證碼
        this.getVerCode(postData).then((res) => {
          if (res.data.data) {
            const statusCode = res.data.data.sendSmsVerificationCode.status;
            if (statusCode === 200) {
              this.$router.push('/phoneVer');
            }
            else {
              alert('登入失敗 ' + statusCode);
            }
          }
          else {
            alert('登入失敗');
          }
        })
      }
    },
  }
}
</script>

<style scoped>
.home {
  height: 100vh;
  overflow: auto;
}
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
.noShowLoading {
  opacity: 0;
  z-index: 0;
}
.center_img {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}
/* .button {
  width: 280px;
  height: 50px;
  border-radius: 25px;
} */
.mt-15 {
  margin-top: 15px;
}
.mt-25 {
  margin-top: 25px;
}
.arrow {
  position: absolute;
  top: 30px;
  left: 35px;
}
.color-grey {
  color:rgb(112, 112 ,112, 0.8);
  font-size: 15px;
}
.line {
  width: 100%;
  height: 10px;
  border-bottom: 0.5px solid rgb(112, 112 , 112, 0.4);
  margin-bottom: 20px;
}
.input {
  width: 85%;
}
</style>