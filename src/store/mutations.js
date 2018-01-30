export const state = {
  todos: JSON.parse(localStorage.getItem("test-strage-ley") || "[]")
}

export const mutations = {
  addTodo(state, { id, title }) {
    id.split(".")[0]
    state.todos.push({
      id,
      title
    })
  },
  removeTodo(state, { index }) {
    state.todos.splice(index, 1)
  }
}
