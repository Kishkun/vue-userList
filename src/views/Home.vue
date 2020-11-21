<template>
  <div class="uk-container">
    <UserList />
  </div>
</template>

<script>
// @ is an alias to /src
import UserList from '../components/UsersList/UserList';

export default {
  name: 'Home',
  components: {
    UserList
  }
}
</script>
