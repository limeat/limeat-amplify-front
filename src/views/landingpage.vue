<template>
  <div class="home">
    <div :class="{ showLoading: loadingBar, noShowLoading: !loadingBar }">
      <img src="../assets/dergedcbh.gif" width="50" class="center_img">
    </div>
    <!-- 間隔 -->
    <div style="height: 80px;"></div>
    <!-- logo -->
    <div style="position: relative; width: 100%; height: 260px;">
      <div class="position logo"></div>
      <div class="position logo1"></div>
      <img src="../assets/LIMeat.svg" width="168" class="position logo_img">
    </div>
    <!-- 登入按鈕 -->
    <div>
      <button class="button btnSignIn" @click="goToPage('/signIn')" style="margin-top: 40px;">SIGN IN</button>
      <button class="button btnSignUp" @click="goToPage('/signUp')" style="margin-top: 25px;">SIGN UP</button>
    </div>
    <div style="height: 80px;"></div>
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
      isActive: false,
      loadingBar: false
    }
  },
  mounted() {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position.coords.latitude);
    })
  },
  methods: {
    ...register.mapActions({
      getAccountInfo: 'getAccountInfo',
      createAccount: 'createAccount'
    }),
    goToPage(route) {
      this.loadingBar = true;
      setTimeout(() => {
        this.loadingBar = false;
      }, 2000);
      this.$router.push(route);
    }
  }
}
</script>

<style scoped>
  .home {
    height: 100vh;
    overflow: auto;
  }
  .position {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
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
  .active {
    transform: translateY(-100%);
  }
  .logo_img {
    top: 60px;
  }
  .btn {
    transition: 0.5s;
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
