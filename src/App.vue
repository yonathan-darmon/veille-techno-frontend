//app.vue
<template>
  <div>
    <header>
      <h1>Kanban Board</h1>
    </header>
    <div>
      <button @click="addColumn">Ajouter une colonne</button>
      <button @click="addTask">Ajouter une tâche</button>
    </div>
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
.kanban-columns {
  display: flex;
  height: 100vh;
}
</style>
