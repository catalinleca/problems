const defaultItems = [
  {
    path: 'app/src/App.tsx',
    contents:
      `import React from 'react'
import { WidgetList } from './WidgetList/WidgetList'
import featuredWidgets from '../data/featuredWidgets'
import clearanceWidgets from '../data/clearanceWidgets'
import discontinuedWidgets from '../data/discontinuedWidgets'

const widgets = featuredWidgets + clearanceWidgets + discontinuedWidgets

export const App = () => {
  return (
    <div>
      <h1>Widgets R Us</h1>
      <WidgetList widgets={widgets} />
    </div>
  )
}`
  },
  {
    path: 'app/data/featuredWidgets.js',
    contents:
      `export default [
  { name: 'spadoink', price: 777 },
  { name: 'kafloof', price: 1326 },
  { name: 'sweezil', price: 966 }
]`
  },
  {
    path: 'app/data/discontinuedWidgets.js',
    contents:
      `export default [
  { name: 'neewumps', price: 138 },
  { name: 'snarcap', price: 5873 },
  { name: 'topwolly', price: 83 }
]`
  },
  {
    path: 'app/style.css',
    contents:
      `body, html {
  height: 100%;
  width: 100%;
  font-family: comic-sans;
  font-size: 1rem;
  background: limegreen;
}`
  },
  {
    path: 'app/data/clearanceWidgets.js',
    contents:
      `export default [
  { name: 'plonches', price: 839 },
  { name: 'chopfle', price: 7743 },
  { name: 'kazkabo', price: 9133 }
]`
  },
  {
    path: 'app/src/WidgetList/Widget.tsx',
    contents:
      `import React from 'react'

export const Widget = ({ widget }) => {
  return (
    <div>
      <b>Widget: {widget.name}</b>
      <span>\${widget.price / 1000.0}</span>
    </div>
  )
}`,
  },
  {
    path: 'app/src/WidgetList/WidgetList.tsx',
    contents:
      `import React from 'react'
import { Widget } from './Widget'

export const WidgetList = ({ widgets }) => {
  return (
    <ul>
      {widgets.map((widget) => {
        return (
          <li key={widget.name}>
            <Widget widget={widget} />
          </li>
        )
      })}
    </ul>
  )
}`,
  },
  {
    path: 'app/index.html',
    contents:
      `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
    <title>React | CoderPad</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/App.tsx"></script>
    <script type="module" src="/style.css"></script>
  </body>
</html>`
  },
]

const curatedItems = defaultItems.map(({path}) => path)
console.log(curatedItems)

const getIdMap = (items) => {
  const obj = {}

  for (const path of items) {
    for (const nodeName of path.split('/')) {
      const id = Math.random() * 100;

      if (!obj[nodeName]) {
        obj[nodeName] = id.toString().split('.')[1];
      }
    }
  }

  return obj;
}

const parseItems = (items) => {
  const obj = {};
  const idMap = getIdMap(items)

  console.log(idMap)

  for (const path of items) {
    let currentParent = -1;
    const pathArr = path.split('/')

    for (const [i, nodeName] of pathArr.entries()) {
      const nodeId = idMap[nodeName]

      if (!obj[nodeId]) {
        obj[nodeId] = {
          id: nodeId,
          parentId: currentParent,
          name: nodeName,
          path: pathArr.slice(0, i + 1).join('/'),
          isFolder: i !== pathArr.length - 1,
          items: []
        }
      }

      if (currentParent !== -1) {
        const currentChildren = obj[currentParent].items

        if (currentChildren.indexOf(nodeId) === -1) {
            obj[currentParent].items.push(nodeId)
        }
      }

      currentParent = nodeId;
    }

  }

  return obj;
}

console.log(parseItems(curatedItems))
