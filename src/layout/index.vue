<template>
  <div id="app">
    <Header />
    <div class="router-view__wrapper">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from './header.vue';
import Footer from './footer.vue'

export default {
  name: 'layout',

  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss">
// insert styles here
</style>