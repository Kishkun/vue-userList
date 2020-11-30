<template>
    <button
        uk-tooltip="logout"
        class="uk-button uk-button-default"
        @click="logout"
    >Logout</button>
</template>
<script>
  export default {
    name: 'LogOutButton',
    methods: {
      async logout() {
        await this.$emit('logOutHandler')
      }
    }
  }
</script>
<style scoped lang="scss">

</style>
