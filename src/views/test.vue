<template>
  <div class="home">
    <transition :name="mode" mode="out-in">
      <button v-if="isEditing" key="save" @click="isEditing = false">
        Save
      </button>
      <button v-else key="edit" @click="isEditing = true">
        Edit
      </button>
    </transition>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      isEditing: true,
      mode: 'slide-fade'
    }
  },
  mounted() {
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
.slide-fade-enter-active {
  transition: 0.3s ease;
}
.slide-fade-leave-active {
  transition: 0.1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
.slide-fade-enter {
  transform: translateX(10px);
}
</style>
