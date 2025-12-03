<template>
  <div class="history-item" role="listitem" aria-label="Histórico de quiz">
    <div class="item-left">
      <div class="quiz-name">{{ item.name }}</div>

      <div class="meta-row">
        <span class="meta"><strong>Pontuação:</strong> {{ item.score }}</span>
        <span class="meta"><strong>Acertos:</strong> {{ item.correct }}</span>
        <span class="meta"><strong>Erros:</strong> {{ item.wrong }}</span>
        <span class="meta"><strong>Tempo Total:</strong> {{ item.time }}</span>
        <span class="meta"><strong>Realizado:</strong> {{ item.date }}</span>
      </div>
    </div>

    <div class="item-right" v-if="item.extra">
     
      {{ item.extra }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  }
})
</script>

<style scoped>

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff !important;        
  color: #111111 !important;            
  border-radius: 10px;
  padding: 14px 16px;
  min-height: 64px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.25);
  width: 100%;
  border: 1px solid rgba(0,0,0,0.06);
  opacity: 1 !important;                 
  filter: none !important;               
  mix-blend-mode: normal !important;     
  z-index: 999 !important;               
  position: relative;
}


.item-left {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.quiz-name {
  font-weight: 700;
  font-size: 15px;
  color: #111111 !important;
}


.meta-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 13px;
  color: #333333 !important;
}

.meta {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(0,0,0,0.02);
  padding: 6px 8px;
  border-radius: 6px;
  color: #333333 !important;
}

.meta strong { color: #111111 !important; }


.item-right {
  text-align: right;
  font-size: 13px;
  color: #333333 !important;
  min-width: 120px;
}


@media (max-width: 640px) {
  .history-item { flex-direction: column; align-items: flex-start; gap: 10px; }
  .item-right { text-align: left; }
}

</style>
