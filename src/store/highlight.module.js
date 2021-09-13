import * as storageUtils from '../utils/storage-utils';

export const state = () => ({
  highlights: [],
  selectedHighlight: null
});

export const mutations = {
  setHighlights(state, highlights) {
    state.highlights = highlights;
  },

  setSelectedHighlight(state, selectedHighlight) {
    state.selectedHighlight = selectedHighlight;
  }
};

export const actions = {
  getHighlights({ commit }) {
    commit('setHighlights', storageUtils.getList('highlights'));
  },

  updateHighlights({ commit }, highlight) {
    commit('setHighlights', storageUtils.addToList('highlights', highlight));
  },

  removeHighlights({ commit }, id) {
    commit('setHighlights', storageUtils.removeFromList('highlights', id));
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}