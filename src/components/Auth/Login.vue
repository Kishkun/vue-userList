<template>
  <div class="uk-container uk-container-xsmall uk-padding uk-padding-remove-horizontal">
    <div class="uk-child-width-1-2 uk-flex uk-flex-column uk-flex-middle">
      <h2 class="uk-text-center">Login form</h2>
      <form ref="loginForm" @submit.prevent="handleSubmit" class="uk-form uk-margin-small-top">
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
          <router-link class="uk-link-toggle" to="/register">Sign in</router-link>
          <button class="uk-button uk-button-primary" type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import {mapActions} from 'vuex';

export default {
  name: 'Login',
  components: {
  
  },
  data: () => ({
    formData: {
      email: '',
      password: '',
    }
  }),
  methods: {
    ...mapActions({
      login: 'auth/LOGIN'
    }),
    async handleSubmit() {
      this.validForm();
      
      if (
          this.$refs.email.value &&
          this.$refs.password.value
      ) {
        try {
          await this.login(this.formData)
          await this.$router.push('/home')
          this.formData.email = ''
          this.formData.password = ''
        } catch (e) {}
      }
    },
    validForm() {
      if (
          !this.formData.email.value &&
          !this.formData.password.value
      ) {
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
