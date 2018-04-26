<template>
  <v-app>
    <v-container id="todolist">
      <v-text-field
        v-model="newTodoText"
        v-on:keyup.enter="addNewTodo"
        placeholder="Add a todo"/>
      <node
        v-for="todo in todos"
        :key="todo.id"
        :model="todo"
        v-on:remove="removeTodo(todo.id)">
      </node>
    </v-container>
  </v-app>
</template>

<script>
import node from "./Node.vue";
import Id from "../store/Id";
import moment from "moment";

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
        id: this.nextTodoId.toString(),
        title: this.newTodoText,
        children: [],
        isFinish: false,
        memo: "",
        importance: null,
        deadlineAt: null, // 期限
        scheduledAt: null, // 予定
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
