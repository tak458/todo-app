import Id from "./Id"

export const state = {
  todos: JSON.parse(localStorage.getItem("test-strage-ley") || "[]")
}

export const getters = {
  getTodoById: (state) => (id) => {
    const _getTodoById = (index, todos) => {
      if (index.length() === 1) {
        return todos.find(todo => new Id(todo.id).foot() === index.head());
      } else {
        const newIndex = index.excludeRootId().toString()
        return _getTodoById(new Id(newIndex), todos.find(todo => new Id(todo.id).foot() === index.head()).children)
      }

    }
    return _getTodoById(new Id(id), state.todos)
  }
}
