<template>
  <div class="uk-container uk-container-xsmall uk-padding uk-padding-remove-horizontal">
    <div class="uk-child-width-1-2 uk-flex uk-flex-column uk-flex-middle">
      <h2 class="uk-text-center">Register form</h2>
      <form ref="loginForm" @submit.prevent="handleSubmit" class="uk-form uk-margin-small-top">
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
        <label class="uk-form-label" for="password">Password</label>
        <div class="uk-form-controls uk-margin-small-bottom">
          <input
              class="uk-input"
              id="password"
              name="password"
              ref="password"
              type="password"
              v-model.trim="formData.password"
              :class="{'uk-form-success' : formData.password}"
          />
        </div>
        <div class="uk-form-controls uk-flex uk-flex-between uk-flex-middle uk-margin-medium-top">
          <router-link class="uk-link-toggle" to="/">Log in</router-link>
          <button class="uk-button uk-button-primary" type="submit">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import {mapActions} from 'vuex';

export default {
  name: 'Register',
  components: {
  
  },
  data: () => ({
    formData: {
      name: '',
      email: '',
      password: '',
    }
  }),
  methods: {
    ...mapActions({
      register: 'auth/REGISTER'
    }),
    async handleSubmit() {
      this.validForm();
      
      if (
          this.$refs.name.value &&
          this.$refs.email.value &&
          this.$refs.password.value
      ) {
        this.formData = {
          ...this.formData,
          id: this.randomInteger(10, 10000)
        };
        try {
          await this.register(this.formData);
          await this.$router.push('/home');
          this.formData.email = ''
          this.formData.name = ''
          this.formData.password = ''
        } catch (e) {}
      }
    },
    validForm() {
      if (
          !this.formData.name.value &&
          !this.formData.email.value &&
          !this.formData.password.value
      ) {
        this.$refs.name.classList.add('uk-form-danger');
        this.$refs.email.classList.add('uk-form-danger');
        this.$refs.password.classList.add('uk-form-danger');
      }
    },
    randomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  },
}
</script>
