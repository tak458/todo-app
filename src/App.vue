<template>
  <div id="app">
    <input
      v-model="newTodoText"
      v-on:keyup.enter="addNewTodo"
      placeholder="Add a todo"/>
    <ul>
      <node
        v-for="todo in todos"
        :key="todo.id"
        :id="todo.id"
        :title="todo.title"
        :initializeChildren="todo.children"
        v-on:remove="removeTodo(todo.id)">
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
      nextTodoId: Math.max(...this.$store.state.todos.map(todo => todo.id)) + 1
    };
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    }
  },
  methods: {
    addNewTodo: function() {
      this.$store.commit("addTodo", {
        id: (this.nextTodoId++).toString(),
        title: this.newTodoText
      });
      this.newTodoText = "";
    },
    removeTodo: function(id) {
      this.$store.commit("removeTodo", { id });
    }
  },
  components: {
    node
  }
};
</script>

<style>

</style>
