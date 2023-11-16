Task.vue
<template>
      <div class="task-header">
        <h3>{{ task.name }}</h3>
        <button @click="openEditModal">Modifier</button>
      </div>
      <p class="task-description">{{ task.description }}</p>
      <div class="task-footer">
        <button class="task-button" @click="deleteTask">Supprimer</button>
      </div>
      <div v-if="editModalVisible" class="modal">
        <div class="modal-content">
          <h3>Modifier la tâche</h3>
          <label for="editedName">Nom :</label>
          <input id="editedName" v-model="editedName" />
          <label for="editedDescription">Description :</label>
          <textarea id="editedDescription" v-model="editedDescription"></textarea>
          <button @click="saveTask">Enregistrer</button>
          <button @click="closeEditModal">Annuler</button>
        </div>
      </div>
  </template>
  
  <script setup>
  import { defineProps, ref } from 'vue';
  import { useStore } from 'vuex';
  
  const props = defineProps(['task', 'taskIndex', 'column']);
  const store = useStore();
  
  const editModalVisible = ref(false);
  const editedName = ref(props.task.name);
  const editedDescription = ref(props.task.description);
  
  const openEditModal = () => {
    editModalVisible.value = true;
  };
  
  const closeEditModal = () => {
    editModalVisible.value = false;
  };
  
  const saveTask = () => {
  const editedTask = {
    ...props.task,
    name: editedName.value !== '' ? editedName.value : props.task.name,
    description: editedDescription.value !== '' ? editedDescription.value : props.task.description,
  };

  emit('editTask', props.taskIndex, editedTask);

  closeEditModal();
};
  
  const deleteTask = () => {
    emit('deleteTask', props.taskIndex, props.column);
  };

  
  </script>
  
<style scoped>
.task-container {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-bottom: 10px;
}

.task-container .task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  background-color: aliceblue;
}

.task-container h3 {
  margin: 0;
}

.task-container button {
  background-color: #3498db;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  cursor: pointer;
}

.task-container button:hover {
  background-color: #2980b9;
}

.task-container .task-description {
  margin-bottom: 16px;
}

.task-container .task-footer {
  text-align: right;
}

.task-container .task-button {
  background-color: #e74c3c;
}

.task-container .task-button:hover {
  background-color: #c0392b;
}

</style>
