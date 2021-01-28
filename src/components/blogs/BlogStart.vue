<template>
    <div>
        <app-progress-bar></app-progress-bar>
        <transition name="slide" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
    
</template>

<script>
import ProgressBar from './ProgressBar.vue';

export default {
    components: {
        'app-progress-bar': ProgressBar
    }
}
</script>

<style scoped>

</style>