<script setup>
import TaskModal from "./components/TaskModal.vue";
import Baselayout from "./components/BaseLayout.vue";

const data = {
  creationModalVisible: false,
  finiModalVisible: false,
};

const methods = {
  openCreationModal() {
    data.creationModalVisible = true;
  },
  closeCreationModal() {
    data.creationModalVisible = false;
  },
  openFiniModal() {
    data.finiModalVisible = true;
  },
  closeFiniModal() {
    data.finiModalVisible = false;
  },
};
</script>
<template>
  <Baselayout>
    <div class="container">
      <header>
        <nav>
          <a href="#" @click.prevent="openCreationModal">Création de tâches</a>
          <p>La todo List</p>
          <a href="#" @click.prevent="openFiniModal">Tâche fini</a>
        </nav>
      </header>
      <main>
        <router-view></router-view>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
      <TaskModal v-if="creationModalVisible" @close="closeCreationModal">
        Création de tâches modal content
      </TaskModal>
      <TaskModal v-if="finiModalVisible" @close="closeFiniModal">
        Tâche fini modal content
      </TaskModal>
    </div>
  </Baselayout>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border-bottom: 1px solid #ccc;
  color: #a70e0e;
  font-size: 3em;
  width: 100%;
}

nav {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  align-items: center;
}

nav a {
  text-decoration: none;
  color: #a70e0e;
  font-weight: bold;
  
}

main {
  flex: 1;
  padding-top: 60px;
}

footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border-top: 1px solid #ccc;
  color: #666;
  font-size: 0.8em;
  width: 100%;
}
</style>
