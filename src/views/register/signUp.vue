<template>
  <div class="home">
    <div style="min-height: 400pt;">
      <div :class="{ showLoading: loadingBar, noShowLoading: !loadingBar }">
        <img src="../../assets/dergedcbh.gif" width="50" class="center_img">
      </div>
      <img src="../../assets/Icon-arrow-left.svg" class="arrow" @click="gotoPage('/')">
      <div style="height: 28px;"></div>
      <div style="font-size: 28px; color: rgb(112,112,112)">註冊</div>
      <div style="margin: 40px auto; width: 80%; margin-bottom: 30px;">
        <!-- 姓名 -->
        <mu-row gutter>
          <mu-col :span="5">
            <input style="width: 100%;" v-model="firstName" placeholder="姓"/>
          </mu-col>
          <mu-col :span="7">
            <input style="width: 100%;" v-model="lastName" placeholder="名"/>
          </mu-col>
        </mu-row>
        <!-- 生日 -->
        <div class="birthSelect" @click="showDatePicker">
          {{ birth ? birth : 'YYYYMMDD' }}
          <div class="seletBar"></div>
        </div>
        <!-- 手機號碼 -->
        <div style="margin-top: 25px;">
          <input style="width: 100%;"
            v-model="phone"
            placeholder="手機號碼，例：+886912345678"/>
        </div>
      </div>
      <!-- 按鈕 -->
      <div class="button btnSignUp" @click="checkPhone">取得手機驗證碼</div>
      <div v-if="notCompleted" style="color: rgb(242, 116, 73); text-align: center; font-size: 15px; padding-top: 5px;">請確認資料填寫完成</div>
      <div v-if="invalidPhone" style="color: rgb(242, 116, 73); text-align: center; font-size: 15px; padding-top: 5px;">手機號碼格式錯誤</div>
      <div style="color: rgb(112,112,112); margin-top: 15px; font-size: 15px;">已經有帳號了？
        <span style="color: rgb(242,116,73)" @click="gotoPage('/signIn')">登入</span>
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
      firstName: '',
      lastName: '',
      birth: '',
      phone: '',
      notCompleted: false,
      invalidPhone: false,
      loadingBar: false
    }
  },
  mounted() {
  },
  methods: {
    ...register.mapActions({
      getVerCode: 'getVerCode',
      createAccount: 'createAccount',
      saveUserData: 'saveUserData'
    }),
    gotoPage(route) {
      this.$router.push(route);
    },
    selectHandle(select, selectedVal, selectedText) {
      const nowtime = new Date(select);
      const now = nowtime.toLocaleDateString('en', { timeZone: 'Asia/Taipei' });
      // 取得個別值
      let year = '';
      let month = '';
      let date = '';
      let usableMonth = '';
      let usableDate = '';
      // 取得對應時間
      year = now.indexOf('-') !== -1 ? now.split('-')[0] : now.split('/')[2];
      month = now.indexOf('-') !== -1 ? now.split('-')[1] : now.split('/')[0];
      date = now.indexOf('-') !== -1 ? now.split('-')[2] : now.split('/')[1];
      // 修正時間格式
      usableMonth = parseInt(month) < 10 ? `0${month}` : month;
      usableDate = parseInt(date) < 10 ? `0${date}` : date;
      // 產出時間
      this.birth = `${year}${usableMonth}${usableDate}`
    },
    cancelHandle() {
      console.log('取消');
    },
    checkPhone() {
      if (!this.firstName || !this.lastName || !this.birth || !this.phone) {
        this.notCompleted = true;
        this.invalidPhone = false;
      }
      else if (this.phone.indexOf('+886') === -1) {
        this.notCompleted = false;
        this.invalidPhone = true;
      }
      else {
        this.notCompleted = false;
        this.invalidPhone = false;
        // Loading 動畫
        this.loadingBar = true;
        setTimeout(() => { this.loadingBar = false }, 2000);
        // 暫存使用者資料
        this.saveUserData({ firstName: this.firstName, lastName: this.lastName, birth: this.birth });
        
        const postData = {
          phone: this.phone, firstName: this.firstName, lastName: this.lastName, birth: parseInt(this.birth)
        }
        this.createAccount(postData).then((res) => {
          if (res.data.data) {
            const statusCode = res.data.data.createAccount.status;
            if (statusCode === 200) {
              // 取得驗證碼
              this.getVerCode({ phone: this.phone, status: 1 })
                .then(() => {
                  this.$router.push('/phoneVer');
                })
            }
            else if (statusCode === 409) {
              alert('此電話已被註冊！');
            }
            else {
              alert('發生錯誤，請重新嘗試 ' + statusCode);
            }
          }
          else {
            alert('發生錯誤，請重新嘗試');
          }
        })
        .catch((e) => {
          console.log(e);
          alert('發生錯誤，請重新嘗試');
        })
      }
    },
    showDatePicker() {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: 'Date Picker',
          min: new Date(1990, 1, 1),
          max: new Date(),
          value: new Date(),
          confirmTxt: '確定',
          title: '出生年月日',
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        })
      }
      this.datePicker.show()
    }
  }
}
</script>

<style scoped>
.home {
  height: 100vh;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
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
.arrow {
  position: absolute;
  top: 30px;
  left: 35px;
}
.seletBar {
  position: absolute;
  right: 20px;
  top: 20px;
  width: 0;
  height: 0;
  border-width: 7px;
  border-style: solid;
  border-color: rgb(242, 116, 73) transparent transparent transparent;
}
.birthSelect {
  width: 100%;
  text-align: left;
  font-size: 15px;
  border-radius: 25px;
  border: 1px solid rgb(242, 116, 73);
  color: #999;
  padding-left: 15px;
  margin-top: 25px;
  height: 50px;
  line-height: 50px;
  position: relative;
  background-color: #fff;
}
</style>