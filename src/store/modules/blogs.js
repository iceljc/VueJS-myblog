
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
        const tmp_blogs = state.blogs.slice();
        tmp_blogs.unshift(blog);
        state.blogs = tmp_blogs;
    },
    'UPDATE_BLOG': (state, data) => {
        const idx = data.id;
        const new_blog = data.blog;
        const tmp_blogs = state.blogs.slice();
        tmp_blogs.splice(idx, 1);
        tmp_blogs.unshift(new_blog);
        state.blogs = tmp_blogs;
    },
    'DELETE_BLOG': (state, idx) => {
        const tmp_blogs = state.blogs.slice();
        tmp_blogs.splice(idx, 1);
        state.blogs = tmp_blogs;
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