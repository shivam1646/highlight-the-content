<template>
  <div class="preview-wrapper">
    <div class="preview-content__wrapper">
      <span>
        <strong>
          {{ post.author.username }}
        </strong>
        in
        <strong>
          Frontend
        </strong>
      </span>
      <router-link class="" :to="{ path: `view-post/${post.id}` }">
        <span
          class="preview-title"
          v-text="post.title"
        />
        <div
          id="content"
          class="preview-content"
          v-html="content"
        />
      </router-link>
      <div class="preview-meta">
        <div class="preview-tags">
          <span v-text="'Sept 10'" />
          <span v-text="'·'" class="seperator" />
          <span v-text="'5 min read'" />
          <span v-text="'·'" class="seperator" />
          <span v-text="'Frontend'" class="chip" />
        </div>
        <div class="preview-actions">
          <router-link :to="{ path: `post/${post.id}` }">
            <font-awesome-icon
              :icon="['fas', 'edit']"
              size="lg"
            />
          </router-link>
          <font-awesome-icon
            @click="onDelete"
            :icon="['far', 'trash-alt']"
            size="lg"
          />
        </div>
      </div>
      
    </div>
    <div>
      <img src="@/assets/default_preview.png" width="200" height="134" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import rangy from 'rangy/lib/rangy-serializer';
import * as domUtils from '../utils/dom-utils';

export default {
  name: 'preview',

  props: {
    post: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({
    domUtils: domUtils,
    mounted: false,
  }),

  mounted() {
    this.mounted = true
  },

  computed: {
    ...mapState('highlight', ['selectedHighlight']),
  
    content() {
      if (this.selectedHighlight && this.mounted) {
        const range = rangy.deserializeRange(
          this.selectedHighlight.range,
          document.getElementById('content')
        );
        this.domUtils.createHighlight(range);
      }
      return this.post.content;
    }
  },

  methods: {
    ...mapActions('post', ['delete']),

    onDelete() {
      try {
        this.delete(this.post.id);
      } catch (err) {
        console.log('An error occured while deleting post. Please try again.')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.preview-wrapper {
  display: flex;
  margin-bottom: 3rem;
}

.preview-content__wrapper {
  display: flex;
  flex-grow: 2;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 1rem;
  @include media_mobile {
    flex: 0 1 0;
  }
}

.preview-title {
  font-weight: bolder;
  font-size: 1.375rem;
  padding-top: 0.3rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  color: black;
}

.preview-content, .preview-meta {
  color: rgba(117, 117, 117, 1);
}

.preview-content {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  @include media_mobile {
    display: none;
  }
  
}

.preview-meta {
  display: flex;
  align-items: center;
  font-size: 0.8125rem;
  justify-content: space-between;
  @include media_mobile {
    flex-wrap: wrap;
  }
}

.preview-tags {
  display: flex;
  align-items: center;
  @include media_mobile {
    display: none;
  }
}

.preview-tags .seperator {
  padding-right: 6px;
  padding-left: 6px;
}

.chip {
  border-radius: 100px;
  background-color: rgba(242, 242, 242, 1);
  padding: 2px 8px;
}
</style>
