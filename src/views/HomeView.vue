<script setup>
import Header from '../components/Header.vue'
</script>

<template>
  <div>
    <Header />

    <main class="home-content">
      <h1>Bem-vindo ao Quiz App</h1>
      <p>Faça login ou registre-se para continuar.</p>
    </main>
  </div>
</template>

<style scoped>
.home-content {
  text-align: center;
  margin-top: 60px;
  color: white;
}
</style>