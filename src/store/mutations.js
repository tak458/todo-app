import Id from "./Id"

export const mutations = {
  addTodo(state, model) {
    const _addTodo = (index, todos, model) => {
      console.log({ index, todos, model })
      if (index.length() === 1) {
        todos.push(model)
      } else {
        const newIndex = index.excludeRootId().toString()
        _addTodo(new Id(newIndex), todos.find(todo => new Id(todo.id).foot() === index.head()).children, model)
      }
    }
    _addTodo(new Id(model.id), state.todos, model)
  },
  removeTodo(state, model) {
    const _removeTodo = (index, todos, model) => {
      console.log({ index, todos, model })
      if (index.length() === 1) {
        todos.splice(todos.findIndex(todo => todo.id === model.id), 1)
      } else {
        const newIndex = index.excludeRootId().toString()
        _removeTodo(new Id(newIndex), todos.find(todo => new Id(todo.id).foot() === index.head()).children, model)
      }
    }
    _removeTodo(new Id(model.id), state.todos, model)
  },
  editTodo(state, model) {
    const _editTodo = (index, todos, model) => {
      console.log({ index, todos, model })
      if (index.length() === 1) {
        todos[todos.findIndex(todo => todo.id === model.id)].isFinish = model.isFinish
      } else {
        const newIndex = index.excludeRootId().toString()
        _removeTodo(new Id(newIndex), todos.find(todo => new Id(todo.id).foot() === index.head()).children, model)
      }
    }
    _editTodo(new Id(model.id), state.todos, model)
  }
}
