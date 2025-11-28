<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";


const router = useRouter();
const user = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    user.value = response.data;
  } catch (err) {
    console.error("Erro ao carregar usuário:", err);
    router.push("/login");
  }
});

async function logout() {
  try {
    await axios.post(
      "http://localhost:8000/api/logout",
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    localStorage.removeItem("token");
    router.push("/login");
  } catch (err) {
    console.error("Erro ao fazer logout:", err);
  }
}
</script>

<template>
  <header class="main-header">
    <div class="main-header__inner">
      <div class="main-header__left">
        <nav class="main-nav" aria-label="main navigation">
          <a href="#" class="nav-link">
            <Trophy class="nav-icon" />
            Dashboard
          </a>
          <a href="#" class="nav-link">
            <BarChart3 class="nav-icon" />
            Meus Resultados
          </a>
          <a href="#" class="nav-link" @click.prevent="logout">
            <LogOut class="nav-icon" />
            Sair
          </a>
        </nav>
      </div>

      <div class="main-header__right">
        <div class="user-info">
          <p class="welcome">
            Bem-vindo,
            <strong v-if="user">{{ user.name }}</strong><span v-else>...</span>!
          </p>

        </div>

        <div class="avatar">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=João"
            alt="Avatar do Usuário"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.main-header {
  max-width: 100%;
  position: sticky;
  padding:6px;
  top: 0;
  z-index: 50;
  background-color: #222;
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  color: #ffffff;
}

.main-header__inner {
  margin-left: 16px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}


.main-header__left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.main-header__right{
  margin-left: 16px;
  display: flex;
  align-items: center;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 18px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #e6e7ea;
  font-size: 16px;
  text-decoration: none;
  padding: 6px 8px;
  border-radius: 6px;
  transition: color 0.15s ease, background 0.15s ease;
}

.nav-link:hover {
  color: #a78bfa;
  background: rgba(255, 255, 255, 0.02);
}

.nav-icon {
  width: 16px;
  height: 16px;
  color: inherit;
}


.main-header__right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-info {
  text-align: right;
  display: block; 
}

.welcome {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
}

.level {
  margin: 0;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.25);
  border: 2px solid rgba(79, 70, 229, 0.15); 
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media (max-width: 639px) {
  .main-header {
    padding: 10px;
  }

  .main-header__inner {
    gap: 6px;
  }

  .main-header__left {
    gap: 12px;
    order: 2;
    flex: 1 1 100%;
  }

  .main-header__right{
    flex-direction: row-reverse;
  }

  .main-nav {
    gap: 6px;
  }

  .nav-link {
    padding: 4px 6px;
    font-size: 12px;
  }

  .avatar {
    width: 36px;
    height: 36px;
  }
  
  .welcome {
    font-size: 14px;
  }
}
</style>
