import Id from "./Id"

export const mutations = {
  addTodo(state, { id, title }) {
    const _addTodo = (index, todos, { id, title }) => {
      console.log({ index, todos, id, title })
      if (index.length() === 1) {
        todos.push({
          id,
          title
        })
      } else {
        const newIndex = index.excludeRootId().toString()
        if (todos.find(todo => new Id(todo.id).foot() === index.head()).children === undefined)
          todos.find(todo => new Id(todo.id).foot() === index.head()).children = []
        _addTodo(new Id(newIndex), todos.find(todo => new Id(todo.id).foot() === index.head()).children, { id, title })
      }
    }
    _addTodo(new Id(id), state.todos, { id, title })
  },
  removeTodo(state, { index }) {
    state.todos.splice(index, 1)
  }
}
