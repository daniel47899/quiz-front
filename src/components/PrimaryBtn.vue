<template>
  <button class="primary-btn" v-bind="$attrs">
    <slot></slot>
  </button>
</template>

<style scoped>
.primary-btn {
  width: 100%;
  padding: 12px;
  background-color: #4C5DAA;
  color: white;
  margin-top: 10px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.2s ease;
}

.primary-btn:hover {
  background-color: #444;
  color: white;
}
</style>