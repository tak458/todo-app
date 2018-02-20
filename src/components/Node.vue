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
    <div class="indicator">
      <div class="fill" :style="{width:progress}"></div>
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
    },
    progress() {
      if (this.children.length > 1) {
        const count = this.children.reduce(
          (prev, cur) => prev + (cur.isFinish ? 1 : 0),
          0
        );
        return (100 - count / this.children.length * 100).toString() + "%";
      } else {
        return this.isFinish ? "0%" : "100%";
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
        scheduledAt: null // 予定
      });
      this.newTodoText = "";
    },
    removeTodo: function(id) {
      this.$store.commit("removeTodo", { id });
    }
  }
};
</script>

<style scoped>
div.todo {
  display: flex;
}
div.indicator {
  display: flex;
  flex-flow: row-reverse;
  width: 100%;
  height: 1px;
  background-color: #eeeeee;
}
div.fill {
  width: 100%;
  height: 100%;
  background-color: #cccccc;
  transition: width 700ms 0s ease;
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
