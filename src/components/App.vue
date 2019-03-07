<template>
  <v-container id="todolist">
    <v-text-field
      v-model="newTodoText"
      v-on:keyup.enter="addNewTodo"
      placeholder="Add a todo"
    />
    <v-treeview :items="todos">
      <template slot="append" slot-scope="{ item }">
        <v-btn icon small @click.stop="openAddDialog(item.id)">
          <v-icon>add</v-icon>
        </v-btn>
        <v-btn icon small @click.stop="openEditDialog(item)">
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn icon small @click.stop="openRemoveDialog(item)">
          <v-icon>delete</v-icon>
        </v-btn>
      </template>
    </v-treeview>
    <v-dialog v-model="addDialog.isOpen" width="500">
      <v-card>
        <v-card-title>Todoの追加</v-card-title>
        <v-card-text>
          <v-text-field label="タイトル" v-model="addDialog.data.model.name" />
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeAddDialog(true)">OK</v-btn>
          <v-btn @click="closeAddDialog(false)">キャンセル</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editDialog.isOpen" width="500">
      <v-card>
        <v-card-title>Todoの編集</v-card-title>
        <v-card-text>
          <v-text-field label="タイトル" v-model="editDialog.data.model.name" />
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeEditDialog(true)">OK</v-btn>
          <v-btn @click="closeEditDialog(false)">キャンセル</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="removeDialog.isOpen" width="500">
      <v-card>
        <v-card-title>Todoの削除</v-card-title>
        <v-card-text>
          <span class="font-weight-bold">{{
            removeDialog.data.model.name
          }}</span>
          を削除してもよろしいですか？
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeRemoveDialog(true)">OK</v-btn>
          <v-btn @click="closeRemoveDialog(false)">キャンセル</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data: () => ({
    newTodoText: "",
    addDialog: {
      isOpen: false,
      data: { parentId: undefined, model: {} }
    },
    editDialog: {
      isOpen: false,
      active: [],
      data: { parentId: undefined, model: {} }
    },
    removeDialog: {
      isOpen: false,
      data: { model: {} }
    }
  }),
  computed: {
    ...mapState("todos", {
      todos: state => state.todos.children
    })
  },
  methods: {
    ...mapGetters("todos", ["getParentById"]),
    ...mapMutations("todos", ["addTodo", "editTodo"]),
    ...mapActions("todos", ["removeTodo"]),
    addNewTodo() {
      const model = {
        name: this.newTodoText,
        isFinish: false,
        memo: "",
        importance: null,
        deadlineAt: null, // 期限
        scheduledAt: null // 予定
      };
      this.addTodo({ parentId: undefined, model });
      this.newTodoText = "";
    },
    openAddDialog(parentId) {
      this.addDialog.data.parentId = parentId;
      this.addDialog.isOpen = true;
    },
    closeAddDialog(isSave) {
      this.addDialog.isOpen = false;
      if (
        isSave &&
        this.addDialog.data.model.name !== undefined &&
        this.addDialog.data.model.name !== ""
      ) {
        this.addTodo(this.addDialog.data);
      }
      this.addDialog.data = { parentId: undefined, model: {} };
    },
    openEditDialog(model) {
      const parent = this.getParentById(model.id);
      this.editDialog.data.parentId = parent ? parent.id : undefined;
      this.editDialog.data.model = Object.assign({}, model);
      this.editDialog.active = [this.editDialog.data.parentId];
      this.editDialog.isOpen = true;
    },
    closeEditDialog(isSave) {
      this.editDialog.isOpen = false;
      if (
        isSave &&
        this.editDialog.data.model.name !== undefined &&
        this.editDialog.data.model.name !== ""
      ) {
        this.editTodo(this.editDialog.data);
        if (this.editDialog.active.length > 0) {
          this.editDialog.data.parentId = this.editDialog.active[0];
          this.moveTodo(this.editDialog.data);
        }
        this.editDialog.active = [];
      }
      this.editDialog.data = { parentId: undefined, model: {} };
    },
    openRemoveDialog(model) {
      this.removeDialog.data.model = Object.assign({}, model);
      this.removeDialog.isOpen = true;
    },
    closeRemoveDialog(isSave) {
      this.removeDialog.isOpen = false;
      if (
        isSave &&
        this.removeDialog.data.model.name !== undefined &&
        this.removeDialog.data.model.name !== ""
      ) {
        this.removeTodo(this.removeDialog.data);
      }
    }
  }
};
</script>

<style></style>
