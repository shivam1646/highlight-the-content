<template>
  <div class="feed-content__wrapper">
    <div class="feed-toggle">
      <button
        @click="activeTab = 0"
        :class="!activeTab ? 'active' : ''"
      >
        FOLLOWING
      </button>
      <button
        @click="activeTab = 1"
        :class="activeTab ? 'active' : ''"
      >
        POSTS
      </button>
    </div>
    <div
      v-if="!activeTab"
      class="followers"
    >
      <span
        class="followers-text"
      >
        Stories from the writers you follow will appear here
      </span>
      <button
        @click="activeTab = 1"
        class="action-button"
      >
        Browse recommended stories
      </button>
    </div>
    <div
      v-else
      class="posts"
    >
      <span v-if="!filteredPosts.length" v-text="`No posts yet.`" />
      <Preview
        v-for="post in filteredPosts"
        :post="post"
        :key="post.id"
      />
    </div>
  </div>
</template>

<script>
import Preview from './preview.vue';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'feed',

  components: {
    Preview
  },

  data: () => ({
    activeTab: 1
  }),

  computed: {
    ...mapState(['posts']),
    ...mapState('highlight', ['selectedHighlight']),

    filteredPosts() {
      if (this.selectedHighlight) {
        return this.posts.filter(post => post.id === this.selectedHighlight.id);
      }
      return this.posts;
    }
  },

  created () {
    this.getPosts();
  },

  methods: {
    ...mapActions(['getPosts']),
  }
}
</script>

<style lang="scss" scoped>
.feed-content__wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  padding: 3rem 2rem 0 3rem;
  border-right: $section-border;
  max-width: 70vw;
  @include media_mobile {
    border-right: none;
    max-width: 100vw;
  }
}

.feed-toggle {
  border-bottom: $section-border;
}

.feed-toggle button {
  border: 0;
  font-size: $primary-font-size;
  background-color: white;
  padding: 0 1rem;
}

.feed-toggle button.active {
  font-weight: bolder;
  border-bottom: 2px solid black;
}

.followers {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
}

.posts {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2rem 0;
}

.followers-text {
  margin-bottom: 1rem;
}
</style>
