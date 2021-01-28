<template>
  <div id="home">
      <h1 id="head">Welcome to MyBlog App</h1>
      <h5 id="intstruct">You may post, edit & delete your blogs.</h5>
      <h5 id="intstruct">The maximum number of blogs is <strong>{{ maxCount }}</strong>.</h5>
      <br>
      <button class="btn btn-primary" @click.prevent="navigate">Go to Blogs >></button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      maxCount: this.$store.getters.maxBlogs
    };
  },
  methods: {
    navigate: function() {
      this.$router.push({name: 'blogs'});
    }
  }
}
</script>

<style scoped>
  #head {
    font-family: 'Optima', sans-serif;
  }
  #intstruct {
    font-family: 'Georgia', serif
  }
  #home {
    padding-left: 15px;
  }
</style>>