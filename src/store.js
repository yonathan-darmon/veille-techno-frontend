// store.js
import { createStore } from 'vuex';

export default createStore({
    state: {
        columns: [],
    },
    mutations: {
        addColumn(state, newColumn) {
            state.columns.push(newColumn);
        },
        addTask(state, { columnIndex, newTask }) {
            state.columns[columnIndex].tasks.push(newTask);
        },
        removeTask(state, { columnIndex, taskIndex }) {
            state.columns[columnIndex - 1].tasks.splice(taskIndex, 1);
        },
        removeColumn(state, columnIndex) {
            state.columns.splice(columnIndex, 1);
        },
        editTask(state, { columnIndex, taskIndex, editedTask }) {
            state.columns[columnIndex].tasks[taskIndex] = editedTask;
        },
        editColumnTitle(state, { columnIndex, newTitle }) {
            state.columns[columnIndex].name = newTitle;
        },
        moveTask(state, { source, target }) {
            const { columnIndex: sourceColumnIndex, taskIndex: sourceTaskIndex } = source;
            const { columnIndex: targetColumnIndex, taskIndex: targetTaskIndex } = target;

            const taskToMove = state.columns[sourceColumnIndex].tasks[sourceTaskIndex];
            state.columns[sourceColumnIndex].tasks.splice(sourceTaskIndex, 1);
            state.columns[targetColumnIndex].tasks.splice(targetTaskIndex, 0, taskToMove);
        },
    },
});
