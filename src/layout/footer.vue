<template>
  <div class="footer-wrapper">
    <span class="footer-title" v-text="`SenseHawk © ${year}`" />
    <span class="footer-subtitle" v-text="`A place to share your ideas`" />
  </div>
</template>

<script>
export default {
  name: 'app-footer',

  data: () => ({
    year: new Date().getFullYear(),
  })
}
</script>

<style lang="scss" scoped>
.footer-wrapper{
  padding: 1.5rem;
  margin-top: auto;
  color: white;
  background-color: rgba(25, 25, 25, 1);
}

.footer-title {
  font-weight: bolder;
  font-size: $primary-font-size;
  margin: 0 0.5rem 0 0.5rem;
}

.footer-subtitle {
  font-size: 0.8rem;
  color: rgb(187, 187, 187);
}
</style>
