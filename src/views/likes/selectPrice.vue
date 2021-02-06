<template>
  <div class="home">
    <div v-if="page === 1" class="flavor"></div>
    <div v-if="page === 2" class="type"></div>
    <div v-if="page === 3" class="price">
      <div style="font-size: 28px; color: #fff;">價格區間</div>
      <div style="font-size: 15px; color: #fff;">選擇您一餐含運費的預算價錢</div>
      <div>
        <i v-if="nowSelect !== 0"
          class="el-icon-caret-top"
          style="margin-top: 20px; font-size: 40px;"
          @click="nowSelect -= 1">
        </i>
        <i v-else
          class="el-icon-caret-top"
          style="margin-top: 20px; font-size: 40px; color: #c9c7c7;">
        </i>
      </div>
      <div class="selectBox">
        <div class="originBox" :style="Y">
          <div v-for="(price, idx) in prices"
            :key="idx + 'p'" class="priceBox"
            :class="{ isSelect: idx === nowSelect, noSelect: idx !== nowSelect }"
            @click="goToPosition(idx)">
            {{ price }}
          </div>
        </div>
      </div>
      <div style="margin-top: -5px;">
        <i v-if="nowSelect !== 4"
          class="el-icon-caret-bottom"
          style="font-size: 40px;"
          @click="nowSelect += 1">
        </i>
        <i v-else
          class="el-icon-caret-bottom"
          style="font-size: 40px; color: #c9c7c7;">
        </i>
      </div>
      <!-- <div class="selectBox" ref="myScroll"
        @touchstart="touchStart($event)"
        @touchmove="touchMove($event)"
        @touchend="touchEnd($event)">
        <div v-for="(price, idx) in prices"
          :key="idx + 'p'" class="priceBox"
          :class="{ isSelect: idx === nowSelect + 2, noSelect: idx !== nowSelect + 2 }"
          @click="goToPosition(idx)">
          {{ price }}
        </div>
      </div> -->
      <el-button round
        type="sign"
        class="button">
        開始使用 LIMEAT
      </el-button>
    </div>
    <el-row>
      <el-col :span="8" v-for="(btn, index) in buttons" :key="index + 'b'">
        <div :class="{ isBoxShadow: page !== index + 1 }"
          class="belowBtn"
          :style="{ backgroundColor: btn.bgColor, color: btn.color }"
          @click="page = index + 1">
          {{ btn.label }}
        </div>
      </el-col>
    </el-row>
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
      scrollIsToTop: 0,
      showLogo: false,
      isActive: false,
      nowSelect: 2,
      page: 3,
      prices: [
        '100 以內',
        '100 - 150',
        '150 - 200',
        '200 - 300',
        '300 以上'
      ],
      buttons: [
        {
          bgColor: 'rgb(237, 223, 211)',
          color: 'rgb(237, 113, 70)',
          label: '口味喜好'
        },
        {
          bgColor: 'rgb(252, 177, 74)',
          color: 'rgb(15, 80, 106)',
          label: '類別喜好'
        },
        {
          bgColor: 'rgb(237, 113, 70)',
          color: 'rgb(237, 223, 211)',
          label: '價格區間'
        }
      ]
    }
  },
  mounted() {
    if (this.register.status === 2) {
      this.page = 3;
      this.$refs.myScroll.scrollTop = 230;
    }
    else {
      this.page = 1;
    }
  },
  computed: {
    ...register.mapGetters({
      register: 'register'
    }),
    Y() {
      return `transform: translateY(${ -70 * this.nowSelect }px)`
    }
  },
  methods: {
    ...mapActions({
    }),
    changePage(current) {
      console.log('当前轮播图序号为:' + current)
    },
    clickHandler(item, index) {
      console.log(item, index)
    },
    goToPage(route) {
      this.$router.push(route);
    },
    touchStart(e) {
      // this.nowSelect = -3;
    },
    touchMove(e) {
      // this.nowSelect = -3;
    },
    goToPosition(index) {
      if (index > 1) {
        this.$refs.myScroll.scrollTop = (index - 2) * 60;
        this.nowSelect = index - 2;
      }
    },
    // touchEnd(e) {
    //   const pageY = this.$refs.myScroll.scrollTop;
    //   if (pageY < 30) {
    //     this.$refs.myScroll.scrollTop = 0;
    //     this.nowSelect = 0;
    //   }
    //   if (pageY > 30 && pageY < 60) {
    //     this.$refs.myScroll.scrollTop = 60;
    //     this.nowSelect = 1;
    //   }
    //   if (pageY > 60 && pageY < 90) {
    //     this.$refs.myScroll.scrollTop = 60;
    //     this.nowSelect = 1;
    //   }
    //   if (pageY > 90 && pageY < 120) {
    //     this.$refs.myScroll.scrollTop = 120;
    //     this.nowSelect = 2;
    //   }
    //   if (pageY > 120 && pageY < 150) {
    //     this.$refs.myScroll.scrollTop = 120;
    //     this.nowSelect = 2;
    //   }
    //   if (pageY > 150 && pageY < 180) {
    //     this.$refs.myScroll.scrollTop = 180;
    //     this.nowSelect = 3;
    //   }
    //   if (pageY > 180 && pageY < 210) {
    //     this.$refs.myScroll.scrollTop = 180;
    //     this.nowSelect = 3;
    //   }
    //   if (pageY > 210) {
    //     this.$refs.myScroll.scrollTop = 240;
    //     this.nowSelect = 4;
    //   }
    //   console.log(this.nowSelect);
    // }
  }
}
</script>

<style scoped>
  .home {
    background-color: rgb(15, 80, 106);
    height: 100vh;
  }
  .price {
    background-color: rgb(237, 113, 70);
    height: calc(100vh - 90px);
    padding-top: 40px;
  }
  .originBox {
    transition: 0.5s;
    /* transform: translateY(-140px); */
  }
  .isSelect {
    /* border-top: 2px solid;
    border-bottom: 2px solid; */
    font-size: 22px;
  }
  .noSelect {
    font-size: 22px;
    opacity: 0.5;
  }
  .selectBox {
    width: 80%;
    height: 70px;
    border-radius: 20px;
    background-color: rgb(233, 155, 128);
    border: 2px solid rgba(0, 0, 0, 0.16);
    margin: 0 auto;
    margin-top: -10px;
    overflow: hidden;
    position: relative;
  }
  .priceBox {
    /* border: 1px solid #fff; */
    color: #fff;
    width: 95%;
    margin: 0 auto;
    height: 70px;
    line-height: 70px;
    font-weight: 600;
  }
  .flavor {
    background-color: rgb(237, 223, 211);
    height: calc(100vh - 90px);
  }
  .type {
    background-color: rgb(252, 177, 74);
    height: calc(100vh - 90px);
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
  .belowBtn {
    width: 100%;
    /* border: 1px solid #fff; */
    height: 60px;
    font-size: 18px;
    line-height: 60px;
    border-radius: 0 0 15px 15px;
  }
  .isBoxShadow {
    -webkit-box-shadow: inset 0 3px 10px -5px #555;
    -moz-box-shadow: inset 0 3px 10px -5px #555;
    box-shadow: inset 0 3px 10px -5px #555;
  }
  .button {
    width: 80%;
    height: 50px;
    margin-top: 50px;
    color: rgb(15, 80, 106);
    border: 0.5px solid rgb(15, 80, 106);
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