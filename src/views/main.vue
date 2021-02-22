<template>
  <div class="home">
    <div style="min-height: 700px;">
      <!-- 首頁 Bar -->
      <div id="topBar">
        <mu-row gutter>
          <mu-col :span="2">
            <div style="position: relative; width: 80%;">
              <img src="../assets/Adjust.svg" width="90%" class="img"/>
            </div>
          </mu-col>
          <mu-col :span="8" style="line-height: 40px; position: relative;">
            <input style="width: 100%;"/>
            <i class="el-icon-search search"></i>
          </mu-col>
          <mu-col :span="2" style="line-height: 65px; position: relative;">
            <img src="../assets/Icon-bell.svg"/>
          </mu-col>
        </mu-row>
      </div>
      <!-- 選擇 -->
      <div id="selectBar">
        <mu-row>
          <mu-col :span="4">
            <img src="../assets/flavor.svg" width="90%">
          </mu-col>
          <mu-col :span="4">
            <img src="../assets/budget.svg" width="70%">
          </mu-col>
          <mu-col :span="4">
            <img src="../assets/limit.svg" width="90%">
          </mu-col>
        </mu-row>
      </div>
      <!-- 內容 -->
      <div style="height: 200px; position: relative; margin-top: 20px;">
        <div class="info">
          <div style="font-size: 18px; color: rgb(225, 89, 54); font-weight: 500; text-align: right;">預算管理</div>
        </div>
      </div>
      <!-- 內容 -->
      <div style="height: 200px; position: relative; margin-top: 20px;">
        <div class="info">
          <div style="font-size: 18px; color: rgb(225, 89, 54); font-weight: 500; text-align: right;">推薦餐點</div>
        </div>
      </div>
      <div style="height: 50px;"></div>
      <!-- 選單 -->
      <div class="bottom_nav">
        <div class="bottomNav">
          <!-- 第一層選單 -->
          <mu-row style="line-height: 65px;">
            <mu-col :span="3">
              <img src="../assets/Icon-home.svg">
            </mu-col>
            <mu-col :span="3">
              <img src="../assets/Icon-+.svg">
            </mu-col>
            <mu-col :span="3">
              <img src="../assets/Path.svg">
            </mu-col>
            <mu-col :span="3">
              <img src="../assets/Icon-person.svg">
            </mu-col>
          </mu-row>
          <!-- <mu-bottom-nav style="background-color: inherit; color: rgb(242, 116, 73)">
            <mu-bottom-nav-item v-for="(item, index) in firstList"
              :key="index + 'l1'"
              :value="item.value" :icon="item.icon">
            </mu-bottom-nav-item>
          </mu-bottom-nav> -->
        </div>
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
      menuList: [
        { icon: 'Icon-home' },
        { icon: 'Icon-+' },
        { icon: 'Path' },
        { icon: 'Icon-person' }
      ],
    }
  },
  mounted() {
  },
  computed: {
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
#topBar {
  padding: 20px 15px 0 15px;
  width: 95%;
  margin: 0 auto;
  position: relative;
}
#selectBar {
  width: 95%;
  margin-top: 10px;
  margin: 0 auto;
}
.img {
  margin-top: 30%;
}
.filterBar {
  padding: 5px 10px;
  width: 100%;
  background-color: rgb(247, 247, 247, 0.5);
  border-radius: 15px;
}
.info {
  position: absolute;
  padding: 2px 5px;
  left: 0;
  background-color: rgb(255, 233, 200);
  width: 130px;
  height: 180px;
  box-shadow: 7px -7px rgb(225, 89, 54);
}
.home {
  height: 100vh;
  background-color: rgb(252, 177, 74);
  overflow: auto;
}
.search {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 15px;
  font-size: 20px;
  color: rgb(242, 116, 73);
}
.bottom_nav {
  width: 100%;
}
.bottomNav {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: #fff;
  height: 73px;
}
.dataBox {
  width: 80%;
  height: 300px;
  padding: 20px;
  margin: 0 auto;
  font-weight: 500;
  margin-top: 40px;
  border-radius: 20px;
  background-color: rgb(240, 161, 132);
}
</style>