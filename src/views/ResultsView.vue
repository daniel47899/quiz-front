<template>
  <div class="results-page">
    <MainHeader />

    <div class="page-inner">
      <div class="content">
        <h1 class="page-title">Meus Resultados</h1>

        <div class="card">
          <h2 class="title">Histórico de Quiz</h2>

          <div class="history-list">
            <ResultHistoryItem 
              v-for="(item, idx) in items"
              :key="idx"
              :item="item"
            />
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import MainHeader from "@/components/MainHeader.vue"
import ResultHistoryItem from '@/components/ResultHistoryItem.vue'

import { ref, onMounted } from 'vue'
import axios from "axios"

const items = ref([])
const carregando = ref(true)

onMounted(async () => {
  try {
    const resposta = await axios.get("http://localhost:8000/api/quiz/history", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })

    items.value = resposta.data.quizzes.map(q => ({
      name: "Quiz - Conhecimentos Gerais",
      score: q.score ?? 0,
      correct: q.correct_answers ?? 0,
      wrong: q.wrong_answers ?? 0,
      time: `${q.total_time}s`, 
      date: new Date(q.created_at).toLocaleDateString("pt-BR"), 
    }))

  } catch (e) {
    console.error("Erro ao carregar histórico:", e)
  } finally {
    carregando.value = false
  }
})
</script>

<style scoped>
.results-page {
  padding: 24px;
  color: var(--color-heading);
}

.page-inner {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.content { margin-top: 12px; }

.page-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #ffffff !important;
}

.card {
  background: #333;
  border-radius: 10px;
  padding: 24px;
  border: 1px solid var(--color-border);
  width: 100%;
}

.title { 
  margin-bottom: 16px;
  font-size: 18px;
  color: #E0DD7A !important;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 6px;
}
</style>
