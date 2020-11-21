<template>
  <div id="app">
    <div class="uk-container uk-container-small uk-padding uk-padding-remove-horizontal">
      <h1 class="uk-heading-small uk-text-center">User list</h1>
      <div class="uk-text-center" v-if="loading">
        <div uk-spinner="ratio: 2"></div>
      </div>
      <div v-else>
        <UserList :users="users" />
      </div>
      <h2
          class="uk-margin-large-top uk-margin-large-bottom"
          v-if="users.length === 0"
      >User list is empty...</h2>
      <AddButton @handler="openModal" />
      <Modal />
    </div>
  </div>
</template>
<script>
  // @ is an alias to /src
  import UserList from './components/UsersList/UserList';
  import AddButton from './components/Button/AddButton';
  import Modal from './components/Modal/Modal';
  
  import { mapActions, mapState, mapGetters } from  'vuex';
  import UIkit from 'uikit';
  
  export default {
    name: 'Home',
    components: {
      UserList, AddButton, Modal
    },
    data: () => ({
      show: false,
      user: null
    }),
    computed: {
      ...mapState({
        users: state => state.users.users,
        loading: state => state.users.loading,
        editLoading: state => state.users.editLoading,
        currentUser: state => state.users.currentUser
      })
    },
    mounted() {
      this.loadData()
    },
    methods: {
      ...mapActions({
        loadData: 'users/GET_USERS',
        getCurrentUser: 'users/GET_CURRENT_USER',
      }),
      openModal() {
        this.getCurrentUser({
          user: this.user,
          isAdd: true
        });
        UIkit.modal('#modal-sections').show();
      }
    },
    watch: {
      editLoading: {
        deep: true,
        handler(value) {
          if (!value) {
            this.loadData()
          }
        }
      }
    },
  }
</script>
<style>

</style>
