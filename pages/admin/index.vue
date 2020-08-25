<template>
  <div class="admin container">
    <header>
      <p class="geo-hoop" @click="$router.push('/')">geoHoop</p>
    </header>
    <main>
      <form @submit.prevent="submitData()">
        <p class="admin-login">管理者ログイン</p>
        <label>
          <p v-if="error.email.isError === null || error.email.isError === false" class="form-name">メールアドレス</p>
          <p v-else class="error">{{ error.email.text }}</p>
          <input v-model="email" type="email" />
        </label>
        <label>
          <p v-if="error.password.isError === null || error.password.isError === false" class="form-name">パスワード</p>
          <p v-else class="error">{{ error.password.text }}</p>
          <input v-model="password" type="password" />
        </label>
        <button type="submit">ログイン</button>
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
  methods: {
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
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80px;
    .geo-hoop {
      color: #262626;
      margin: 0;
      padding: 0 5px;
      &:hover {
        cursor: pointer;
        border-bottom: 1px solid #aaa;
      }
    }
  }
  main {
    margin-top: 40px;
    form {
      max-width: 500px;
      color: #262626;
      border: 1px solid #6c7a89;
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
        background: #fff;
        border: none;
        border: 1px solid #262626;
        border-radius: 100px;
        padding: 10px 20px;
        margin-top: 20px;
        &:focus { outline: none; }
      }
    }
  }
}
</style>
