const state = () => ({
  todos: {
    children: []
  },
  nextId: 0
});

const recur = (rootObj, findFunc) => {
  const _recur = obj => {
    if (findFunc(obj)) {
      return [obj];
    } else {
      return obj.children
        .map(child => _recur(child))
        .reduce((acc, val) => acc.concat(val), [])
        .filter(Boolean);
    }
  };
  const targets = _recur(rootObj);
  return targets && targets.length > 0 ? targets[0] : undefined;
};

const findRecursiveById = (id, rootObj) => {
  return recur(rootObj, obj => obj.id === id);
};

const findParentByChildId = (id, rootObj) => {
  return recur(rootObj, obj => obj.children.some(child => child.id === id));
};

const mutations = {
  addTodo(state, { parentId, model }) {
    const _model = Object.assign(
      {
        id: state.nextId++,
        children: []
      },
      model
    );
    const target = findRecursiveById(parentId, state.todos);
    target.children.push(_model);
  },
  removeTodo(state, { parentId, model }) {
    const target = findRecursiveById(parentId, state.todos);
    if (target && target.children) {
      target.children.splice(
        target.children.findIndex(cat => cat.id === model.id),
        1
      );
    } else {
      console.error("remove", { parentId, model });
    }
  },
  editTodo(state, { model }) {
    const target = findRecursiveById(model.id, state.todos);
    Object.assign(target, model);
  }
};

const getters = {
  getTodoById: state => id => findRecursiveById(id, state.todos),
  getParentById: state => id => findParentByChildId(id, state.todos)
};

const actions = {
  removeTodo({ commit, state }, { model }) {
    const parent = findParentByChildId(model.id, state.todos);
    commit("removeTodo", { parentId: parent.id, model });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
