<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router"; // ← IMPORTANTE

const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const password_confirmation = ref("");

const errors = ref({});
const successMessage = ref("");

async function registerUser() {
  errors.value = {};
  successMessage.value = "";

  try {
    // 1️⃣ REGISTRA O USUÁRIO
    await axios.post("http://localhost:8000/api/register", {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
    });

    // 2️⃣ LOGIN AUTOMÁTICO APÓS REGISTRAR
    const loginResponse = await axios.post(
      "http://localhost:8000/api/login",
      {
        email: email.value,
        password: password.value,
      }
    );

    // 3️⃣ SALVAR TOKEN
    localStorage.setItem("token", loginResponse.data.token);

    // 4️⃣ REDIRECIONAR PARA DASHBOARD
    router.push("/dashboard");

    successMessage.value = "Conta criada com sucesso!";
  } catch (error) {
    if (error.response?.data?.errors) {
      errors.value = error.response.data.errors;
    } else {
      errors.value = { general: "Erro ao registrar." };
    }
  }
}
</script>

<template>
  <div class="register-container">
    <h1>Registrar</h1>

    <form @submit.prevent="registerUser">
      <label>Nome</label>
      <input type="text" v-model="name" />
      <p v-if="errors.name" class="error">{{ errors.name[0] }}</p>

      <label>Email</label>
      <input type="email" v-model="email" />
      <p v-if="errors.email" class="error">{{ errors.email[0] }}</p>

      <label>Senha</label>
      <input type="password" v-model="password" />
      <p v-if="errors.password" class="error">{{ errors.password[0] }}</p>

      <label>Confirmar Senha</label>
      <input type="password" v-model="password_confirmation" />
      <p v-if="errors.password_confirmation" class="error">
        {{ errors.password_confirmation[0] }}
      </p>

      <button type="submit">Registrar</button>

      <p v-if="errors.general" class="error">{{ errors.general }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </form>
  </div>
</template>

<style scoped>
.register-container {
  max-width: 420px;
  margin: 120px auto;
  background: #222;
  padding: 30px;
  border-radius: 10px;
  color: white;
}

label {
  display: block;
  margin-bottom: 6px;
  margin-top: 12px;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: none;
  margin-bottom: 5px;
}

button {
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: #4caf50;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background: #45a945;
}

.error {
  color: #ff6b6b;
  font-size: 14px;
}

.success {
  color: #6bff8b;
  margin-top: 10px;
}
</style>
