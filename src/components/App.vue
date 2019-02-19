<template>
  <v-container id="todolist">
    <v-text-field v-model="newTodoText" v-on:keyup.enter="addNewTodo" placeholder="Add a todo"/>
    <node v-for="todo in todos" :key="todo.id" :model="todo" v-on:remove="removeTodo(todo.id)"></node>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import node from "./Node.vue";
import Id from "../store/models/Id";
import moment from "moment";

export default {
  data: () => ({
    newTodoText: ""
  }),
  computed: {
    ...mapState("todos", {
      todos: state => state.todos
    }),
    nextTodoId() {
      return Math.max(-1, ...this.todos.map(td => new Id(td.id).foot())) + 1;
    }
  },
  methods: {
    ...mapMutations("todos",["addTodo","removeTodo"]),
    addNewTodo() {
      this.addTodo({
        id: this.nextTodoId.toString(),
        title: this.newTodoText,
        children: [],
        isFinish: false,
        memo: "",
        importance: null,
        deadlineAt: null, // 期限
        scheduledAt: null // 予定
      });
      this.newTodoText = "";
    },
    removeTodo(id) {
      this.removeTodo({ id });
    }
  },
  components: {
    node
  }
};
</script>

<style>
</style>
