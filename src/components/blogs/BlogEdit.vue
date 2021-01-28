<template>
    <div class="row">
        <form> 
            <h1 id="edit-blog">Edit blog</h1>
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
                <img :src="imgUrl" id="blog-img" @error="$event.target.src='https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'">
            </div>
            <div class="col-sm-8 col-sm-offset-2 col-xs-12 col-md-6 col-md-offset-3 form-group">
                <label id="content">Content</label>
                <textarea class="form-control" rows="10" v-model="content"></textarea>
                <p v-if="content.trim().length == 0" id="warn">* Required</p>
                <p v-if="content.trim().length > contentLimit" id="warn">* Title length cannot exceed {{ contentLimit }} characters</p>
            </div>
            <div id="btns" class="col-sm-8 col-sm-offset-2 col-xs-12 col-md-6 col-md-offset-3 form-group">
               <button class="btn btn-primary" id="post-btn" @click.prevent="submit">Finish</button>
               <button class="btn btn-warning" @click.prevent="backToBlogs">Back</button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
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
            updateBlog: 'updateBlog'
        }),
        submit: function() {
            if (this.title.trim().length == 0 || this.imgUrl.trim().length == 0 || this.content.trim().length == 0) {
                return alert("Please fill out 'title', 'image url' or 'content'.");
            }
            if (this.title.trim().length > this.titleLimit) {
                return alert("Your blog title is too long.");
            }
            if (this.content.trim().length > this.contentLimit) {
                return alert("Your blog content is too long.");
            }

            const encryptStr = this.$store.getters.encryptTxt;
            let idx = this.$CryptoJS.AES.decrypt(this.$route.params.id, encryptStr).toString(this.$CryptoJS.enc.Utf8);
            let data = {
                id: idx, 
                blog: {
                    title: this.title,
                    imgUrl: this.imgUrl.trim(),
                    content: this.content
                }
            };
            this.updateBlog(data);
            let newId = this.$CryptoJS.AES.encrypt("0", this.$store.getters.encryptTxt).toString();
            this.$router.push({name: 'blogDetail', params: {id: newId}});
        },
        backToBlogs: function() {
            this.$router.push({name: 'blogs'});
        }
    },
    created() {
        let myblogs = this.$store.getters.blogs;
        const encryptStr = this.$store.getters.encryptTxt;
        let idx = this.$CryptoJS.AES.decrypt(this.$route.params.id, encryptStr).toString(this.$CryptoJS.enc.Utf8);
        let parsedId = parseInt(idx);
        
        if (isNaN(parsedId) || parsedId >= myblogs.length) {
            this.$router.push({name: 'home'});
        } else {
            this.title = myblogs[parsedId].title;
            this.imgUrl = myblogs[parsedId].imgUrl;
            this.content = myblogs[parsedId].content;
        }
    }
}
</script>

<style scoped>
    #edit-blog, #btns {
        text-align: center;
    }
    #edit-blog {
        font-family: 'Apple Chancery', cursive;
    }
    #title, #content {
        font-size: 20px;
        font-family: 'American Typewriter', serif;
    }
    #warn {
        color: red;
    }
    #blog-img {
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