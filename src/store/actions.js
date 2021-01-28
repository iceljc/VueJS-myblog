// import Vue from 'vue';
import blogs from '../data/blogs';

export const loadData = ({ commit }) => {
    commit('SET_BLOGS', blogs);
};



