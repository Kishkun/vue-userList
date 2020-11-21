<template>
    <div class="user-wrapper">
        <div class="uk-flex-column uk-padding uk-padding-remove-horizontal" v-if="users.length">
            <User
                v-for="user in users"
                :key="user.id"
                :user="user"
            />
        </div>
    </div>
</template>
<script>
  import User from '../User/User';

  export default {
    name: 'UserList',
    components: {
      User
    },
    props: {
      users: {
        type: Array
      }
    }
  }
</script>
<style scoped>
</style>
