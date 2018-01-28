<template>
  <div id="app">
    <input
      v-model="newTodoText"
      v-on:keyup.enter="addNewTodo"
      placeholder="Add a todo"/>
    <ul>
      <node
        v-for="(todo, index) in todos"
        :key="todo.id"
        :id="todo.id"
        :title="todo.title"
        :initializeChildren="todo.children"
        v-on:remove="removeTodo(index)">
      </node>
    </ul>
  </div>
</template>

<script>
import node from "./Node.vue";

export default {
  name: "app",
  data() {
    return {
      newTodoText: "",
      nextTodoId: 0,
      todos: []
    };
  },
  methods: {
    addNewTodo: function() {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText
      });
      this.newTodoText = "";
    },
    removeTodo: function(index) {
      this.todos.splice(index, 1);
    }
  },
  components: {
    node
  }
};
</script>

<style>

</style>
