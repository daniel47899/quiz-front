<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const login = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await axios.post('http://localhost:8000/api/login', {
      email: email.value,
      password: password.value
    })

    // Salvar token
    localStorage.setItem('token', response.data.token)

    // Redirecionar
    router.push('/dashboard')

  } catch (err) {
    error.value = err.response?.data?.message || 'Erro ao fazer login'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container">
    <h1>Login</h1>

    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Senha" />

      <p style="color:red" v-if="error">{{ error }}</p>

      <button :disabled="loading">Entrar</button>
    </form>
  </div>
</template>

<style>
.container {
  width: 400px;
  margin: 40px auto;
  background: #222;
  padding: 20px;
  border-radius: 10px;
}
input {
  width: 100%;
  margin: 8px 0;
  padding: 10px;
}
button {
  width: 100%;
  padding: 12px;
  background: green;
  color: white;
  margin-top: 10px;
}
</style>
