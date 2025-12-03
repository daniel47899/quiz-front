<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"   

const router = useRouter()               

const question = ref(null)
const loading = ref(true)
const error = ref(null)

const selectedOptionId = ref(null)
const selectedOptionLetter = ref(null)

const quizId = ref(null)
const allQuestions = ref([])
const currentQuestionIndex = ref(0)
const startTime = ref(null)


const API_URL_START = "http://localhost:8000/api/quiz/start"
const API_URL_ANSWER = (id) => `http://localhost:8000/api/quiz/${id}/answer`
const API_URL_FINISH = (id) => `http://localhost:8000/api/quiz/${id}/finish`

const authHeader = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
}

async function normalizeQuestions(rawQuestions) {

  return await Promise.all(rawQuestions.map(async q => {

    if (Array.isArray(q.options) && q.options.length) return q

    if (q.option_a || q.option_b || q.option_c || q.option_d) {
      q.options = [
        { id: `${q.id}-A`, letter: 'A', label: q.option_a ?? '' },
        { id: `${q.id}-B`, letter: 'B', label: q.option_b ?? '' },
        { id: `${q.id}-C`, letter: 'C', label: q.option_c ?? '' },
        { id: `${q.id}-D`, letter: 'D', label: q.option_d ?? '' },
      ]
      return q
    }

    try {
      const detail = await axios.get(`http://localhost:8000/api/questions/${q.id}`, authHeader)
      const d = detail.data
      if (Array.isArray(d.options) && d.options.length) {
        q.options = d.options
        return q
      }
      if (d.option_a || d.option_b || d.option_c || d.option_d) {
        q.options = [
          { id: `${q.id}-A`, letter: 'A', label: d.option_a ?? '' },
          { id: `${q.id}-B`, letter: 'B', label: d.option_b ?? '' },
          { id: `${q.id}-C`, letter: 'C', label: d.option_c ?? '' },
          { id: `${q.id}-D`, letter: 'D', label: d.option_d ?? '' },
        ]
        return q
      }
    } catch (err) {
      console.warn(`Não foi possível buscar opções da pergunta ${q.id}:`, err?.response?.status || err.message)
    }

    q.options = []
    return q
  }))
}

const selectOption = (optionId, optionLetter) => {
  selectedOptionId.value = optionId
  selectedOptionLetter.value = optionLetter
}


const continueQuiz = async () => {
  if (!selectedOptionId.value || !quizId.value) return

  try {
    await axios.post(
      API_URL_ANSWER(quizId.value),
      {
        question_id: question.value.id,
        selected_option: selectedOptionLetter.value
      },
      authHeader
    )

    if (currentQuestionIndex.value < allQuestions.value.length - 1) {
      currentQuestionIndex.value++
      question.value = allQuestions.value[currentQuestionIndex.value]
      selectedOptionId.value = null
      selectedOptionLetter.value = null
    } else {
      await finishQuiz()
    }

  } catch (errorReq) {
    console.error("Erro ao enviar resposta:", errorReq)
    alert("Erro ao enviar resposta.")
  }
}


const finishQuiz = async () => {
  const totalTime = Math.floor((Date.now() - startTime.value) / 1000)

  try {
    const response = await axios.post(
      API_URL_FINISH(quizId.value),
      { total_time: totalTime },
      authHeader
    )

    
    localStorage.setItem(
      "last_result",
      JSON.stringify({
        score: response.data.quiz.score,
        correct: response.data.quiz.correct_answers,
        wrong: response.data.quiz.wrong_answers,
        time: `${totalTime}s`,
        date: new Date().toLocaleDateString("pt-BR")
      })
    )

    
    router.push('/FinalResultsView')

  } catch (errorReq) {
    console.error("Erro ao finalizar:", errorReq)
    alert("Erro ao finalizar o quiz")
  }
}


onMounted(async () => {
  try {
    const response = await axios.post(API_URL_START, {}, authHeader)

    quizId.value = response.data.quiz_id
    const raw = response.data.questions ?? []

    const normalized = await normalizeQuestions(raw)
    allQuestions.value = normalized
    question.value = allQuestions.value[0] ?? null

    startTime.value = Date.now()

  } catch (err) {
    console.error("Erro ao iniciar quiz:", err)
    error.value = err.response?.data?.message || err.message || "Erro ao iniciar o quiz"
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="quiz-container">

    <header class="header">
      <h2 class="quiz-title">Scoop - Conhecimentos Gerais</h2>
    </header>

    <div v-if="!loading && question" class="progress-text">
      {{ currentQuestionIndex + 1 }}/{{ allQuestions.length }}
    </div>

    <main class="main">

      <div v-if="loading" class="loading">Carregando...</div>

      <div v-else-if="error" class="error-message">
        {{ error }}
      </div>

      <div v-else-if="question" class="question-box">

        <h1 class="question-title">
          {{ question.title }}
        </h1>

        <div class="options-list">

          <div
            v-for="(option, index) in question.options"
            :key="option.id"
            class="option-item"
            @click="selectOption(option.id, option.letter)"
            :class="{ selected: selectedOptionId === option.id }"
          >
            <div class="option-letter">{{ option.letter }}</div>

            <div class="option-info">
              <span class="option-label">{{ option.label }}</span>
            </div>

          </div>

        </div>

      </div>

    </main>

    <footer class="footer">
  <button
    class="continue-btn"
    :class="{ active: selectedOptionId }"
    :disabled="!selectedOptionId"
    @click="continueQuiz"
  >
    {{ currentQuestionIndex + 1 === allQuestions.length ? "FINALIZAR" : "CONTINUAR" }}
  </button>
</footer>


  </div>
</template>

<style scoped>

.quiz-container {
  min-height: 100vh;
  background: #222;
  display: flex;
  flex-direction: column;
}

.header {
  padding: 15px 24px;
  display: flex;
  justify-content: center;
}

.main {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.loading {
  font-size: 18px;
  color: #E0DD7A;
}

.error-message {
  font-size: 18px;
  color: red;
  text-align: center;
  margin-top: 20px;
}

.question-box {
  width: 100%;
  max-width: 500px;
  text-align: center;
}

.question-title {
  font-size: 22px;
  font-weight: bold;
  color: #E0DD7A;
}

.quiz-title {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}

.options-list {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.option-item {
  display: flex;
  align-items: center;
  background: #444;
  padding: 15px 18px;
  border-radius: 14px;
  border: 2px solid transparent;
  cursor: pointer;
}

.option-item.selected {
  border-color: #4C5DAA;
}

.option-letter {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.option-info {
  margin-left: 12px;
  text-align: left;
  color: #fff;
}

.footer {
  background: #111;
  padding: 20px;
  display: flex;
  justify-content: center;
}

.progress-text {
  text-align: center;
  font-weight: bold;
  color: #4C5DAA;
  margin-bottom: 10px;
}

.continue-btn {
  padding: 12px 24px;
  background: #E0DD7A;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  cursor: not-allowed;
}

.continue-btn.active {
  background: #4C5DAA;
  color: white;
  cursor: pointer;
}
</style>
