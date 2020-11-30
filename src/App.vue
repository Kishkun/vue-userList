<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
  import {mapActions, mapState} from 'vuex'

  export default {
    name: 'App',
    data: () => ({
      show: false,
      user: null
    }),
    computed: {
    
    },
    mounted() {

    },
    methods: {
   
    },
    watch: {
   
    },
  }
</script>
<style>
</style>
