<template>
    <button
        uk-tooltip="edit user"
        class="uk-button uk-button-primary uk-button-small"
        @click="open"
    >Edit</button>
</template>
<script>
  import UIkit from 'uikit';

  export default {
    name: 'EditButton',
    methods: {
      open() {
        this.$emit('handler');
      }
    }
  }
</script>
<style scoped lang="scss">

</style>
