<template>
  <div class="home">
    <!-- 間隔 -->
    <div style="height: 80px;"></div>
    <!-- logo -->
    <div style="position: relative; width: 100%; height: 260px;">
      <div class="position logo"></div>
      <div class="position logo1"></div>
      <img src="../assets/LIMeat.svg" width="168" class="position logo_img">
    </div>
    <!-- 登入按鈕 -->
    <!-- <img src="../assets/signIn.svg" width="280" class="btn mt-50" @click="goToPage('/signIn')"> -->
    <el-button round type="signIn" class="button mt-25" @click="goToPage('/signIn')">SIGN IN</el-button>
    <br>
    <el-button round type="sign" class="button mt-25">SIGN UP</el-button>
    <!-- <img src="../assets/signUp.svg" width="280" class="btn mt-25"> -->
    <div style="height: 80px;"></div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from 'vuex';
import gql from 'graphql-tag'

export default {
  name: 'Home',
  data() {
    return {
      showLogo: false,
      isActive: false,
    }
  },
  mounted() {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position.coords.latitude);
    })
  },
  methods: {
    ...mapActions({
    }),
    goToPage(route) {
      this.$router.push(route);
    }
  }
}
</script>

<style scoped>
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
  .logo_img {
    top: 60px;
  }
  .mt-50 {
    margin-top: 50px;
  }
  .mt-25 {
    margin-top: 25px;
  }
  .btn {
    transition: 0.5s;
  }
  .button {
    width: 280px;
    height: 50px;
    border-radius: 25px;
  }
  .logo {
    top: 0;
    border-radius: 50%;
    width: 260px;
    height: 260px;
    background-color: rgb(255,180,75);
    opacity: 0.05;
  }
  .logo1 {
    top: 25px;
    border-radius: 50%;
    width: 210px;
    height: 210px;
    background-color: rgb(255,180,75);
    opacity: 0.1;
  }
</style>
