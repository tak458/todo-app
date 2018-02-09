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
        :model="todo"
        v-on:remove="removeTodo(todo.id)">
      </node>
    </ul>
  </div>
</template>

<script>
import node from "./Node.vue";
import Id from "../store/Id";

export default {
  name: "app",
  data() {
    return {
      newTodoText: ""
    };
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    },
    nextTodoId() {
      return Math.max(-1, ...this.todos.map(td => new Id(td.id).foot())) + 1;
    }
  },
  methods: {
    addNewTodo: function() {
      this.$store.commit("addTodo", {
        id: (this.nextTodoId).toString(),
        title: this.newTodoText,
        children: []
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
