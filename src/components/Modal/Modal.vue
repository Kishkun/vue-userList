<template>
    <div id="modal-sections" bg-close="false" uk-modal>
        <div class="uk-modal-dialog">
            <div class="uk-modal-header">
                <h2 class="uk-modal-title">User form</h2>
            </div>
            <div class="uk-modal-body">
                <form ref="form" @submit.prevent="handleSubmit" class="uk-form">
                    <label class="uk-form-label" for="name">Name</label>
                    <div class="uk-form-controls uk-margin-small-bottom">
                        <input
                            class="uk-input"
                            id="name"
                            name="name"
                            ref="name"
                            type="text"
                            v-model.trim="formData.name"
                            :class="{'uk-form-success' : formData.name}"
                        />
                    </div>
                    <label class="uk-form-label" for="number">Number</label>
                    <div class="uk-form-controls uk-margin-small-bottom">
                        <input
                            class="uk-input"
                            id="number"
                            name="number"
                            ref="number"
                            type="number"
                            v-model.number.trim="formData.number"
                            :class="{'uk-form-success' : formData.number}"
                        />
                    </div>
                    <label class="uk-form-label" for="email">Email</label>
                    <div class="uk-form-controls uk-margin-small-bottom">
                        <input
                            class="uk-input"
                            id="email"
                            name="email"
                            ref="email"
                            type="text"
                            v-model.trim="formData.email"
                            :class="{'uk-form-success' : formData.email}"
                        />
                    </div>
                    <label class="uk-form-label" for="country">Country</label>
                    <div class="uk-form-controls uk-margin-small-bottom">
                        <input
                            class="uk-input"
                            id="country"
                            name="country"
                            ref="country"
                            type="text"
                            v-model.trim="formData.address.country"
                            :class="{'uk-form-success' : formData.address.country}"
                        />
                    </div>
                    <label class="uk-form-label" for="city">City</label>
                    <div class="uk-form-controls uk-margin-small-bottom">
                        <input
                            class="uk-input"
                            id="city"
                            name="city"
                            ref="city"
                            type="text"
                            v-model.trim="formData.address.city"
                            :class="{'uk-form-success' : formData.address.city}"
                        />
                    </div>
                    <label class="uk-form-label" for="street">Street</label>
                    <div class="uk-form-controls uk-margin-small-bottom">
                        <input
                            class="uk-input"
                            id="street"
                            name="street"
                            ref="street"
                            type="text"
                            v-model.trim="formData.address.street"
                            :class="{'uk-form-success' : formData.address.street}"
                        />
                    </div>
                    <label class="uk-form-label" for="apartment">Apartment</label>
                    <div class="uk-form-controls uk-margin-medium-bottom">
                        <input
                            class="uk-input"
                            id="apartment"
                            name="apartment"
                            ref="apartment"
                            type="number"
                            v-model.number.trim="formData.address.apartment"
                            :class="{'uk-form-success' : formData.address.apartment}"
                        />
                    </div>
                    
                    <div class="uk-form-controls uk-text-right">
                        <button class="uk-button uk-button-default uk-margin-small-right uk-modal-close" @click="closeModal" type="button">
                            Cancel
                        </button>
                        <button class="uk-button uk-button-primary" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
  import UIkit  from 'uikit'
  import {mapActions, mapState} from 'vuex';
  
  export default {
    name: 'Modal',
    data: () => ({
      valid: false,
      formData: {
        name: '',
        number: '',
        email: '',
        address: {
          country: '',
          city: '',
          street: '',
          apartment: '',
        }
      }
    }),
    computed: {
      ...mapState({
        currentUser: state => state.users.currentUser,
        isAdd: state => state.users.isAdd
      }),
    },
    mounted() {
    
    },
    methods: {
      ...mapActions({
        handlerEdit: 'users/EDIT_USER',
        handlerAdd: 'users/ADD_USER',
        getCurrentUser: 'users/GET_CURRENT_USER',
      }),
      closeModal() {
        if (this.currentUser) {
          this.getCurrentUser({
            user: null,
            isAdd: false
          });
        }
        this.resetForm();
      },
      handleSubmit() {
        this.validForm();
        if (
            this.$refs.name.value &&
            this.$refs.number.value &&
            this.$refs.email.value &&
            this.$refs.country.value &&
            this.$refs.city.value &&
            this.$refs.street.value &&
            this.$refs.apartment.value
        ) {
          if (this.isAdd) {
            this.formData = {
              ...this.formData,
              id: this.randomInteger(10, 10000)
            };
            this.handlerAdd(this.formData)
          } else {
            this.handlerEdit(this.formData);
          }
          UIkit.modal('#modal-sections').hide();
          this.resetForm();
        }
      },
      validForm() {
        if (
            !this.formData.name.value &&
            !this.formData.number.value &&
            !this.formData.email.value &&
            !this.formData.address.country.value &&
            !this.formData.address.city.value &&
            !this.formData.address.street.value &&
            !this.formData.address.apartment.value
        ) {
          this.$refs.name.classList.add('uk-form-danger')
          this.$refs.number.classList.add('uk-form-danger')
          this.$refs.email.classList.add('uk-form-danger')
          this.$refs.country.classList.add('uk-form-danger')
          this.$refs.city.classList.add('uk-form-danger')
          this.$refs.street.classList.add('uk-form-danger')
          this.$refs.apartment.classList.add('uk-form-danger')
        }
      },
      resetForm() {
        this.formData = {
          id: null,
          name: '',
          number: '',
          email: '',
          address: {
            country: '',
            city: '',
            street: '',
            apartment: '',
          }
        };
        this.$refs.name.classList.remove('uk-form-danger')
        this.$refs.number.classList.remove('uk-form-danger')
        this.$refs.email.classList.remove('uk-form-danger')
        this.$refs.country.classList.remove('uk-form-danger')
        this.$refs.city.classList.remove('uk-form-danger')
        this.$refs.street.classList.remove('uk-form-danger')
        this.$refs.apartment.classList.remove('uk-form-danger')
      },
      loadCurrentUser() {
        if (this.currentUser) {
          this.formData = {
            id: this.currentUser.id,
            name: this.currentUser.name,
            number: this.currentUser.number,
            email: this.currentUser.email,
            address: {
              country: this.currentUser.address.country,
              city: this.currentUser.address.city,
              street: this.currentUser.address.street,
              apartment: this.currentUser.address.apartment,
            }
          }
        }
      },
      randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    },
    watch: {
      currentUser: {
        deep: true,
        handler(value) {
          if (value) {
            this.loadCurrentUser()
          }
        }
      }
    }
  }
</script>
<style scoped lang="scss">
</style>
