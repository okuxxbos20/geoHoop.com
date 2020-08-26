<template>
  <div class="admin">
    <header>
      <p class="geo-hoop" @click="$router.push('/')">geoHoop</p>
    </header>
    <main>
      <form @submit.prevent="submitData()">
        <p class="admin-login">管理者ログイン</p>
        <label>
          <p v-if="error.email.isError === null || error.email.isError === false" class="form-name">メールアドレス</p>
          <p v-else class="error">{{ error.email.text }}</p>
          <input @input="inputEmail($event.target.value)" type="email" />
        </label>
        <label>
          <p v-if="error.password.isError === null || error.password.isError === false" class="form-name">パスワード</p>
          <p v-else class="error">{{ error.password.text }}</p>
          <input @input="inputPass($event.target.value)" type="password" />
        </label>
        <button type="submit" :class="{ activeBtn: error.isAllClear }">ログイン</button>
      </form>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      isSubmitAble: false,
      error: {
        email: { isError: null, text: '' },
        password: { isError: null, text: '' },
        isAllClear: false
      }
    }
  },
  watch: {
    email(newVal) {
      if (newVal === null || newVal === '') {
        this.error.email.isError = true;
      } else {
        this.error.email.isError = false;
      }
    },
    password(newVal) {
      if (newVal === null || newVal === '') {
        this.error.password.isError = true;
      } else {
        this.error.password.isError = false;
      }
    },
    error: {
      deep: true,
      handler: (error) => {
        error.isAllClear = (!error.email.isError && !error.password.isError) ? true : false;
      }
    }
  },
  methods: {
    inputEmail(email) {
      this.email = email;
      this.error.email.isError = false;
    },
    inputPass(password) {
      this.password = password;
      this.error.password.isError = false;
    },
    submitData() {
      this.error.email.isError = true;
      this.error.password.isError = true;
      if (this.email === null || this.email === '') {
        this.error.email.text = '*メールアドレスを入力してください';
      } else {
        this.error.email.isError = false;
      }

      if (this.password === null || this.password === '') {
        this.error.password.text = '*パスワードを入力してください';
      } else {
        this.error.password.isError = false;
      }

      if (!this.error.email.isError && !this.error.password.isError) {
        this.error.isAllClear = true;
      }

      if (this.error.isAllClear) {
        this.$router.push('/admin/dashboard');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.admin {
  background: #e8ecf1;
  width: 100%;
  height: 100vh;
  header {
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .geo-hoop {
      color: #313a46;
      font-size: 20px;
      margin: 0;
      padding: 0 5px;
      &:hover {
        cursor: pointer;
        border-bottom: 1px solid #313a46;
      }
    }
  }
  main {
    margin: 0px 10px 0;
    form {
      max-width: 500px;
      color: #313a46;
      background: #f7f7f7;
      border: none;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30px 10px;
      margin: 0 auto;
      .admin-login {
        font-weight: 100px;
        margin-bottom: 30px;
      }
      label {
        width: 90%;
        max-width: 300px;
        margin: 8px auto;
        .form-name { margin: 0 0 0 3px; }
        .error {
          color: red;
          margin: 0 0 0 3px;
        }
        input {
          width: 100%;
          border: none;
          border-radius: 5px;
          background: #e4e9ed;
          padding: 5px 10px;
          &:focus { outline: none; }
        }
      }
      button {
        color: #313a46;
        background: #fff;
        border: none;
        border-radius: 5px;
        padding: 5px 20px;
        margin-top: 20px;
        &:focus { outline: none; }
      }
      .activeBtn {
        color: #f7f7f7;
        background: #313a46;
      }
    }
  }
}
</style>
