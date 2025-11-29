<template>
  <div class="results-page">
    <div class="topbar">

      
      <button class="back" @click="goBack">⟵ Retornar</button>

      
      <div class="user"> 
        <div class="avatar"></div>
        <div class="greeting">Olá, <strong>{{ userName }}</strong></div>
      </div>

    </div>

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
</template>

<script setup>
import { ref } from 'vue'
import ResultHistoryItem from '@/components/ResultHistoryItem.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userName = ref('Fulano')

function goBack() {
  router.back()
}

// Mock data
const items = ref([
  { name: 'Nome do Quiz', score: 'xx', correct: 'xx', wrong: 'xx', time: 'xx', date: 'dd/mm/yyyy' },
  { name: 'Nome do Quiz', score: 'xx', correct: 'xx', wrong: 'xx', time: 'xx', date: 'dd/mm/yyyy' },
  { name: 'Nome do Quiz', score: 'xx', correct: 'xx', wrong: 'xx', time: 'xx', date: 'dd/mm/yyyy' },
  { name: 'Nome do Quiz', score: 'xx', correct: 'xx', wrong: 'xx', time: 'xx', date: 'dd/mm/yyyy' },
  { name: 'Nome do Quiz', score: 'xx', correct: 'xx', wrong: 'xx', time: 'xx', date: 'dd/mm/yyyy' },
  { name: 'Nome do Quiz', score: 'xx', correct: 'xx', wrong: 'xx', time: 'xx', date: 'dd/mm/yyyy' },
])
</script>

<style scoped>
.results-page {
  padding: 24px;
  margin-top: 80px; /* offset for header */
  color: var(--color-heading);
}

.topbar {
  display: flex;
  flex-direction: column; /* ← PARA FICAR UM EMBAIXO DO OUTRO */
  align-items: flex-start;
  margin-bottom: 24px;
  gap: 10px;
}

.back {
  background: transparent;
  border: none;
  color: var(--color-text);
  font-size: 16px;
  cursor: pointer;
}

.user {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, #666 0%, #444 100%);
  border: 2px solid var(--color-border);
}

.greeting { font-size: 18px; }

.content { margin-top: 12px; }

.page-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
}

@media (max-width: 487px) {
  .results-page {
    padding: 12px;
    margin-top: 64px;
  }

  .page-title {
    font-size: 16px;
    margin-bottom: 10px;
  }

  .card {
    padding: 12px;
    border-radius: 8px;
  }

  .history-list {
    gap: 10px;
    max-height: calc(100vh - 200px);
    padding-right: 4px;
  }

  .topbar { 
    gap: 8px;
  }

  .topbar .user { gap: 8px; }
  .avatar { width: 40px; height: 40px; }
}

@media (max-width: 640px) {
  .results-page { padding: 16px; }
  .card { padding: 16px; }
}

.card {
  background: var(--vt-c-black);
  border-radius: 10px;
  padding: 24px;
  border: 1px solid var(--color-border);
  width: 100%;
  max-width: none;
}

.title { 
  margin-bottom: 16px;
  font-size: 18px;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 6px;
}

.history-list::-webkit-scrollbar { width: 10px; }
.history-list::-webkit-scrollbar-track { background: transparent; }
.history-list::-webkit-scrollbar-thumb { background: var(--color-border); border-radius: 12px; }

@media (min-width: 1024px) {
  .results-page {
    grid-column: 1 / -1;
    max-width: none;
    margin-left: 0;
    margin-right: 0;
    padding-left: 56px;
    padding-right: 56px;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    width: 100vw;
  }

  .content { 
    max-width: none;
    margin-left: 0;
    margin-right: 0;
    width: 100%;
  }

  .card { 
    width: 100%;
    max-width: none;
  }
}
</style>