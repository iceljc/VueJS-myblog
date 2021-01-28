<template>
    <div class="row">
            <div class="col-sm-12">
                <h3 id="progres-bar-head">Current Blogs / Maximum Blogs</h3>
                <div class="progress">
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                            :style="{width: (blogCount / maxCount) * 100 + '%'}">
                            {{ blogCount }} / {{ maxCount}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    computed: {
        blogCount() {
            return this.$store.getters.blogs.length;
        },
        maxCount() {
            return this.$store.getters.maxBlogs;
        }
    }
}
</script>

<style scoped>
    #progres-bar-head {
        font-family: 'Georgia', serif;
    }
</style>