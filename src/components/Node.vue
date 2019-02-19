<template id="node">
  <v-list>
    <v-list-tile>
      <v-list-tile-action>
        <v-checkbox v-model="isFinish" />
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>
          <span>{{ model.title }}</span>
          <span>{{ remainTime }}</span>
        </v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <div>
          <v-menu
            bottom
            offset-x
            :close-on-content-click="false"
            v-model="visibleEditPain"
          >
            <v-btn flat icon color="primary" slot="activator">
              <v-icon>mode_edit</v-icon>
            </v-btn>
            <v-card>
              <v-container>
                <v-text-field v-model="title" label="タイトル" />
                <v-menu lazy full-width transition="scale-transition">
                  <v-text-field
                    v-model="scheduledAt"
                    slot="activator"
                    label="予定"
                    prepend-icon="event"
                    readonly
                  />
                  <v-date-picker v-model="scheduledAt" no-title scrollable />
                </v-menu>
                <v-menu lazy full-width transition="scale-transition">
                  <v-text-field
                    v-model="deadlineAt"
                    slot="activator"
                    label="期限"
                    prepend-icon="event"
                    readonly
                  />
                  <v-date-picker v-model="deadlineAt" no-title scrollable />
                </v-menu>
                <v-text-field v-model="importance" label="重要度" />
                <v-text-field v-model="memo" label="メモ" multi-line />
              </v-container>
            </v-card>
          </v-menu>
          <v-menu
            bottom
            offset-x
            :close-on-content-click="false"
            v-model="visibleAddPain"
          >
            <v-btn flat icon color="primary" slot="activator">
              <v-icon>add</v-icon>
            </v-btn>
            <v-card>
              <v-container>
                <v-text-field
                  v-model="newTodoText"
                  v-on:keyup.enter="addNewTodo"
                  placeholder="Add a todo"
                />
              </v-container>
            </v-card>
          </v-menu>
          <v-btn flat icon color="primary" v-on:click="$emit('remove')">
            <v-icon>delete</v-icon>
          </v-btn>
        </div>
      </v-list-tile-action>
    </v-list-tile>
    <node
      style="margin-left:1em"
      v-for="child in todo.children"
      :key="child.id"
      :model="child"
      v-on:remove="removeTodo(child.id)"
    />
  </v-list>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import node from "./Node.vue";
import Id from "../store/models/Id";
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
    ...mapGetters("todos", ["getTodoById"]),
    todo() {
      return this.getTodoById(this.model.id);
    },
    nextTodoId() {
      return Math.max(-1, ...this.children.map(td => new Id(td.id).foot())) + 1;
    },
    title: {
      get() {
        return this.todo.title;
      },
      set(value) {
        this.editTodo(Object.assign({}, this.todo, { title: value }));
      }
    },
    isFinish: {
      get() {
        return this.todo.isFinish;
      },
      set(value) {
        this.editTodo(Object.assign({}, this.todo, { isFinish: value }));
      }
    },
    importance: {
      get() {
        return this.todo.importance;
      },
      set(value) {
        this.editTodo(Object.assign({}, this.todo, { importance: value }));
      }
    },
    memo: {
      get() {
        return this.todo.memo;
      },
      set(value) {
        this.editTodo(Object.assign({}, this.todo, { memo: value }));
      }
    },
    deadlineAt: {
      get() {
        return this.todo.deadlineAt;
      },
      set(value) {
        this.editTodo(Object.assign({}, this.todo, { deadlineAt: value }));
        this.remainTime = moment(value).fromNow();
      }
    },
    scheduledAt: {
      get() {
        return this.todo.scheduledAt;
      },
      set(value) {
        this.editTodo(Object.assign({}, this.todo, { scheduledAt: value }));
      }
    },
    progress() {
      if (!this.isFinish && this.children.length > 1) {
        const count = this.children.reduce(
          (prev, cur) => prev + (cur.isFinish ? 1 : 0),
          0
        );
        return (100 - (count / this.children.length) * 100).toString() + "%";
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
    ...mapMutations("todos", ["addTodo", "editTodo", "removeTodo"]),
    addNewTodo: function() {
      this.addTodo({
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
      this.removeTodo({ id });
    }
  }
};
</script>

<style scoped></style>
