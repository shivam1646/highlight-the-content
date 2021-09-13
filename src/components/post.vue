<template>
  <div class="post-content__wrapper">
    <form @submit.prevent="onSubmit">
      <input
        type="text"
        placeholder="Title"
        v-model="title"
      />
      <textarea
        placeholder="Content"
        v-model="content"
      />
      <div class="post-actions">
        <button
          class="action-button"
          type="submit"
          :disabled="!title || !content"
        >
          Publish
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'post',

  beforeRouteLeave(to, from, next) {
    this.setTitle('');
    this.setContent('');
    next();
  },

  computed: {
    ...mapFields('post', [
      'title',
      'content'
    ])
  },

  created() {
    const id = this.$route.params.id;
    if (id !== 'add') {
      this.getPostById(id);
    }
  },

  methods: {
    ...mapActions('post', ['publish', 'getPostById', 'edit']),

    ...mapMutations('post', ['setTitle', 'setContent']),

    onSubmit() {
      try {
        if (this.$route.params.id === 'add') {
          this.publish({
            title: this.title,
            content: this.content
          });
        } else {
          this.edit({
            id: this.$route.params.id,
            title: this.title,
            content: this.content
          });
        }
        this.$router.push({ path: '/' });
      } catch (err) {
        console.log('An error occured. Please try again.')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.post-content__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  margin: auto;
  width: 50vw;
  @include media_mobile {
    width: 100vw;
  }
}

.post-actions {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
</style>
