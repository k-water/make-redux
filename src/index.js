/**
 * 应用观察者模式
 * @param {Object} state
 * @param {Function} stateChanger
 */
function createStore(state, stateChanger) {
  const listeners = []
  const subscribe = listener => listeners.push(listener)
  const getState = () => state
  const dispatch = action => {
    // 覆盖原对象
    state = stateChanger(state, action)
    listeners.forEach(listener => listener())
  }
  return {
    getState,
    dispatch,
    subscribe
  }
}

/**
 * 
 * @param {Object} appState 
 */
function renderApp(newAppState, oldAppState = {}) {
  if (newAppState === oldAppState) return
  console.log('render app...')
  renderTitle(newAppState.title, oldAppState.title)
  renderContent(newAppState.content, oldAppState.content)
}

/**
 * 
 * @param {Object} title 
 */
function renderTitle(newTitle, oldTitle = {}) {
  if (newTitle === oldTitle) return
  console.log('render title...')
  const titleDOM = document.getElementById("title")
  titleDOM.innerHTML = newTitle.text
  titleDOM.style.color = oldTitle.color
}

/**
 * 
 * @param {Object} content 
 */
function renderContent(newContent, oldContent = {}) {
  if (newContent === oldContent) return
  console.log('render content...')
  const contentDOM = document.getElementById("content")
  contentDOM.innerHTML = newContent.text
  contentDOM.style.color = oldContent.color
}

const appState = {
  title: {
    text: "water make redux",
    color: "red"
  },
  content: {
    text: "water make redux",
    color: "green"
  }
}

function stateChanger(state, action) {
  switch (action.type) {
    case "UPDATE_TITLE_TEXT":
      return {
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      }
    case "UPDATE_TITLE_COLOR":
      return {
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      }
    default:
      return state
  }
}

const store = createStore(appState, stateChanger)
let oldState = store.getState()
// 监听数据变化
store.subscribe(() => {
  const newState = store.getState()
  renderApp(newState, oldState)
  oldState = newState
})

renderApp(store.getState())
store.dispatch({
  type: "UPDATE_TITLE_TEXT",
  text: "water is gay gay"
})
store.dispatch({
  type: "UPDATE_TITLE_COLOR",
  color: "#f00"
})