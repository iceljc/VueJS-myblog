<template>
    <div class="col-sm-6 col-md-4 col-lg-4">
        <div class="thumbnail">
            <img id="blog-img" :src="blog.imgUrl" @error="$event.target.src='https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'">
            <div class="caption">
                <h3 id="title">{{ blog.title | shortTitle }}</h3>
                <p id="content">{{ blog.content | brief }}</p>
                <router-link
                    tag="button"
                    id="more-btn"
                    class="btn btn-primary"
                    style="cursor: pointer"
                    :to="link">More...</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['blog', 'index'],
    data() {
        return {
            link: {
                name: 'blogDetail', 
                params: {
                    id: this.$CryptoJS.AES.encrypt(this.index.toString(), this.$store.getters.encryptTxt).toString()
                },
            }
        };
    },
}
</script>

<style scoped>
    #title {
        font-family: 'Comic Sans MS', 'Comic Sans', cursive;
        font-size: 1.5em;
        margin-top: 3px;
    }
    #content {
        font-family: 'Georgia', serif;
        font-size: 1.2em;
        white-space: pre-line;
    }
    #more-btn {
        border: none;
        outline:none;
        width: 80px;
        font-size: 15px;
        font-family: 'American Typewriter', serif;
    }
    .thumbnail img{
        width: 100%;
        height: auto;
    }
    
    .thumbnail {
        height: 100%;
    }
</style>