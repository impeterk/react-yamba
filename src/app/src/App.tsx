import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import { createElement, useCallback, useState } from 'react'
import { renderToStaticMarkup } from "react-dom/server";

const registry = {
  Card: ({ title, description, children }) => (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </div>
  ),

  Button: ({ label, variant }) => (
    <button className={`button button-${variant}`}>
      {label}
    </button>
  ),
  "mj-div": () => (
  <mj-button>hello MJML</mj-button>
  )
};

function renderNode(node) {
  const Component = registry[node.type];

  if (!Component) {
    throw new Error(`Unknown component: ${node.type}`);
  }

  const children = (node.children ?? []).map(renderNode);

  return createElement(Component, node.props, ...children);
}

const json = {
  type: "Card",
  props: {
    title: "Welcome",
    description: "This content comes from JSON.",
  },
  children: [
    {
      type: "Button",
      props: {
        label: "Get started",
        variant: "primary",
      },
    },
  ],
};

function App(): React.JSX.Element {
  const [res, setRes] = useState(null)
  const [tree, setTree] = useState(JSON.stringify(json, null ,2))
  const [html, setHtml] = useState('')
  const ipcHandle = useCallback(async () => {
    const update = await window.electron.ipcRenderer.invoke('ping')
    setRes(update)
  },[])

  function renderHtml(e) {
    e.preventDefault()
    setHtml(renderToStaticMarkup(renderNode(JSON.parse(tree))))
  }

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
        </div>
        <pre>
          Response from electron:{res}
        </pre>

      </div>
      <form onSubmit={renderHtml}>
        <textarea
        value={tree}
        onChange={e => setTree(e.target.value)} />
        <button className='action'>Render</button>
      </form>
        <div dangerouslySetInnerHTML={{__html: html}} />
      <Versions></Versions>
    </>
  )
}

export default App
