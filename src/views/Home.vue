<template>
    <div class="uk-container uk-container-small uk-padding uk-padding-remove-horizontal">
        <h1 class="uk-heading-small uk-text-center">User list</h1>
        <div class="uk-text-center" v-if="loading">
            <div uk-spinner="ratio: 2"></div>
        </div>
        <div v-else>
            <h3 style="color: green">{{userEmail}}</h3>
            <UserList :users="users"/>
        </div>
        <h2
            class="uk-margin-large-top uk-margin-large-bottom"
            v-if="!loading && users.length === 0"
        ><span style="color: green">{{userEmail}}</span> list is empty! Add to list...</h2>
        <AddButton @handler="openModal"/>
        <LogOutButton class="uk-margin-small-left" @logOutHandler="logOutHandler"/>
        <Modal/>
    </div>
</template>
<script>
  // @ is an alias to /src

  import UserList from '../components/UsersList/UserList'
  import AddButton from '../components/Button/AddButton'
  import LogOutButton from '../components/Button/LogOutButton';
  import Modal from '../components/Modal/Modal'

  import {mapActions, mapState, mapGetters} from 'vuex'
  import UIkit from 'uikit'

  export default {
    name: 'Home',
    components: {UserList, AddButton, Modal, LogOutButton},
    data: () => ({
      show: false,
      user: null
    }),
    computed: {
      ...mapState({
        users: state => state.users.users,
        userEmail: state => state.users.userEmail,
        loading: state => state.users.loading,
        editLoading: state => state.users.editLoading,
        currentUser: state => state.users.currentUser
      })
    },
    async mounted() {
      if (!Object.keys(this.users).length) {
        await this.loadData()
      }
    },
    methods: {
      ...mapActions({
        loadData: 'users/GET_USERS',
        getCurrentUser: 'users/GET_CURRENT_USER',
        logOut: 'auth/LOGOUT',
      }),
      openModal() {
        this.getCurrentUser({
          user: this.user,
          isAdd: true
        });
        UIkit.modal('#modal-sections').show();
      },
      async logOutHandler() {
        await this.logOut()
        await this.$router.push('/');
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
