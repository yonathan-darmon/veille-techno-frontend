<!-- column -->
<template>
  <div class="kanban-column" @drop="handleDrop" @dragover="handleDragOver">
    <h2>{{ column.name }}</h2>
    <button @click="openEditModal('column')">Éditer le titre</button>
    <div>
      <div v-for="(task, taskIndex) in column.tasks" :key="task.id" class="task-container" draggable="true"
        @dragstart="handleDragStart($event, taskIndex)" @dragover="handleDragOver" @drop="handleDrop($event, taskIndex)"
        @editTask="onEditTask">

        <h3>{{ task.name }}</h3>
        <p>{{ task.description }}</p>
        <button @click="openEditModal('task', taskIndex)">Edit Task</button>
        <button @click="onDeleteTask(taskIndex)">Delete Task</button>
      </div>
    </div>
    <div v-if="editModalVisible" class="modal">
      <div class="modal-content">
        <h3 v-if="editModalType === 'column'">Éditer le titre de la colonne</h3>
        <h3 v-else-if="editModalType === 'task'">Éditer la tâche</h3>
        <label for="editedTitle">Nouveau titre:</label>
        <input id="editedTitle" v-model="editedTitle" />
        <label v-if="editModalType === 'task'" for="editedDescription">Nouvelle description:</label>
        <textarea v-if="editModalType === 'task'" id="editedDescription" v-model="editedDescription"></textarea>
        <button @click="saveTitle">Enregistrer</button>
        <button @click="closeEditModal">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useStore } from 'vuex';

const props = defineProps(['column', 'columnIndex']);
const store = useStore();

const editModalVisible = ref(false);
const editedTitle = ref(props.column.name);
const editedDescription = ref('');
const taskIndexx = ref(null);
const editModalType = ref('');

const handleDragOver = (event) => {
  event.preventDefault();
};

const handleDragStart = (event, taskIndex) => {
  event.stopPropagation();

  const data = { columnIndex: props.columnIndex, taskIndex };
  store.state.draggedTaskData = JSON.stringify(data);
  event.dataTransfer.setData('application/json', JSON.stringify(data));
};


const handleDrop = (event, taskIndex) => {

  event.stopPropagation();

  const source = JSON.parse(store.state.draggedTaskData);

  // Assurez-vous que taskIndex est correctement défini
  const target = { columnIndex: props.columnIndex, taskIndex };


  if (props.column) {
    store.commit('moveTask', { source, target });
    event.dataTransfer.clearData();
  }
};

const openEditModal = (type, taskIndex) => {
  editModalType.value = type;
  editModalVisible.value = true;
  if (type === 'task') {
    taskIndexx.value = taskIndex;

    const task = props.column.tasks[taskIndex];
    editedTitle.value = task.name;
    editedDescription.value = task.description || '';
  }
};

const closeEditModal = () => {
  editModalVisible.value = false;
};

const saveTitle = () => {
  if (editModalType.value === 'column') {
    store.commit('editColumnTitle', { columnIndex: props.columnIndex, newTitle: editedTitle.value });
  } else if (editModalType.value === 'task') {
    store.commit('editTask', {
      columnIndex: props.columnIndex,
      taskIndex: taskIndexx.value,
      editedTask: {
        name: editedTitle.value,
        description: editedDescription.value,
      },
    });
  }
  closeEditModal();
};
const onDeleteTask = (taskIndex) => {
  store.commit('removeTask', { columnIndex: props.column.id, taskIndex: taskIndex });
};
</script>
<style scoped>
.kanban {
  display: flex;
  justify-content: space-around;
  padding: 20px;
}

.kanban-board {
  display: flex;
}

.kanban-column {
  flex: 1;
  margin-right: 20px;
  padding: 15px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.kanban-column h2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-container {
  margin-top: 10px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.task-container h3 {
  margin-bottom: 5px;
}

.add-task-button {
  margin-top: 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.add-task-button:hover {
  background-color: #2980b9;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.modal label,
.modal textarea,
.modal input {
  display: block;
  margin-bottom: 10px;
}

.modal button {
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.modal button:hover {
  background-color: #2980b9;
}
</style>