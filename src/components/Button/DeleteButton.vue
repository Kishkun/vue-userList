<template>
    <button
        uk-tooltip="delete user"
        class="uk-button uk-button-danger uk-button-small uk-margin-small-right"
        @click="deleteUser"
    >Delete</button>
</template>
<script>
  export default {
    name: 'DeleteButton',
    methods: {
      deleteUser() {
        this.$emit('handler');
      }
    }
  }
</script>
<style scoped lang="scss">

</style>
