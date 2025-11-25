<template>
    <header class="header">
      <div class="logo">Quiz App</div>
  
      <nav class="navigation">
        <button @click="goToLogin">Login</button>
        <button @click="goToRegister">Registrar</button>
      </nav>
    </header>
  </template>
  
  <script setup>
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  
  function goToLogin() {
    router.push("/login");
  }
  
  function goToRegister() {
    router.push("/register");
  }
  </script>
  
  <style scoped>
  .header {
    position: fixed; /* Fica no topo */
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
  
    display: flex;
    justify-content: space-between;
    align-items: center;
  
    padding: 16px 24px;
    background-color: #222;
    color: white;
  }
  
  .logo {
    font-size: 22px;
    font-weight: bold;
  }
  
  .navigation button {
    margin-left: 12px;
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  
  .navigation button:hover {
    background-color: #444;
    color: white;
  }
  </style>
  