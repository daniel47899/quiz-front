<template>
  <div class="result-page">

    <MainHeader />

    
    <h1 class="title">{{ resultMessage }}</h1>

    
    <div class="result-card">
      <h2 class="player-name">{{ result.user }}</h2>

      <p><strong>Pontuação:</strong> {{ result.score }}</p>
      <p><strong>Acertos:</strong> {{ result.correct }}</p>
      <p><strong>Erros:</strong> {{ result.wrong }}</p>

      <div class="card-bottom">
        <p><strong>Tempo Total:</strong> {{ result.time }}</p>
        <p><strong>Realizado:</strong> {{ result.date }}</p>
      </div>
    </div>

    
    <div class="buttons">
      <button class="gradient-btn" @click="retry">Tentar Novamente</button>
      <button class="gradient-btn" @click="goToHistory">Ver Histórico</button>
    </div>
  </div>
</template>

<script setup>
import MainHeader from "@/components/MainHeader.vue"
import { ref, onMounted, computed } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const result = ref({
  user: "",
  score: 0,
  correct: 0,
  wrong: 0,
  time: "",
  date: ""
})

const resultMessage = computed(() => {
  if (result.value.score >=  8) return "Parabéns!"
  if (result.value.score <= 6 && result.value.score >= 4) return "Quase lá!"
  if (result.value.score < 1) return "Parece que precisamos revisar um pouquinho mais."
  return "Seu Resultado da Partida"
})

onMounted(() => {
 
  const saved = localStorage.getItem("last_result")

  if (!saved) {
    return router.push("/dashboard") 
  }

  result.value = JSON.parse(saved)
})

function goBack() {
  router.back("/dashboard")
}

function retry() {
  router.push("/QuizIntroView")
}

function goToHistory() {
  router.push("/results")
}
</script>

<style scoped>

.result-page {
  background: transparent;
  min-height: 100vh;
  padding: 40px;
  color: white;
  text-align: center;
  font-family: "Inter", sans-serif;
}

.back-btn {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  position: absolute;
  left: 30px;
  top: 30px;
}

.back-btn .arrow {
  font-size: 20px;
}

.title {
  color: #E0DD7A;
  margin-top: 80px;
  font-size: 36px;
  font-weight: 700;
}

.result-card {
  background: #333;
  color: rgb(255, 255, 255);
  width: 65%;
  margin: 40px auto 20px;
  padding: 40px;
  border-radius: 40px;
  text-align: left;
}

.player-name {
  text-align: center;
  margin-bottom: 30px;
  font-size: 22px;
  font-weight: bold;
}

.result-card p {
  margin: 10px 0;
  font-size: 18px;
}

.card-bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  font-size: 18px;
}

.buttons {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 60px;
}

.gradient-btn {
  padding: 12px 24px;
  background: #E0DD7A;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  cursor: not-allowed;
  display: block;
  margin: 0 auto;
}

.gradient-btn:hover {
  background: #4C5DAA;
  color: white;
  cursor: pointer;
}

@media (max-width: 768px) {
  .result-card {
    width: 90%;
    padding: 25px;
  }

  .card-bottom {
    flex-direction: column;
    gap: 10px;
    text-align: left;
  }

  .buttons {
    flex-direction: column;
    gap: 20px;
  }
}
</style>