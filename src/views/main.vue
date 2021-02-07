<template>
  <div class="home">
    <!-- 首頁 Bar -->
    <div id="topBar">
      <el-row :gutter="10">
        <el-col :span="3">
          <img src="../assets/Adjust.svg"/>
        </el-col>
        <el-col :span="18" style="line-height: 45px; position: relative;">
          <el-input style="width: 100%;"></el-input>
          <i class="el-icon-search search"></i>
        </el-col>
        <el-col :span="3" style="line-height: 65px; position: relative;">
          <img src="../assets/Icon-bell.svg"/>
        </el-col>
      </el-row>
    </div>
    <!-- 選擇 -->
    <div id="selectBar">
      <el-row>
        <el-col :span="9">
          <img src="../assets/flavor.svg" width="80%">
        </el-col>
        <el-col :span="6">
          <img src="../assets/budget.svg" width="100%">
        </el-col>
        <el-col :span="9">
          <img src="../assets/limit.svg" width="80%">
        </el-col>
      </el-row>
    </div>
    <!-- 內容 -->
    <div style="height: 300px; position: relative; margin-top: 20px;">
      <div class="info">
        <div style="font-size: 18px; color: rgb(225, 89, 54); font-weight: 500; text-align: right;">預算管理</div>
      </div>
    </div>
    <!-- 選單 -->
    <div class="bottom_nav">
      <div class="bottomNav">
        <!-- 第一層選單 -->
        <el-row style="line-height: 65px;">
          <el-col :span="6">
            <img src="../assets/Icon-home.svg">
          </el-col>
          <el-col :span="6">
            <img src="../assets/Icon-+.svg">
          </el-col>
          <el-col :span="6">
            <img src="../assets/Path.svg">
          </el-col>
          <el-col :span="6">
            <img src="../assets/Icon-person.svg">
          </el-col>
        </el-row>
        <!-- <mu-bottom-nav style="background-color: inherit; color: rgb(242, 116, 73)">
          <mu-bottom-nav-item v-for="(item, index) in firstList"
            :key="index + 'l1'"
            :value="item.value" :icon="item.icon">
          </mu-bottom-nav-item>
        </mu-bottom-nav> -->
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions, createNamespacedHelpers } from 'vuex';
import gql from 'graphql-tag'

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
}
#selectBar {
  width: 95%;
  margin-top: 10px;
  margin: 0 auto;
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