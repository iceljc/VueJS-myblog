<template>
    <div>
        <app-progress-bar></app-progress-bar>
        <div class="row">
            <h1 id="new-blog">New blog</h1>
            <br>
            <form>
                <div class="col-sm-8 col-sm-offset-2 col-xs-12 col-md-6 col-md-offset-3 form-group">
                    <label id="title">Title</label>
                    <input class="form-control" v-model="title">
                    <p v-if="title.trim().length == 0" id="warn">* Required</p>
                    <p v-if="title.trim().length > titleLimit" id="warn">* Title length cannot exceed {{ titleLimit }} characters</p>
                </div>
                <div class="col-sm-8 col-sm-offset-2 col-xs-12 col-md-6 col-md-offset-3 form-group">
                    <label id="title">Image Url</label>
                    <input class="form-control" v-model="imgUrl" placeholder="e.g., https://unsplash.com/">
                    <p v-if="imgUrl.trim().length == 0" id="warn">* Required</p>
                    <br>
                    <img :src="imgUrl" id="new-blog-img" @error="$event.target.src='https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'">
                </div>
                <div class="col-sm-8 col-sm-offset-2 col-xs-12 col-md-6 col-md-offset-3 form-group">
                    <label id="content">Content</label>
                    <textarea class="form-control" rows="10" v-model="content"></textarea>
                    <p v-if="content.trim().length == 0" id="warn">* Required</p>
                    <p v-if="content.trim().length > contentLimit" id="warn">* Title length cannot exceed {{ contentLimit }} characters</p>
                </div>
                <div id="btns" class="col-sm-8 col-sm-offset-2 col-xs-12 col-md-6 col-md-offset-3 form-group">
                    <button 
                        class="btn btn-primary" 
                        id="post-btn" 
                        @click.prevent="createNew">Post</button>
                    <button class="btn btn-warning" @click.prevent="backToBlogs">Back</button>
                </div>
            </form>
        </div>
    </div>
    
</template>

<script>
import { mapActions } from 'vuex';
import ProgressBar from './ProgressBar.vue';

export default {
    components: {
        'app-progress-bar': ProgressBar
    },
    data() {
        return {
            title: '',
            imgUrl: '',
            content: '',
            titleLimit: 100,
            contentLimit: 2000
        };
    },
    methods: {
        ...mapActions({
            addBlog: 'addBlog'
        }),
        createNew: function() {
            let blogCount = this.$store.getters.blogs.length;
            const maxCount = this.$store.getters.maxBlogs;
            if (blogCount == maxCount) {
                return alert("Please delete one blog before creating a new one.");
            }

            if (this.title.trim().length == 0 || this.imgUrl.trim().length == 0 || this.content.trim().length == 0) {
                return alert("Please fill out 'title', 'image url' or 'content'.");
            }
            if (this.title.trim().length > this.titleLimit) {
                return alert("Your blog title is too long.");
            }
            if (this.content.trim().length > this.contentLimit) {
                return alert("Your blog content is too long.");
            }

            // http post
            // this.$http.post('data.json', this.blog)
            //     .then(response => {
            //         console.log("Done!");
            //     }, error => {
            //         console.log(error);
            //         alert("Something went wrong !");
            //     });

            let blog = {
                title: this.title,
                imgUrl: this.imgUrl.trim(),
                content: this.content
            };
            this.addBlog(blog);
            this.title = '';
            this.content = '';
            this.$router.replace({name: 'blogs'});
        },
        backToBlogs: function() {
            this.$router.push({name: 'blogs'});
        }
    }
}
</script>

<style scoped>
    #new-blog, #btns {
        text-align: center;
    }
    #new-blog {
        font-family: 'Apple Chancery', cursive;
    }
    #title, #content {
        font-size: 20px;
        font-family: 'American Typewriter', serif;
    }
    #warn {
        color: red;
    }
    #new-blog-img {
        width: 100%;
        height: 100%;
    }
    .btn {
        font-size: 20px;
        font-family: 'American Typewriter', serif;
        border: none;
        outline:none;
        width: 100px;
    }
</style>