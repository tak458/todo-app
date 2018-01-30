const localStoragePlugin = store => {
  store.subscribe((mutation, { todos }) => {
    localStorage.setItem("test-strage-ley", JSON.stringify(todos))
  })
}

export default [localStoragePlugin]
