<template id="node">
  <li>
    <div class="todo">
      <input type="checkbox" v-model="isFinish"/>
      <span class="title" :class="{isFinish: model.isFinish}">{{model.title}}</span>
      <span class="control">
        <button v-on:click="$emit('remove')">x</button>
        <button v-on:click="openNewTodo">+</button>
      </span>
    </div>
    <div v-show="visibleAddPain">
      <input
      v-model="newTodoText"
      v-on:keyup.enter="addNewTodo"
      placeholder="Add a todo"/>
      <button v-on:click="closeNewTodo">close</button>
    </div>
    <ul>
      <node
      v-for="child in todo.children"
      :key="child.id"
      :model="child"
      v-on:remove="removeTodo(child.id)"
      />
    </ul>
  </li>
</template>

<script>
import node from "./Node.vue";
import Id from "../store/Id";
import moment from "moment";

export default {
  name: "node",
  components: {
    node
  },
  props: {
    model: Object
  },
  computed: {
    todo() {
      return this.$store.getters.getTodoById(this.model.id);
    },
    nextTodoId() {
      return Math.max(-1, ...this.children.map(td => new Id(td.id).foot())) + 1;
    },
    isFinish: {
      get() {
        return this.todo.isFinish;
      },
      set(value) {
        this.$store.commit(
          "editTodo",
          Object.assign({}, this.todo, { isFinish: value })
        );
      }
    }
  },
  data() {
    return {
      visibleAddPain: false,
      newTodoText: "",
      children: this.model.children || this.todo.children
    };
  },
  methods: {
    openNewTodo: function() {
      this.visibleAddPain = true;
    },
    closeNewTodo: function() {
      this.visibleAddPain = false;
    },
    addNewTodo: function() {
      this.$store.commit("addTodo", {
        id: this.model.id + "." + this.nextTodoId,
        title: this.newTodoText,
        children: [],
        isFinish: false,
        deadlineAt: null, // 期限
        scheduledAt: null, // 予定
      });
      this.newTodoText = "";
    },
    removeTodo: function(id) {
      this.$store.commit("removeTodo", { id });
    }
  }
};
</script>

<style>
div.todo {
  display: flex;
  border-bottom: 1px solid #eeeeee;
}
span.title {
  display: block;
  margin-right: auto;
}
span.isFinish {
  text-decoration: solid line-through;
  color: lightgray;
}
</style>
