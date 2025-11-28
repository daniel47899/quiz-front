<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"

const dados = ref([]); 
const carregando = ref(true);


function medalha(pos) {
  if (pos === 1) return "🥇";
  if (pos === 2) return "🥈";
  if (pos === 3) return "🥉";
  return pos; 
}

onMounted(async () => {
  try {
    const resposta = await axios.get("http://http://127.0.0.1:8000/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    dados.value = resposta.data; 

  } catch (e) {
    console.error("Erro ao carregar ranking:", e);
  } finally {
    carregando.value = false;
  }
});
</script>

<template>
  <div class="ranking-card">
    <h2>Ranking Geral</h2> 

    <table v-if="!carregando">
      <thead>
        <tr>
          <th>Usuário</th>
          <th>Pontuação</th>
          <th>Tempo Total</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(user, index) in dados" :key="user.id">
          <td class="user-cell">
            <span class="medal">{{ medalha(index + 1) }}</span>
            <span>{{ user.name }}</span> 
          </td>

          <td>{{ user.score }} pt</td>

          <td class="tempo">
            ⏱ {{ user.time }}
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="carregando">Carregando...</p>
  </div>
</template>

<style scoped>
.ranking-card {
  background: #222;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
  max-width: 900px;
  margin: 40px auto;
}

.ranking-card h2 {
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: 600;
  color: #E0DD7A;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
}


thead {
  background: #f4f6fa;
}

th {
  text-align: left;
  padding: 14px 18px;
  color: #555;
  font-weight: 600;
}

td {
  padding: 14px 18px;
  border-bottom: 1px solid #eee;
}

.user-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.medal {
  font-size: 20px;
  width: 32px;
  text-align: center;
}

tr:hover {
  background: #fafafa;
}

.tempo {
  white-space: nowrap;
}
</style>
