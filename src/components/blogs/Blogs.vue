<template>
    <div class="row equal">
        <app-blog v-for="(blog, index) in myblogs" :key="index" :blog="blog" :index="index"></app-blog>
    </div>
</template>

<script>
import Blog from './Blog.vue';

export default {
    components: {
        "app-blog": Blog
    },
    computed: {
        myblogs() {
            return this.$store.getters.blogs;
        }
    },
}
</script>

<style scoped>
    .row.equal {
        display: flex;
        /* display: -webkit-flex; */
        flex-wrap: wrap;
        height: 100%;
    }
</style>