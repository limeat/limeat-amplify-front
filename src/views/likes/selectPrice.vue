<template>
  <div class="home">
    <div v-if="page === 1" class="flavor">
      <!-- 標題 -->
      <el-row>
        <el-col :span="7" style="text-align: right;">
          <img src="../../assets/Icon-chart-line.svg"/>
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
        <ul class="infinite-list" style="overflow: auto; list-style-type: none; padding: 0;">
          <li class="infinite-list-item" style="margin-bottom: 20px;">
            <el-row>
              <el-col :span="12">
                <div class="circle"></div>
                <div style="font-size: 15px; margin-top: 5px;">台式料理</div>
              </el-col>
              <el-col :span="12">
                <div class="circle"></div>
                <div style="font-size: 15px; margin-top: 5px;">韓式料理</div>
              </el-col>
            </el-row>
          </li>
          <li class="infinite-list-item" style="margin-bottom: 20px;">
            <el-row>
              <el-col :span="12">
                <div class="circle"></div>
                <div style="font-size: 15px; margin-top: 5px;">美式料理</div>
              </el-col>
              <el-col :span="12">
                <div class="circle"></div>
                <div style="font-size: 15px; margin-top: 5px;">泰越料理</div>
              </el-col>
            </el-row>
          </li>
          <li class="infinite-list-item">
            <el-row>
              <el-col :span="12">
                <div class="circle"></div>
                <div style="font-size: 15px; margin-top: 5px;">義法料理</div>
              </el-col>
              <el-col :span="12">
                <div class="circle"></div>
                <div style="font-size: 15px; margin-top: 5px;">素食料理</div>
              </el-col>
            </el-row>
          </li>
        </ul>
        <!-- <div v-for="(flavor, idx) in flavors" :key="idx + 'f'" style="width: 50%; padding: 10px; display: inline-block;">
          <div class="circle"></div>
          <div style="font-size: 15px; margin-top: 5px;">{{ flavor.label }}</div>
        </div> -->
      </div>
    </div>
    <div v-if="page === 2" class="type"></div>
    <!-- 價格區間 -->
    <div v-if="page === 3" class="price">
      <div style="font-size: 28px; color: #fff;">價格區間</div>
      <div style="font-size: 15px; color: #fff;">選擇您一餐含運費的預算價錢</div>
      <div v-for="(price, idx) in prices"
        class="priceBar"
        :class="{ isSelect: selectedPrice === price, notSelect: (selectedPrice !== price || selectedPrice !== '') }"
        @click="selectPrice(price)"
        :key="idx + 'p'">
        {{ price }}
      </div>
      <div :class="{ notActive: selectedPrice === '', isActive: selectedPrice !== '' }"
        class="button btnStart"
        style="margin-top: 20px;">
        開始使用 LIMEAT
      </div>
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
      count: 0,
      selectedPrice: '',
      flavorSelect: [],
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
    load () {
      this.count += 2
    },
    goToPage(route) {
      this.$router.push(route);
    },
    selectPrice(price) {
      if (this.selectedPrice === price) {
        this.selectedPrice = '';
      }
      else {
        this.selectedPrice = price;
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
  .circle {
    width: 25vw;
    height: 25vw;
    background-color: rgb(252, 177, 74);
    border: 1px solid rgb(112, 112, 112);
    border-radius: 50%;
    margin: 0 auto;
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
    height: calc(100vh - 90px);
    overflow: auto;
    padding-top: 40px;
    padding-bottom: 20px;
  }
  .flavor {
    background-color: rgb(255, 242, 226);
    padding-top: 40px;
    height: calc(100vh - 90px);
    overflow: auto;
  }
  .type {
    background-color: rgb(252, 177, 74);
    height: calc(100vh - 90px);
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