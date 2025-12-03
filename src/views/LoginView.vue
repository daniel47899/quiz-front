<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import PrimaryBtn from '@/components/PrimaryBtn.vue'

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

    
    localStorage.setItem('token', response.data.token)

    
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

      <PrimaryBtn :disabled="loading">Entrar</PrimaryBtn>
    </form>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  width: 350px;
  margin: 0 auto;
  padding: 50px;
  border-radius: 20px;
  background: #222;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

h1 {
  color: #E0DD7A;
  text-align: center;
  font-family: 'Freshie Personal Use', sans-serif;
  font-size: 48px;
  font-weight: bolder;
}

input {
  width: 100%;
  margin: 8px 0;
  padding: 10px;
  border-radius: 12px;
}

</style>
