<template>
    <button
        uk-tooltip="add user"
        class="uk-button uk-button-default"
        @click="open"
    >ADD</button>
</template>
<script>
  export default {
    name: 'AddButton',
    methods: {
      open() {
        this.$emit('handler')
      }
    }
  }
</script>
<style scoped lang="scss">

</style>
