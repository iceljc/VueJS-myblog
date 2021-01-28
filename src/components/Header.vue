<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <router-link to="/" class="navbar-brand"><span id="band">MyBlog</span></router-link>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <router-link to='/blogs' activeClass="active" tag="li" exact><a id="head-btn">Blogs</a></router-link>
                    <router-link to="/new-blog" activeClass="active" tag="li" exact><a id="head-btn">New Blog</a></router-link>
                </ul>
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
</template>

<script>
export default {
    
}
</script>

<style scoped> 
    #band {
        font-family: 'Georgia', serif;
        font-size: 25px;
    }
    #head-btn {
        font-family: 'Georgia', serif;
        font-size: 20px;
    }
</style>