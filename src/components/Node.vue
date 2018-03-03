<template id="node">
  <li>
    <div class="todo">
      <input type="checkbox" v-model="isFinish"/>
      <input type="textbox" class="title" v-show="visibleEditPain" v-model="title"/>
      <span class="title" v-show="!visibleEditPain" :class="{isFinish: model.isFinish}">{{model.title}}</span>
      <span class="remainTime">{{remainTime}}</span>
      <span class="control">
        <button v-on:click="openEditTodo">#</button>
        <button v-on:click="openNewTodo">+</button>
        <button v-on:click="$emit('remove')">x</button>
      </span>
    </div>
    <div class="indicator">
      <div class="fill" :style="{width:progress}"></div>
    </div>
    <div v-show="visibleEditPain">
        <label>期限<input type="date" v-model="deadlineAt"/></label>
        <label>予定<input type="date" v-model="scheduledAt"/></label>
        <label>重要度<input type="text" v-model="importance"/></label>
        <label>メモ<textarea v-model="memo"/></label>
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
input.title {
  margin-right: auto;
}
span.isFinish {
  text-decoration: solid line-through;
  color: lightgray;
}
</style>
