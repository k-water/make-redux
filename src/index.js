const appState = {
  title: {
    text: 'water make redux',
    color: 'red'
  },
  content: {
    text: 'water make redux',
    color: 'green'
  }
}

function renderApp(appState) {
  renderTitle(appState.title)
  renderContent(appState.content)
}
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
    stateChanger(state, action)
    listeners.forEach(listener => listener())
  }
  return {
    getState,
    dispatch,
    subscribe
  }
}

function stateChanger(state, action) {
  switch(action.type) {
    case 'UPDATE_TITLE_TEXT':
      state.title.text = action.text
      break
    case 'UPDATE_TITLE_COLOR':
      state.title.color = action.color
      break
    default:
      break
  }
}

function renderTitle(title) {
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = title.text
  titleDOM.style.color = title.color
}

function renderContent(content) {
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = content.text
  contentDOM.style.color = content.color
}

const store=  createStore(appState, stateChanger)
store.subscribe(() => renderApp(store.getState()))

renderApp(store.getState())
store.dispatch({
  type: 'UPDATE_TITLE_TEXT',
  text: 'water is gay gay'
})
store.dispatch({
  type: 'UPDATE_TITLE_COLOR',
  color: '#f00'
})