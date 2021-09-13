<template>
  <div class="home">
    <Feed />
    <Tags />
  </div>
</template>

<script>
import Feed from '@/components/feed.vue';
import Tags from '@/components/tags.vue';

export default {
  name: 'home',

  components: {
    Feed,
    Tags
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  display: flex;
  @include media_mobile {
    flex-direction: column;
  }
}
</style>
