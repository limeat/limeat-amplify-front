<template>
  <div id="app">
    <transition name="slide-fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style>

.mt-15 {
  margin-top: 15px;
}
.mt-50 {
  margin-top: 50px;
}
.mt-25 {
  margin-top: 25px;
}

.button {
  width: 80%;
  height: 50px;
  border-radius: 25px;
  font-size: 15px;
  font-weight: 500;
  line-height: 50px;
  margin: 0 auto;
  transition: all .3s ease;
}

.btnStart {
  background-color: rgb(255, 180, 75);
  border: 1px solid rgb(15, 80, 106);
  color: rgb(15, 80, 106);
}

.btnSignIn {
  background-color: rgb(242, 116, 73);
  border-color: rgb(242, 116, 73);
  color: #fff;
}

.btnSignUp {
  background-color: rgb(255, 180, 75);
  border-color: rgb(255, 180, 75);
  color: #fff;
}

.el-icon-caret-top:hover {
  color: #5866b0 !important;
}

.el-icon-caret-bottom:hover {
  color: #5866b0 !important;
}

/* .el-button--sign.is-active,
.el-button--sign:active {
  background: rgb(255, 180, 75, 0.7);
  border-color: rgb(255, 180, 75, 0.7);
  color: #fff;
}

.el-button--sign:focus,
.el-button--sign:hover {
  background: rgb(255, 180, 75, 0.7);
  border-color: rgb(255, 180, 75, 0.7);
  color: #fff;
}

.el-button--sign {
  color: #FFF;
  background-color: rgb(255, 180, 75);
  border-color: rgb(255, 180, 75);
}
.el-button--signIn.is-active,
.el-button--signIn:active {
  background: rgb(242, 116, 73, 0.7);
  border-color: rgb(242, 116, 73, 0.7);
  color: #fff;
}

.el-button--signIn:focus,
.el-button--signIn:hover {
  background: rgb(242, 116, 73, 0.7);
  border-color: rgb(242, 116, 73, 0.7);
  color: #fff;
}

.el-button--signIn {
  color: #FFF;
  background-color: rgb(242, 116, 73);
  border-color: rgb(242, 116, 73);
} */

.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}
.el-input__inner {
  border-radius: 25px;
  height: 50px;
  border: 1px solid rgb(242,116,73, 0.5);
}

</style>
