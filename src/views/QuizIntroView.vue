<template>
  <div class="quiz-intro-container">

    <!-- LOGO -->
    <h1 class="logo">Scoop</h1>

    <!-- CARD -->
    <div class="card">
      <h2 class="quiz-title">Regras do Quiz</h2>

      <ul class="quiz-info">
        <li>O quiz possui 10 perguntas</li>

        <li>
          Cada questão terá quatro alternativas disponíveis.  
          Apenas uma delas é a resposta correta!  
          Escolha com atenção antes de avançar.
        </li>

        <li>
          Assim que o quiz for iniciado, um cronômetro será ativado automaticamente.  
          Seu tempo final será registrado ao concluir todas as perguntas.
        </li>
      </ul>

      <button class="start-btn" @click="startQuiz">
        Começar
      </button>
    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function startQuiz() {
  router.push('/quiz')  
}
</script>

<style scoped>
/* Fundo geral */
.quiz-intro-container {
  background: transparent;
  min-height: 100vh;
  padding-top: 40px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Logo */
.logo {
  font-size: 64px;
  font-weight: bold;
  margin-bottom: 40px;

  color: white;
  letter-spacing: 3px;
  font-family: Arial, sans-serif;
}

.logo span {
  color: #8f9bff;
}

/* Card principal */
.card {
  background: #333;
  width: 85%;
  max-width: 900px;

  padding: 40px 60px;
  border-radius: 25px;

  box-shadow: 0 0 20px rgba(0,0,0,0.2);

  text-align: left;
}

/* Título dentro do card */
.quiz-title {
  text-align: center;
  font-size: 32px;
  margin-bottom: 25px;
  color: #ffffff;
}

/* Textos */
.quiz-info {
  list-style: disc;
  margin-left: 20px;
  font-size: 18px;
  line-height: 1.6;
  color: #ffffff;
}

/* Botão */
.start-btn {
  padding: 12px 24px;
  background: #E0DD7A;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  cursor: not-allowed;

  display: block;
  margin: 0 auto;
}

.start-btn:hover {
  background: #4C5DAA;
  color: white;
  cursor: pointer;
}

</style>
