<template>
  <div class="home">
    <div style="min-height: 850px;"></div>
    <div :class="{ showLoading: loadingBar, noShowLoading: !loadingBar }">
      <img src="../../assets/dergedcbh.gif" width="50" class="center_img">
    </div>
    <div class="flavor" key="flavor" :class="{ isShow: page === 0 }">
      <!-- 標題 -->
      <mu-row>
        <mu-col :span="3" style="text-align: right;">
          <img style="margin-top: 10px;" src="../../assets/Icon-chart-line.svg"/>
        </mu-col>
        <mu-col :span="6" style="text-align: center;">
          <div style="font-size: 5vw; color: rgb(49, 100, 126); font-weight: 500;">讓我們知道您的</div>
          <div style="font-size: 9vw; color: rgb(49, 100, 126); font-weight: 500; margin-top: -5px;">口味喜好</div>
        </mu-col>
        <mu-col :span="3" style="text-align: left;">
          <img src="../../assets/Icon-message-circle.svg"/>
        </mu-col>
      </mu-row>
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
      <mu-row>
        <mu-col :span="3" style="text-align: right;">
          <img style="margin-top: 10px;" src="../../assets/Icon-chart-line-orange.svg"/>
        </mu-col>
        <mu-col :span="6" style="text-align: center;">
          <div style="font-size: 5vw; color: rgb(49, 100, 126); font-weight: 500;">讓我們知道您的</div>
          <div style="font-size: 9vw; color: rgb(49, 100, 126); font-weight: 500; margin-top: -5px;">類別喜好</div>
        </mu-col>
        <mu-col :span="3" style="text-align: left;">
          <img src="../../assets/Icon-message-circle-white.svg"/>
        </mu-col>
      </mu-row>
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
        @click="goToPage('/main')">
        開始使用 LIMEAT
      </button>
    </div>
    <div class="btn_group">
      <mu-row>
        <mu-col :span="4" v-for="(btn, index) in buttons" :key="index + 'b'">
          <div :class="{ isBoxShadow: page !== index }"
            class="belowBtn"
            :style="{ backgroundColor: btn.bgColor, color: btn.color }"
            @click="page = index">
            {{ btn.label }}
          </div>
        </mu-col>
      </mu-row>
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
      userToken: '',
      page: 0,
      count: 0,
      loadingBar: false,
      selectedPrice: '',
      flavorSelect: [],
      typeSelect: [],
      flavors: [
        { type: 'TAIWANESE', label: '台式料理' },
        { type: 'JAPANESE_AND_KOREAN', label: '日韓料理' },
        { type: 'AMERICAN', label: '美式料理' },
        { type: 'THAI_AND_VIETNAM', label: '泰越料理' },
        { type: 'ITALIAN_AND_FRENCH', label: '義法料理' },
        { type: 'VEGETARIAN', label: '素食料理' }
      ],
      types: [
        { type: 'RICE', label: '飯食類' },
        { type: 'NOODLE_AND_FLOUR', label: '麵食類' },
        { type: 'PORRIDGE_AND_SOUP', label: '粥湯類' },
        { type: 'BREAD_AND_DESSERT', label: '麵包甜點' },
        { type: 'HAND_SHAKE_BEVERAGE', label: '手搖飲料' },
        { type: 'LIGHT_MEAL', label: '蔬果輕食' }
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
    const token = localStorage.getItem('userToken');
    if (!token) {
      this.$router.push('/');
    }
    else {
      this.userToken = token;
      this.getAccountInfo({ token }).then((res) => {
        if (res.data.data) {
          const statusCode = res.data.data.getAccount.status;
          if (statusCode === 200) {
            const accountDetail = res.data.data.getAccount.account;
            // 確認使用者資訊
            if (accountDetail.preferredCuisines) {
              this.flavorSelect = accountDetail.preferredCuisines;
            }
            if (accountDetail.preferredFoodTypes) {
              this.typeSelect = accountDetail.preferredFoodTypes;
            }
            if (accountDetail.perMealBudgetRange) {
              if (accountDetail.perMealBudgetRange[0] === 0) {
                this.selectedPrice = '100元以內';
              }
              if (accountDetail.perMealBudgetRange[0] === 100) {
                this.selectedPrice = '100-150元';
              }
              if (accountDetail.perMealBudgetRange[0] === 150) {
                this.selectedPrice = '150-200元';
              }
              if (accountDetail.perMealBudgetRange[0] === 200) {
                this.selectedPrice = '200-300元';
              }
              if (accountDetail.perMealBudgetRange[0] === 300) {
                this.selectedPrice = '300元以上';
              }
            }
          }
          else {
            this.$router.push('/');
          }
        }
        else {
          this.$router.push('/');
        }
      })
      .catch(() => {
        this.$router.push('/');
      })
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
      setDefaultLikes: 'setDefaultLikes',
      updateAccountInfo: 'updateAccountInfo',
      getAccountInfo: 'getAccountInfo'
    }),
    load () {
      this.count += 2
    },
    goToPage(route) {
      this.loadingBar = true;
      setTimeout(() => {
        this.loadingBar = false;
      }, 2000);
      this.setDefaultLikes({
        flavors: this.flavorSelect,
        types: this.typeSelect,
        price: this.selectedPrice
      });
      let perMealBudgetRange = [];
      if (this.selectedPrice === '100 元以內') {
        perMealBudgetRange = [0, 100];
      }
      else if (this.selectedPrice === '100-150元') {
        perMealBudgetRange = [100, 150];
      }
      else if (this.selectedPrice === '150-200元') {
        perMealBudgetRange = [150, 200];
      }
      else if (this.selectedPrice === '200-300元') {
        perMealBudgetRange = [200, 300];
      }
      else {
        perMealBudgetRange = [300];
      }
      const postData = {
        token: this.userToken,
        perMealBudgetRange: perMealBudgetRange,
        preferredCuisines: this.flavorSelect,
        preferredFoodTypes: this.typeSelect,
        // frequent_districts: 'TAIPEI_DAAN',
        // hobbies: 'SPORT',
        // socialEvents: 'TRAVELING',
        // transportations: 'MRT'
      };
      this.updateAccountInfo(postData).then((res) => {
        if (res.data.data) {
          const statusCode = res.data.data.updateAccount.status;
          if (statusCode === 200) {
            this.$router.push(route);
          }
          else {
            alert('登入發生錯誤 ' + statusCode);
          }
        }
        else {
          alert('登入發生錯誤');
        }
      })
      .catch(() => {
        alert('登入發生錯誤');
      })
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
      this.page = 1;
    },
    getTypeSelected() {
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
  .isShow {
    left: 0;
  }
  .noShow {
    left: 100%;
  }
  .circle {
    width: 90px;
    height: 90px;
    background-color: rgb(252, 177, 74);
    border: 1px solid rgb(112, 112, 112);
    border-radius: 50%;
    margin: 0 auto;
    margin-top: 0px;
  }
  .circle1 {
    width: 90px;
    height: 90px;
    background-color: rgb(255, 242, 226);
    border: 1px solid rgb(112, 112, 112);
    border-radius: 50%;
    margin: 0 auto;
    margin-top: 0px;
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
    border: 4px solid rgb(15, 80, 106);
  }
  .isInFlavorList {
    border: 4px solid rgb(225, 89, 54);
  }
  .priceBar {
    background-color: rgb(240, 140, 105);
    width: 80%;
    border-radius: 25px;
    height: 13vw;
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