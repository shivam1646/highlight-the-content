import { getField, updateField } from 'vuex-map-fields';
import { v4 as uuid } from 'uuid';

import * as storageUtils from '../utils/storage-utils';

const AUTHOR = {
  username: 'bob12',
  email: 'bob@bob.com'
};

export const state = () => ({
  content: '',
  title: ''
});

export const getters = {
  getField
};

export const mutations = {
  updateField,

  setTitle(state, title) {
    state.title = title;
  },

  setContent(state, content) {
    state.content = content;
  }
};

export const actions = {
  publish({ commit, dispatch }, post) {
    post = {
      id: uuid(),
      author: AUTHOR,
      ...post
    }
    commit('setPosts', storageUtils.addToList('posts', post), { root: true });
    dispatch('clearPostTitleAndContent');
  },

  edit({ commit, dispatch }, post) {
    const list = storageUtils.getList('posts');
    const oldPost = list.find(p => p.id === post.id);
    const oldPostIndex = list.findIndex(p => p.id === post.id);
    const updatedPost = {
      ...oldPost,
      title: post.title,
      content: post.content
    };
    commit(
      'setPosts',
      storageUtils.updateList('posts', oldPostIndex, updatedPost),
      { root: true }
    );
    dispatch('clearPostTitleAndContent');
    dispatch('highlight/removeHighlights', post.id, { root: true });
  },

  clearPostTitleAndContent({ commit }) {
    commit('setTitle', '');
    commit('setContent', '');
  },

  delete({ commit }, id) {
    commit('setPosts', storageUtils.removeFromList('posts', id), { root: true });
  },

  getPostById({ commit }, id) {
    let list = storageUtils.getList('posts');
    const post = list.find(post => post.id === id);
    if (post) {
      commit('setTitle', post.title);
      commit('setContent', post.content);
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
