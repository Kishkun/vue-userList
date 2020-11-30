<template>
    <transition name="slide-fade">
        <div class="uk-flex uk-flex-middle uk-flex-between uk-card uk-card-default uk-card-body uk-padding-small uk-margin-medium-bottom">
            <div class="uk-column-1">
                <span class="uk-text-large">{{ user.name }}</span>
            </div>
            <div class="uk-column-1">
                <DeleteButton @handler="handlerDelete(user.id)" />
                <EditButton @handler="openModal(user)" />
            </div>
        </div>
    </transition>
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
<style scoped>
    /* Enter and leave animations can use different */
    /* durations and timing functions.              */
    .slide-fade-enter-active {
        transition: all .2s ease;
    }
    .slide-fade-leave-active {
        transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }
</style>
