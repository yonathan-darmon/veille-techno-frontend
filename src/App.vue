//app.vue
<template>
  <div id="app">
    <header class="kanban-header">
      <h1>Kanban Board</h1>
      <div class="bouton-titre">
      <button @click="addColumn">Ajouter une colonne</button>
      <button @click="addTask">Ajouter une tâche</button>
    </div>
    </header>
    
    <div class="kanban-columns">
      <div v-for="(column, columnIndex) in columns" :key="column.id" class="kanban-column">
        <Column :column="column" :columnIndex="columnIndex" />
        <button @click="removeColumn(columnIndex)">Supprimer</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import Column from './components/Column.vue';

const store = useStore();
const columns = ref(store.state.columns);

const addColumn = () => {
  const newColumn = {
    id: columns.value.length + 1,
    name: 'Nouvelle colonne',
    tasks: [],
  };
  store.commit('addColumn', newColumn);
};

const addTask = () => {
  if (columns.value.length > 0) {
    const columnIndex = 0; // ou ajustez cela en conséquence
    const newTask = {
      id: Date.now(),
      name: 'Nouvelle tâche',
      description: '',
    };

    store.commit('addTask', { columnIndex, newTask });
  }
};


const removeColumn = (columnIndex) => {
  store.commit('removeColumn', columnIndex);
};
const renderCount = ref(0);

onMounted(() => {
  // Update columns when the store state changes
  columns.value = store.state.columns;
  renderCount.value += 1;
});
</script>

<style scoped>
#app {
  width: 100%;
  min-width: 70vw;
}

.kanban-header {
  background-color: #3498db;
  padding: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  

}
.bouton-titre{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 2%;
}
.kanban-header h1 {
  margin: 0;
  color: #fff;
}

.kanban-columns {
  display: flex;
  height: 100vh;
}
</style>
