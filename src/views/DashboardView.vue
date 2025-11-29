<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"

import MainHeader from "@/components/MainHeader.vue"
import RankingTable from "./RankingTable.vue"
import PrimaryBtn from "@/components/PrimaryBtn.vue"

const router = useRouter()
const user = ref(null)

// BUSCAR USUÁRIO
onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })

    user.value = response.data

  } catch (error) {
    console.error("Erro ao carregar usuário:", error)
    router.push("/login")
  }
})

// LOGOUT
async function logout() {
  try {
    await axios.post(
      "http://localhost:8000/api/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )

    localStorage.removeItem("token")
    router.push("/login")

  } catch (error) {
    console.error("Erro ao fazer logout:", error)
  }
}

function iniciarQuiz() {
  router.push("/quiz")
}
</script>

<template>
  <MainHeader />

  <div class="dashboard-container">

    <RankingTable />

    <div class="options">
      <PrimaryBtn @click="iniciarQuiz">
        Iniciar Quiz
      </PrimaryBtn>
    </div>

  </div>
</template>


<style scoped>
.dashboard-container {
  margin-top: 120px;
  text-align: center;
  color: white;
}

.options {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

button {
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background: #333;
  color: white;
}

.logout {
  background: #e74c3c;
  color: white;
}

.logout:hover {
  background: #c0392b;
}
</style>
