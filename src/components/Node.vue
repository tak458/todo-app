<template id="node">
  <li>
    {{model.title}}
    <button v-on:click="$emit('remove')">x</button>
    <button v-on:click="openNewTodo">+</button>
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
    }
  },
  data() {
    return {
      visibleAddPain: false,
      newTodoText: "",
      nextTodoId: this.model.children
        ? Math.max(...this.model.children.map(todo => new Id(todo.id).foot())) + 1
        : this.todo
          ? this.todo.children
            ? Math.max(...this.todo.children.map(todo => new Id(todo.id).foot())) + 1
            : 0
          : 0,
      children: this.model.children || this.todo
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
        id: this.model.id + "." + this.nextTodoId++,
        title: this.newTodoText
      });
      this.newTodoText = "";
    },
    removeTodo: function(id) {
      this.$store.commit("removeTodo", { id });
    }
  }
};
</script>
