<script setup>
import Header from '../components/Header.vue'
</script>

<template>
  <div class="home-container">
    <Header />

    <main class="home-content">
      <h1>
        Bem-vindo ao Quiz do Scoop!
      </h1>
      <p>Exercite sua mente com um clique</p>
            <div className="pt-8">
              <Button>
                Começar agora
                <ArrowRight/>
              </Button>
            </div>

    </main>
  </div>
</template>

<style scoped>

@import url('https://fonts.cdnfonts.com/css/freshie-personal-use');

.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center;

}

.home-content{
  margin-top: 300px;
  text-align: center;
  color: white;
}

.home-content h1 {
  font-size: 60px;
  color: #E0DD7A;
  font-family: 'Freshie Personal Use', sans-serif;
  font-weight: bolder;
  text-align: center;
}

.home-content p {
  font-size: 35px;
  font-family: 'Freshie Personal Use', sans-serif;
  font-style: italic;
  text-align: center;
}
.home-content button {
  display: flex;
  align-items: center;
  gap: 8px;

  background-color: #ffffff;
  color: #1a1f36;
  font-size: 16px;
  font-weight: bolder;

  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  cursor: pointer;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}

.pt-8 {
  margin-top: 16px;
  display: flex;
  justify-content: center;
  width: 100%;
}

.home-content button:hover {
  background-color: #f3f4f6;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}


</style>
