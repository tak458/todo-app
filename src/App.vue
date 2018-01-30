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
      nextTodoId: 0
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
    removeTodo: function(index) {
      this.$store.commit("removeTodo", { index });
    }
  },
  components: {
    node
  }
};
</script>

<style>

</style>
