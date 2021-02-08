<template>
  <div class="home">
    <div class="flavor" key="flavor" :class="{ isShow: page === 0 }">
      <!-- 標題 -->
      <el-row>
        <el-col :span="7" style="text-align: right;">
          <img style="margin-top: 10px;" src="../../assets/Icon-chart-line.svg"/>
        </el-col>
        <el-col :span="10" style="text-align: center;">
          <div style="font-size: 5vw; color: rgb(49, 100, 126); font-weight: 500;">讓我們知道您的</div>
          <div style="font-size: 9vw; color: rgb(49, 100, 126); font-weight: 500; margin-top: -5px;">口味喜好</div>
        </el-col>
        <el-col :span="7" style="text-align: left;">
          <img src="../../assets/Icon-message-circle.svg"/>
        </el-col>
      </el-row>
      <!-- 選項 -->
      <div style="width: 80%; margin: 0 auto;">
        <div v-for="(flavor, idx) in flavors" :key="idx + 'f'" style="width: 50%; padding: 10px; display: inline-block;">
          <div :class="{ isInFlavorList: flavorSelect.indexOf(flavor.type) !== -1 }"
            class="circle"
            @click="getFlavor(flavor.type)">
          </div>
          <div style="font-size: 15px; margin-top: 5px;">{{ flavor.label }}</div>
        </div>
      </div>
      <button :class="{ notActive: flavorSelect.length < 1, isActive:  flavorSelect.length >= 1 }"
        class="button btnSignIn"
        style="margin-top: 25px;"
        @click="getFlavorSelected">
        NEXT
      </button>
    </div>
    <!-- 類別選擇 -->
    <div class="type" key="type" :class="{ isShow: page === 1, noShow: page === 0 }">
      <el-row>
        <el-col :span="7" style="text-align: right;">
          <img style="margin-top: 10px;" src="../../assets/Icon-chart-line-orange.svg"/>
        </el-col>
        <el-col :span="10" style="text-align: center;">
          <div style="font-size: 5vw; color: rgb(49, 100, 126); font-weight: 500;">讓我們知道您的</div>
          <div style="font-size: 9vw; color: rgb(49, 100, 126); font-weight: 500; margin-top: -5px;">類別喜好</div>
        </el-col>
        <el-col :span="7" style="text-align: left;">
          <img src="../../assets/Icon-message-circle-white.svg"/>
        </el-col>
      </el-row>
      <!-- 選項 -->
      <div style="width: 80%; margin: 0 auto;">
        <div v-for="(type, idx) in types" :key="idx + 't'" style="width: 50%; padding: 10px; display: inline-block;">
          <div :class="{ isInTypeList: typeSelect.indexOf(type.type) !== -1 }"
            class="circle1"
            @click="getType(type.type)">
          </div>
          <div style="font-size: 15px; margin-top: 5px;">{{ type.label }}</div>
        </div>
      </div>
      <button :class="{ notActive: typeSelect.length < 1, isActive:  typeSelect.length >= 1 }"
        class="button btnType"
        style="margin-top: 25px;"
        @click="getTypeSelected">
        NEXT
      </button>
    </div>
    <!-- 價格區間 -->
    <div class="price" key="price" :class="{ isShow: page === 2, noShow: page !== 2 }">
      <div style="font-size: 28px; color: #fff;">價格區間</div>
      <div style="font-size: 15px; color: #fff;">選擇您一餐含運費的預算價錢</div>
      <div v-for="(price, idx) in prices"
        class="priceBar"
        :class="{ isSelect: selectedPrice === price, notSelect: (selectedPrice !== price || selectedPrice !== '') }"
        @click="selectPrice(price)"
        :key="idx + 'p'">
        {{ price }}
      </div>
      <button :class="{ notActive: selectedPrice === '', isActive: selectedPrice !== '' }"
        class="button btnStart"
        style="margin-top: 20px;"
        @click="goToPage('/checkData')">
        開始使用 LIMEAT
      </button>
    </div>
    <div class="btn_group">
      <el-row>
        <el-col :span="8" v-for="(btn, index) in buttons" :key="index + 'b'">
          <div :class="{ isBoxShadow: page !== index }"
            class="belowBtn"
            :style="{ backgroundColor: btn.bgColor, color: btn.color }"
            @click="page = index">
            {{ btn.label }}
          </div>
        </el-col>
      </el-row>
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
      scrollIsToTop: 0,
      showLogo: false,
      isActive: false,
      nowSelect: 2,
      page: 0,
      count: 0,
      selectedPrice: '',
      flavorSelect: [],
      typeSelect: [],
      flavors: [
        { type: 'taiwanese', label: '台式料理' },
        { type: 'korean', label: '日韓料理' },
        { type: 'american', label: '美式料理' },
        { type: 'taliand', label: '泰越料理' },
        { type: 'italian', label: '義法料理' },
        { type: 'vergin', label: '素食料理' }
      ],
      types: [
        { type: 'rice', label: '飯食類' },
        { type: 'noodle', label: '麵食類' },
        { type: 'soup', label: '粥湯類' },
        { type: 'dessert', label: '麵包甜點' },
        { type: 'drink', label: '手搖飲料' },
        { type: 'veg', label: '蔬果輕食' }
      ],
      prices: [
        '100元以內',
        '100-150元',
        '150-200元',
        '200-300元',
        '300元以上'
      ],
      buttons: [
        {
          bgColor: 'rgb(255, 242, 226)',
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
          color: 'rgb(255, 242, 226)',
          label: '價格區間'
        }
      ]
    }
  },
  mounted() {
    if (this.register.status === 2) {
      this.page = 2;
    }
    else {
      this.page = 0;
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
    ...register.mapActions({
      setDefaultLikes: 'setDefaultLikes'
    }),
    load () {
      this.count += 2
    },
    goToPage(route) {
      this.setDefaultLikes({
        flavors: this.flavorSelect,
        types: this.typeSelect,
        price: this.selectedPrice
      });
      this.$router.push(route);
    },
    selectPrice(price) {
      if (this.selectedPrice === price) {
        this.selectedPrice = '';
      }
      else {
        this.selectedPrice = price;
      }
    },
    getFlavorSelected() {
      console.log(this.flavorSelect);
      this.page = 1;
    },
    getTypeSelected() {
      console.log(this.typeSelect);
      this.page = 2;
    },
    getType(type) {
      const position = this.typeSelect.indexOf(type);
      if (position === -1) {
        this.typeSelect.push(type);
      }
      else {
        this.typeSelect.splice(position, 1);
      }
    },
    getFlavor(flavor) {
      const position = this.flavorSelect.indexOf(flavor);
      if (position === -1) {
        this.flavorSelect.push(flavor);
      }
      else {
        this.flavorSelect.splice(position, 1);
      }
    }
  }
}
</script>

<style scoped>
  .home {
    background-color: rgb(15, 80, 106);
    height: 100vh;
  }
  .isShow {
    left: 0;
  }
  .noShow {
    left: 100%;
  }
  .circle {
    width: 25vw;
    height: 25vw;
    background-color: rgb(252, 177, 74);
    border: 1px solid rgb(112, 112, 112);
    border-radius: 50%;
    margin: 0 auto;
    margin-top: 5px;
  }
  .circle1 {
    width: 25vw;
    height: 25vw;
    background-color: rgb(255, 242, 226);
    border: 1px solid rgb(112, 112, 112);
    border-radius: 50%;
    margin: 0 auto;
    margin-top: 5px;
  }
  .isActive {
    opacity: 1;
  }
  .notActive {
    opacity: 0;
  }
  .notSelect {
    color:rgb(255, 255, 255, 0.5);
  }
  .isSelect {
    box-shadow: 0 0 0 3px white;
    color:rgb(255, 255, 255);
  }
  .isInTypeList {
    box-shadow: inset 0 0 0 5px rgb(15, 80, 106);
    border: none;
  }
  .isInFlavorList {
    box-shadow: inset 0 0 0 5px rgb(225, 89, 54);
    border: none;
  }
  .priceBar {
    background-color: rgb(240, 140, 105);
    width: 80%;
    border-radius: 25px;
    height: 50px;
    margin: 0 auto;
    margin-top: 20px;
    /* color: #fff; */
    font-size: 20px;
    font-weight: 600;
    line-height: 50px;
    box-sizing: content-box;
  }
  .price {
    background-color: rgb(237, 113, 70);
    height: calc(100vh - 80px);
    overflow: auto;
    padding-top: 40px;
    padding-bottom: 30px;
    width: 100%;
    position: absolute;
    top: 0;
    transition: 0.3s;
  }
  .flavor {
    background-color: rgb(255, 242, 226);
    padding-top: 40px;
    padding-bottom: 30px;
    height: calc(100vh - 80px);
    overflow: auto;
    width: 100%;
    position: absolute;
    top: 0;
    transition: 0.3s;
  }
  .type {
    background-color: rgb(252, 177, 74);
    height: calc(100vh - 90px);
    padding-top: 40px;
    padding-bottom: 30px;
    height: calc(100vh - 80px);
    overflow: auto;
    width: 100%;
    position: absolute;
    top: 0;
    transition: 0.3s;
  }
  .btn_group {
    position: absolute;
    width: 100%;
    bottom: 20px;
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
</style>