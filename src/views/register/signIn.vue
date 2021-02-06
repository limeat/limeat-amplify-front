<template>
  <div class="home">
    <img src="../../assets/Icon-arrow-left.svg" class="arrow" @click="gotoPage('/')">
    <div style="height: 28px;"></div>
    <div style="font-size: 28px; color: rgb(112,112,112)">登入</div>
    <!-- LOGO -->
    <div style="height: 145px;">
      <img src="../../assets/LIMeat.svg" width="156" style="margin-top: 20px;">
    </div>
    <div style="width: 300px; margin: 46px auto;">
      <!-- 帳號 -->
      <el-input style="width: 95%;" v-model="account" placeholder="手機號碼"></el-input>
      <div v-if="notUser" style="color: rgb(242, 116, 73); text-align: center; font-size: 15px; padding-top: 5px;">此號碼尚未註冊或輸入錯誤</div>
      <!-- 密碼 -->
      <el-button round type="signIn" class="button mt-15" @click="checkPhone">取得手機驗證碼</el-button>
      <!-- <el-input style="margin-top: 30px; width: 95%;" type="password" :show-password="true" v-model="password" placeholder="密碼"></el-input> -->
      <!-- 忘記密碼 -->
      <!-- <el-row style="width: 95%;">
        <el-col :span="12">
          <div style="color: rgb(242, 116, 73); text-align: left; padding-left: 20px; padding-top: 15px;">{{ errorText }}</div>
        </el-col>
        <el-col :span="12">
          <div style="color: rgb(112,112,112); font-size: 15px; text-align: right; padding-right: 0px; padding-top: 15px;">忘記密碼？</div>
        </el-col>
      </el-row> -->
      <!-- <img src="../../assets/signIn.svg" width="95%" style="margin-top: 25px;" @click="signIn"> -->
      <div style="margin: 25px auto; width: 95%;">
        <el-row :gutter="5">
          <!-- 分隔線 -->
          <el-col :span="10">
            <div class="line"></div>
          </el-col>
          <el-col :span="4" class="color-grey">OR</el-col>
          <!-- 分隔線 -->
          <el-col :span="10">
            <div class="line"></div>
          </el-col>
        </el-row>
        <el-row>
          <!-- 臉書登入 -->
          <el-col :span="12">
            <img src="../../assets/facebook.png" width="70">
          </el-col>
          <!-- Google 登入 -->
          <el-col :span="12">
            <img src="../../assets/google.png" width="70">
          </el-col>
        </el-row>
        <div style="color: rgb(112,112,112); margin-top: 15px; font-size: 15px;">還不是用戶嗎？<span style="color: rgb(242,116,73)">註冊</span></div>
        <div style="height: 50px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import gql from 'graphql-tag'
import { mapGetters, mapActions, createNamespacedHelpers } from 'vuex';
const register = createNamespacedHelpers('register');


const loginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(payload: { email: $email, password: $password }) {
      status, message, token
    }
  }
`;


export default {
  name: 'Home',
  data() {
    return {
      showLogo: false,
      notUser: false,
      account: '',
      password: '',
      errorText: '',
      testPhone: '0912345678'
    }
  },
  mounted() {
    document.body.addEventListener('focusout',()=>{     
      window.scrollTo({ top:0 , left:0, behavior: "smooth" })
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
      }
      else {
        this.getVerCode({ phone: this.account });
        this.$router.push('/phoneVer');
      }
    },
    signIn() {
      if (!this.account) {
        this.errorText = '請輸入信箱或手機號碼';
      }
      else if (!this.password) {
        this.errorText = '請輸入密碼';
      }
      else {
        this.errorText = '';
        this.$apollo.mutate({
          mutation: loginMutation,
          variables: {
            email: this.account,
            password: this.password
          },
        })
        .then(data => {
          console.log(data);
        })
      }
    }
  }
}
</script>

<style scoped>
.el-button--signIn.is-active,
.el-button--signIn:active {
  background: rgb(242, 116, 73, 0.7);
  border-color: rgb(242, 116, 73, 0.7);
  color: #fff;
}
.el-button--signIn:focus,
.el-button--signIn:hover {
  background: rgb(242, 116, 73, 0.7);
  border-color: rgb(242, 116, 73, 0.7);
  color: #fff;
}
.el-button--signIn {
  color: #FFF;
  background-color: rgb(242, 116, 73);
  border-color: rgb(242, 116, 73);
}
.button {
  width: 280px;
  height: 50px;
  border-radius: 25px;
}
.mt-15 {
  margin-top: 15px;
}
.arrow {
  position: absolute;
  top: 30px;
  left: 7%;
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