<template id="node">
  <li>
    {{title}}
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
      v-for="(child, index) in todo.children"
      :key="child.id"
      :id="child.id"
      :title="child.title"
      :initializeChildren="child.children"
      v-on:remove="removeTodo(index)"
      />
    </ul>
  </li>
</template>

<script>
import node from "./Node.vue";

export default {
  name: "node",
  components: {
    node
  },
  props: {
    id: String,
    title: String,
    initializeChildren: Array
  },
  computed: {
    todo() {
      return this.$store.getters.getTodoById(this.id);
    }
  },
  data() {
    return {
      visibleAddPain: false,
      newTodoText: "",
      nextTodoId: this.initializeChildren
        ? this.initializeChildren.length
        : this.todo ? (this.todo.children ? this.todo.children.length : 0) : 0,
      children: this.initializeChildren || this.todo
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
        id: this.id + "." + this.nextTodoId++,
        title: this.newTodoText
      });
      this.newTodoText = "";
    },
    removeTodo: function(index) {
      this.children.splice(index, 1);
    }
  }
};
</script>
