<template>
  <div class="full-post__wrapper">
    <h1 v-text="title" />
    <div class="full-post__meta">
      <span v-text="'Sept 10'" />
      <span v-text="'·'" class="seperator" />
      <span v-text="'5 min read'" />
      <span v-text="'·'" class="seperator" />
      <span v-text="'Frontend'" class="chip" />
    </div>
    <div
      id="content"
      v-html="content"
      class="full-post__content"
      @mouseup="onTextSelect"
      @mousedown="domUtils.removeHighlightMenu"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import * as domUtils from '../utils/dom-utils';
import rangy from 'rangy/lib/rangy-serializer';

export default {
  name: 'view-post',

  beforeRouteLeave(to, from, next) {
    this.setTitle('');
    this.setContent('');
    next();
  },

  data: () => ({
    domUtils: domUtils
  }),

  created() {
    this.getPostById(this.$route.params.id);
  },

  mounted() {
    this.restoreHighlights();
  },

  computed: {
    ...mapState('post', ['title', 'content']),
    ...mapState('highlight', ['highlights'])
  },

  methods: {
    ...mapActions('post', ['getPostById']),
    ...mapActions('highlight', ['updateHighlights']),

    ...mapMutations('post', ['setTitle', 'setContent']),


    onTextSelect() {
      const selection = window.getSelection();

      // proceed if user has selected text
      if (selection
        && selection.toString()
        && selection.toString().match(/^[0-9a-zA-Z]+$/)) {
        this.showHighlightMenu(selection);
      }
    },

    showHighlightMenu(selection) {
      const range = selection.getRangeAt(0);
      // check if start and end pointer are same
      if (range.collapsed) {
        return;
      }
      // create highlight menu
      const highlightMenu = this.domUtils.createHighlightMenu(range);
      // create highlight icon
      this.domUtils.createHighlightIcon(highlightMenu, range, this.highlight);
      // create down carot
      this.domUtils.createDownCarot(highlightMenu);
    },

    highlight(e, range) {
      const serializedRange = rangy.serializeRange(
        range,
        true,
        document.getElementById('content')
      );
      const highlightedTexts = this.domUtils.createHighlight(range);
      if (highlightedTexts && highlightedTexts.length) {
        highlightedTexts.forEach(t => {
          this.updateHighlights({
            id: this.$route.params.id,
            text: t,
            range: serializedRange
          });
        });
      }
      this.domUtils.removeHighlightMenu();
    },

    restoreHighlights() {
      const highlight = this.highlights.find(highlight => highlight.id === this.$route.params.id);
      if (highlight) {
        this.domUtils.createHighlight(
          rangy.deserializeRange(highlight.range, document.getElementById('content'))
        );
      };
    }
  }
}
</script>

<style lang="scss" scoped>
.full-post__wrapper {
  display: flex;
  flex-direction: column;
  max-width: 60vw;
  padding: 4rem 0;
  margin:auto;
  @include media_mobile {
    max-width: 100vw;
  }
}

.full-post__meta {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.full-post__meta .seperator {
  padding-right: 6px;
  padding-left: 6px;
}

.full-post__content {
  line-height: 2rem;
  font-size: 1.3125rem;
}
</style>
