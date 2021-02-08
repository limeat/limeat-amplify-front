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

.button:hover {
  opacity: 0.6;
}

.button {
  width: 80%;
  height: 50px;
  border-radius: 25px;
  font-size: 15px;
  font-weight: 500;
  line-height: 50px;
  border: none;
  margin: 0 auto;
  transition: 0.3s ease;
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

.btnType {
  background-color: rgb(255, 242, 226);
  border-color: rgb(255, 242, 226);
  color: rgb(242, 116, 73);
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

.slide-fade-enter-active {
  transition: 0.3s ease;
}
.slide-fade-leave-active {
  transition: 0.1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
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
input:focus{
  outline: none;
}
input {
  border-radius: 25px;
  height: 50px;
  line-height: 50px;
  border: 1px solid rgb(242, 116, 73);
  font-size: 15px;
  padding-left: 15px;
}

</style>
