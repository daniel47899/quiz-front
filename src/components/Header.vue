<template>
    <header class="header">
      <div class="logo">Scoop Quiz</div>
  
      <nav class="navigation">
        <button type="button" @click="goToLogin"class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5">Login</button>
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

  function goToResults() {
    router.push('/results')
  }
  </script>

  
  
  <style scoped>

@import url('https://fonts.cdnfonts.com/css/trafit-personal-use');

  .header {
    position: fixed; 
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
  
    display: flex;
    justify-content: space-between;
    align-items: center;
  
    padding: 18px;
    background-color: #222;
    color: white;
  }
  
  .logo {
    margin-left: 16px;
    font-size: 46px;
    font-weight: bold;
    font-family: 'Trafit Personal Use', sans-serif;
  }
  
.navigation {
    display: flex;
    gap: 12px;
    margin-right: 50px;
}


  .navigation button {
    gap: 12px;
    background-color: #4C5DAA;
    color: white;
    padding: 14px 24px;
    font-weight: bold;
    font-size: 18px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }
  
  .navigation button:hover {
    background-color: #444;
    color: white;
  }

  
  @media (max-width: 487px) {
    .header { padding: 10px 12px; }
    .logo { width: 96px; height: auto; }
    .navigation button { padding: 6px 10px; margin-left: 6px; font-size: 12px; }
  }
  </style>
  