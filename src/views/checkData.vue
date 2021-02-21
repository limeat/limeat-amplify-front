<template>
  <div class="home">
    <div style="font-size: 28px; color: #fff; font-weight: 600;">資料檢查</div>
    <div class="dataBox">
      <div style="color: #fff; font-size: 20px; text-align: left;">姓名：
        <span style="color: rgb(15, 80, 106)">{{ user.detail.firstName }}{{ user.detail.lastName }}</span>
      </div>
      <div style="color: #fff; font-size: 20px; text-align: left; margin-top: 10px;">生日：
        <span style="color: rgb(15, 80, 106)">{{ user.detail.birth }}</span>
      </div>
      <div style="color: #fff; font-size: 20px; text-align: left; margin-top: 10px;">電話：
        <span style="color: rgb(15, 80, 106)">{{ register.phone }}</span>
      </div>
      <div style="color: #fff; font-size: 20px; text-align: left; margin-top: 10px;">口味：
        <span style="color: rgb(15, 80, 106)">{{ user.likes.flavors }}</span>
      </div>
      <div style="color: #fff; font-size: 20px; text-align: left; margin-top: 10px;">類型：
        <span style="color: rgb(15, 80, 106)">{{ user.likes.types }}</span>
      </div>
      <div style="color: #fff; font-size: 20px; text-align: left; margin-top: 10px;">預算：
        <span style="color: rgb(15, 80, 106)">{{ user.likes.price }}</span>
      </div>
    </div>
    <div class="button btnType"
      style="margin-top: 25px;"
      @click="goToPage('/main')">
      確認
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
    }
  },
  mounted() {
    console.log(this.user);
    console.log(this.register);
  },
  computed: {
      ...register.mapGetters({
        user: 'user',
        register: 'register'
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
.home {
  height: 100vh;
  padding-top: 40px;
  background-color: rgb(252, 177, 74);
  overflow: auto;
}
.dataBox {
  width: 80%;
  padding: 20px;
  margin: 0 auto;
  font-weight: 500;
  margin-top: 40px;
  border-radius: 20px;
  background-color: rgb(240, 161, 132);
}
</style>