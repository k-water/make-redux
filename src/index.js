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

function dispatch(action) {
  switch(action.type) {
    case 'UPDATE_TITLE_TEXT':
      appState.title.text = action.text
      break
    case 'UPDATE_TITLE_COLOR':
      appState.title.color = action.color
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

renderApp(appState)
dispatch({
  type: 'UPDATE_TITLE_TEXT',
  text: 'water is gay gay'
})
dispatch({
  type: 'UPDATE_TITLE_COLOR',
  color: 'blue'
})
renderApp(appState)