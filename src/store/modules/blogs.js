
const state = {
    blogs: [],
    encryptTxt: "secret",
    maxBlogs: 10
};

const mutations = {
    'SET_BLOGS': (state, blogs) => {
        state.blogs = blogs;
    },
    'ADD_NEW_BLOG': (state, blog) => {
        state.blogs.unshift(blog);
    },
    'UPDATE_BLOG': (state, data) => {
        let idx = data.id;
        let blog = data.blog;
        state.blogs.splice(idx, 1);
        state.blogs.unshift(blog);
    },
    'DELETE_BLOG': (state, idx) => {
        state.blogs.splice(idx, 1);
    }
};

const actions = {
    initBlogs: ({ commit }, blogs) => {
        commit('SET_BLOGS', blogs);
    },
    addBlog: ({ commit }, blog) => {
        commit('ADD_NEW_BLOG', blog);
    },
    updateBlog: ({ commit }, data) => {
        commit('UPDATE_BLOG', data);
    },
    deleteBlog: ({ commit }, idx) => {
        commit('DELETE_BLOG', idx);
    }
};

const getters = {
    blogs: state => {
        return state.blogs;
    },
    encryptTxt: state => {
        return state.encryptTxt;
    },
    maxBlogs: state => {
        return state.maxBlogs;
    }
};

export default {
    state, 
    mutations,
    getters,
    actions,
}