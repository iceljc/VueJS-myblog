<template>
  <div class="container">
    <app-header></app-header>
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Header from "./components/Header.vue";

export default {
  // name: 'app',
  components: {
    "app-header": Header,
  },
  methods: {
      ...mapActions({
          fetchData: 'loadData'
      }),
  },
  created() {
      this.fetchData();
  }
}
</script>

<style>
  body {
    padding: 20px;
  }

  .slide-enter-active {
      animation: slide-in 200ms ease-out forwards;
  }
  .slide-leave-active {
      animation: slide-out 200ms ease-out forwards;
  }
  @keyframes slide-in {
      from {
          transform: translateY(-30px);
          opacity: 0;
      }
      to {
          transform: translateY(0);
          opacity: 1;
      }
  }
  @keyframes slide-out {
      from {
          transform: translateY(0px);
          opacity: 1;
      }
      to {
          transform: translateY(-30px);
          opacity: 0;
      }
  }
</style>
