import Vue from "vue";
import Vuex from "vuex";
import post from './post.module';
import highlight from './highlight.module'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: []
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    }
  },
  actions: {
    getPosts({ commit }) {
      commit(
        'setPosts',
        localStorage.getItem('posts') 
          ? JSON.parse(localStorage.getItem('posts'))
          : []
      )
    }
  },
  modules: {
    post,
    highlight
  }
});
