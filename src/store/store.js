import Vue from 'vue';
import Vuex from 'vuex';

import blogs from './modules/blogs';
import * as actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
    actions: actions,
    modules: {
        blogs: blogs
    }
});