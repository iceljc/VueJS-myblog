<template>
    <div>
        <div id="my-blog">
            <h1 id="head">My Blog</h1>
        </div>
        <br>
        <div id="title-section">
            <p id="title">{{ title }}</p>
        </div>
        <br>
        <div id="img-section">
            <img v-if="imgUrl.trim().length > 0" 
                :src="imgUrl" id="blog-img" 
                @error="$event.target.src='https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'">
        </div>
        <br>
        <div id="content-section">
            <p id="content">{{ content }}</p>
        </div>
        <br>
        <div id="btn-section">
            <router-link
                tag="button"
                class="btn btn-success"
                style="cursor: pointer"
                :to="link">Edit</router-link>
            <button class="btn btn-warning" @click.prevent="backToBlogs">Back</button>
            <button class="btn btn-danger" @click.prevent="remove">Delete</button>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            blog: {
                title: '',
                imgUrl: '',
                content: ''
            },
            link: {
                name: 'blogEdit',
                params: {
                    id: this.$route.params.id
                }
            }
        };
    },
    computed: {
        title: function() {
            return this.blog.title;
        },
        imgUrl: function() {
            return this.blog.imgUrl;
        },
        content: function() {
            return this.blog.content;
        }
    },
    methods: {
        ...mapActions({
            deleteBlog: 'deleteBlog'
        }),
        remove: function() {
            if (confirm("Do you want to delete this blog?")) {
                const encryptStr = this.$store.getters.encryptTxt;
                let idx = this.$CryptoJS.AES.decrypt(this.$route.params.id, encryptStr).toString(this.$CryptoJS.enc.Utf8);
                this.deleteBlog(parseInt(idx));
                this.$router.push({name: 'blogs'});
            }
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
            console.log("here");
            this.$router.push({name: 'home'});
        } else {
            this.blog.title = myblogs[parsedId].title;
            this.blog.imgUrl = myblogs[parsedId].imgUrl;
            this.blog.content = myblogs[parsedId].content;
        }
    }
}
</script>

<style scoped>
    #my-blog {
        font-family: 'Apple Chancery', cursive;
    }
    #my-blog, #title-section, #btn-section {
        text-align: center;
    }
    #my-blog, #title-section, #img-section, #content-section, #btn-section {
        width: 70%;
        margin: auto;
    }
    #content-section {
        white-space: pre-line;
        padding: 15px;
        background:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIj48ZGVmcz48cGF0dGVybiBpZD0icGF0dGVybiIgd2lkdGg9IjM0LjY0IiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgNjkuMjgyMDMyMzAyNzU1MSw4MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDEzNSkgIj48cmVjdCBpZD0icGF0dGVybi1iYWNrZ3JvdW5kIiB3aWR0aD0iNDAwJSIgaGVpZ2h0PSI0MDAlIiBmaWxsPSJyZ2JhKDI0NywgMjUwLCAyNTIsMSkiPjwvcmVjdD4gPHBhdGggZmlsbD0iIzFhMjAyYyIgZD0iTTg2LjYgNzAgTDY5LjI4IDgwIEw1MS45NiA3MCBMNTEuOTYgNTAgTDY5LjI4IDQwIEw4Ni42IDUwIEw4Ni42IDcwIDg2LjYgNTAgTDY5LjI4IDQwIEw1MS45NiA1MCBMNTEuOTYgNzAgTDY5LjI4IDgwIEw4Ni42IDcwIEw4Ni42IDUwIHoiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiPjwvcGF0aD48cGF0aCBmaWxsPSIjMWEyMDJjIiBkPSJNNTEuOTYgOTAgTDM0LjY0IDEwMCBMMTcuMzIgOTAgTDE3LjMyIDcwIEwzNC42NCA2MCBMNTEuOTYgNzAgTDUxLjk2IDkwIDUxLjk2IDcwIEwzNC42NCA2MCBMMTcuMzIgNzAgTDE3LjMyIDkwIEwzNC42NCAxMDAgTDUxLjk2IDkwIEw1MS45NiA3MCB6IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIj48L3BhdGg+PHBhdGggZmlsbD0iIzFhMjAyYyIgZD0iTTE3LjMyIDcwIEwwIDgwIEwtMTcuMzIgNzAgTC0xNy4zMiA1MCBMMCA0MCBMMTcuMzIgNTAgTDE3LjMyIDcwIDE3LjMyIDUwIEwwIDQwIEwtMTcuMzIgNTAgTC0xNy4zMiA3MCBMMCA4MCBMMTcuMzIgNzAgTDE3LjMyIDUwIHoiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiPjwvcGF0aD48cGF0aCBmaWxsPSIjMWEyMDJjIiBkPSJNMTcuMzIgMzAgTDAgNDAgTC0xNy4zMiAzMCBMLTE3LjMyIDEwIEwwIDAgTDE3LjMyIDEwIEwxNy4zMiAzMCAxNy4zMiAxMCBMMCAwIEwtMTcuMzIgMTAgTC0xNy4zMiAzMCBMMCA0MCBMMTcuMzIgMzAgTDE3LjMyIDEwIHoiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiPjwvcGF0aD48cGF0aCBmaWxsPSIjMWEyMDJjIiBkPSJNNTEuOTYgMTAgTDM0LjY0IDIwIEwxNy4zMiAxMCBMMTcuMzIgLTEwIEwzNC42NCAtMjAgTDUxLjk2IC0xMCBMNTEuOTYgMTAgNTEuOTYgLTEwIEwzNC42NCAtMjAgTDE3LjMyIC0xMCBMMTcuMzIgMTAgTDM0LjY0IDIwIEw1MS45NiAxMCBMNTEuOTYgLTEwIHoiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiPjwvcGF0aD48cGF0aCBmaWxsPSIjMWEyMDJjIiBkPSJNODYuNiAzMCBMNjkuMjggNDAgTDUxLjk2IDMwIEw1MS45NiAxMCBMNjkuMjggMCBMODYuNiAxMCBMODYuNiAzMCA4Ni42IDEwIEw2OS4yOCAwIEw1MS45NiAxMCBMNTEuOTYgMzAgTDY5LjI4IDQwIEw4Ni42IDMwIEw4Ni42IDEwIHoiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiPjwvcGF0aD48cGF0aCBmaWxsPSIjZWNjOTRiIiBkPSJNMzUuNTEgNDAuNSBMMzUuNTEgNDEuNSBMMzQuNjQgNDEgTDMzLjc3IDQxLjUgTDMzLjc3IDQwLjUgTDMyLjkxIDQwIEwzMy43NyAzOS41IEwzMy43NyAzOC41IEwzNC42NCAzOSBMMzUuNTEgMzguNSBMMzUuNTEgMzkuNSBMMzYuMzcgNDAgTDM1LjUxIDQwLjUgMzUuMTQgMzkuMTMgTDM0LjY0IDQyLjI3IEwzNC4xNCAzOS4xMyBMMzYuNjEgNDEuMTMgTDMzLjY0IDQwIEwzNi42MSAzOC44NyBMMzQuMTQgNDAuODcgTDM0LjY0IDM3LjczIEwzNS4xNCA0MC44NyBMMzIuNjggMzguODcgTDM1LjY0IDQwIEwzMi42OCA0MS4xMyBMMzUuMTQgMzkuMTMgeiIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciI+PC9wYXRoPjwvcGF0dGVybj4gIDwvZGVmcz4gPHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgaGVpZ2h0PSIxMDAlIiB3aWR0aD0iMTAwJSI+PC9yZWN0Pjwvc3ZnPg==");
    }
    #head {
        font-size:3em;
    }
    #title {
        font-family: 'Palatino', 'URW Palladio L', serif;
        font-size: 2.5em;
    }
    #content {
        font-family: 'Georgia', serif;
        font-size: 1.5em;
    }
    .btn {
        font-size: 20px;
        font-family: 'American Typewriter', serif;
        border: none;
        outline:none;
        width: 100px;
    }
    #blog-img {
        width: 100%;
        height: 100%;
    }
</style>