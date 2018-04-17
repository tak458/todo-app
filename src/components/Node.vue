<template id="node">
  <v-list>
    <v-list-tile>
      <v-list-tile-action>
        <v-checkbox v-model="isFinish"/>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-text-field class="title" v-show="visibleEditPain" v-model="title"/>
        <v-list-tile-title v-show="!visibleEditPain" :class="{isFinish: model.isFinish}">{{model.title}}</v-list-tile-title>
        <span class="remainTime">{{remainTime}}</span>
      </v-list-tile-content>
      <v-list-tile-action>
        <div>
          <v-btn fab small v-on:click="openEditTodo">#</v-btn>
          <v-btn fab small v-on:click="openNewTodo">+</v-btn>
          <v-btn fab small v-on:click="$emit('remove')">x</v-btn>
        </div>
      </v-list-tile-action>
      <div v-show="visibleEditPain">
          <label>期限<input type="date" v-model="deadlineAt"/></label>
          <label>予定<input type="date" v-model="scheduledAt"/></label>
          <label>重要度<v-text-field v-model="importance"/></label>
          <label>メモ<textarea v-model="memo"/></label>
      </div>
      <div v-show="visibleAddPain">
        <v-text-field
        v-model="newTodoText"
        v-on:keyup.enter="addNewTodo"
        placeholder="Add a todo"/>
        <v-btn v-on:click="closeNewTodo">close</v-btn>
      </div>
    </v-list-tile>
    <node style="margin-left:1em"
    v-for="child in todo.children"
    :key="child.id"
    :model="child"
    v-on:remove="removeTodo(child.id)"
    />
  </v-list>
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
    title: {
      get() {
        return this.todo.title;
      },
      set(value) {
        this.$store.commit(
          "editTodo",
          Object.assign({}, this.todo, { title: value })
        );
      }
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
    importance: {
      get() {
        return this.todo.importance;
      },
      set(value) {
        this.$store.commit(
          "editTodo",
          Object.assign({}, this.todo, { importance: value })
        );
      }
    },
    memo: {
      get() {
        return this.todo.memo;
      },
      set(value) {
        this.$store.commit(
          "editTodo",
          Object.assign({}, this.todo, { memo: value })
        );
      }
    },
    deadlineAt: {
      get() {
        return this.todo.deadlineAt;
      },
      set(value) {
        this.$store.commit(
          "editTodo",
          Object.assign({}, this.todo, { deadlineAt: value })
        );
        this.remainTime = moment(value).fromNow();
      }
    },
    scheduledAt: {
      get() {
        return this.todo.scheduledAt;
      },
      set(value) {
        this.$store.commit(
          "editTodo",
          Object.assign({}, this.todo, { scheduledAt: value })
        );
      }
    },
    progress() {
      if (!this.isFinish && this.children.length > 1) {
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
      visibleEditPain: false,
      newTodoText: "",
      children: this.model.children || this.todo.children,
      remainTime: null
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
        memo: "",
        importance: null,
        deadlineAt: null, // 期限
        scheduledAt: null // 予定
      });
      this.newTodoText = "";
    },
    removeTodo: function(id) {
      this.$store.commit("removeTodo", { id });
    },
    openEditTodo: function() {
      this.visibleEditPain = !this.visibleEditPain;
    }
  }
};
</script>

<style scoped>
</style>
