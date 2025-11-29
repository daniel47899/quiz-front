<template>
  <div class="history-item">
    <div class="item-left">

      <div class="meta-row">

        <span class="meta"><strong></strong> {{ item.name }}</span>
        <span class="meta"><strong>Pontuação:</strong> {{ item.score }}</span>
        <span class="meta"><strong>Acertos:</strong> {{ item.correct }}</span>
        <span class="meta"><strong>Erros:</strong> {{ item.wrong }}</span>
        <span class="meta"><strong>Tempo Total:</strong> {{ item.time }}</span>
        <span class="meta"><strong>Realizado:</strong> {{ item.date }}</span>

      </div>

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
  background: var(--vt-c-white);
  border-radius: 8px;
  padding: 10px 14px;
  min-height: 56px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  width: 100%;
  color: #000 !important; 
}

.item-left {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Nome do Quiz */
.quiz-name {
  font-weight: 700;
  font-size: 14px;
  color: #000 !important;
}

/* Linha com Pontuação / Acertos / Erros / Tempo / Realizado */
.meta-row {
  display: flex;
  flex-direction: row;       /* força ficar lado a lado */
  flex-wrap: wrap;           /* quebra somente se precisar */
  gap: 16px;
  font-size: 13px;
  color: #000 !important;    /* cor igual para todos */
  width: 100%;
}

/* Cada item individual (Pontuação, Acertos, etc.) */
.meta {
  color: #000 !important;
  display: flex;
  align-items: center;
  gap: 4px;
}

.meta strong {
  color: #000 !important;
}

/* Parte direita caso exista */
.item-right {
  text-align: right;
  font-size: 13px;
  color: #000 !important;
  min-width: 160px;
}

/* Responsivo */
@media (max-width: 640px) {
  .history-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .item-right {
    text-align: left;
  }
}

/* Telas muito pequenas */
@media (max-width: 487px) {
  .history-item {
    padding: 10px 12px;
    border-radius: 8px;
    gap: 6px;
  }

  .quiz-name {
    font-size: 14px;
  }

  .meta-row {
    gap: 8px;
    font-size: 12px;
    flex-wrap: wrap;
  }

  .meta {
    display: inline-block;
    min-width: 70px;
  }

  .item-right {
    font-size: 12px;
  }
}
</style>