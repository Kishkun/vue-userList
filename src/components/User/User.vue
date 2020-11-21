<template>
    <div>
        <div class="uk-flex uk-flex-middle uk-flex-between uk-card uk-card-default uk-card-body uk-padding-small uk-margin-medium-bottom">
            <div class="uk-column-1">
                <span class="uk-text-large">{{ user.name }}</span>
            </div>
            <div class="uk-column-1">
                <DeleteButton @handler="handlerDelete(user.id)" />
                <EditButton @handler="openModal(user)" />
            </div>
        </div>
    </div>
</template>
<script>
  import DeleteButton from '../Button/DeleteButton';
  import EditButton from '../Button/EditButton';
  import {mapActions} from 'vuex';
  import UIkit from 'uikit';

  export default {
    name: 'User',
    components: {
      DeleteButton, EditButton
    },
    data: () => ({
      show: false
    }),
    props: {
      user: {
        type: Object,
        default: () => ({})
      }
    },
    methods: {
      ...mapActions({
        handlerDelete: 'users/DELETE_USER',
        getCurrentUser: 'users/GET_CURRENT_USER',
      }),
      openModal(user) {
        this.getCurrentUser({
          user,
          isAdd: false
        });
        UIkit.modal('#modal-sections').show();
      }
    }
  }
</script>
<style scoped lang="scss">
</style>
