import Home from './components/Home.vue';
import NewBlog from './components/blogs/NewBlog.vue';
import BlogStart from './components/blogs/BlogStart.vue';
import Blogs from './components/blogs/Blogs.vue';
import BlogDetail from './components/blogs/BlogDetail.vue';
import BlogEdit from './components/blogs/BlogEdit.vue';

export const routes = [
    {path: '', name: 'home', component: Home},
    {path: '/new-blog', name: 'newBlog', component: NewBlog},
    {path: '/blogs', name: "blogStart", component: BlogStart, children: [
        {path: '', name: "blogs", component: Blogs},
        {path: ':id', name: "blogDetail", component: BlogDetail},
        {path: ':id/edit', name: "blogEdit", component: BlogEdit},
    ]},
    {path: '*', redirect: '/'}
];
