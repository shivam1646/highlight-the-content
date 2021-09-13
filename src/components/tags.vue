<template>
  <div class="tags-content__wrapper">
    <div class="tags-intro">
      <span v-text="'Highlighted words will appear below. Click on a word to filter posts.'" />
    </div>
    <div class="recommendations">
      <span v-text="'Highlighted Words'" />
      <div class="tags-wrapper">
        <span
          v-for="(highlight, i) in highlights"
          :key="i"
          class="tag"
          v-text="highlight.text"
          @click="setSelectedHighlight(highlight)"
          />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';

export default {
  name: 'tags',

  computed: {
    ...mapState('highlight', ['highlights']),
  },

  created() {
    this.getHighlights();
  },

  methods: {
    ...mapActions('highlight', ['getHighlights']),
    ...mapMutations('highlight', ['setSelectedHighlight'])
  }
}
</script>

<style lang="scss" scoped>
.tags-content__wrapper {
  display: flex;
  flex-direction: column;
  max-width: 35vw;
  @include media_mobile {
    display: none;
  }
}

.tags-intro {
  padding: 3rem;
  text-align: center;
  border-bottom: $section-border;
  margin: 0 2rem;
}

.recommendations {
  display: flex;
  flex-direction: column;
  margin: 0 2rem;
  padding-top: 3rem;
}

.recommendations > :first-child {
  font-weight: bolder;
}

.tags-wrapper {
  display: flex;
  flex-wrap: wrap;
  padding-top: 2rem;
}

.tag {
  border-radius: 100px;
  background-color: rgba(242, 242, 242, 1);
  padding: 6px 12px;
  margin: 0.5rem;
  cursor: pointer;
}
</style>
