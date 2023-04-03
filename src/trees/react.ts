import { v4 as uuidv4 } from 'uuid';
import { Node } from './types';

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


// ============== SORT TREE =============

const sortItems = items => {
  return items.sort((a, b) => {
    if (a.isFolder && !b.isFolder) {
      return -1
    }
    if (!a.isFolder && b.isFolder) {
      return 1;
    }

    return a.name.localeCompare(b.name);
  })
}

export const sortFileTree = (items: Node[]) => {
  sortItems(items);
  for (const item of items) {
    if (item.items.length) {
      sortFileTree(item.items);
      console.log('d')
    }
  }

  return items;
}

// ============= CREATE TREE ===============

export const getFileTree = (files): Node[] => {
  const curatedFiles = files.map(file => file.path);

  const result = curatedFiles.reduce((tree, file) => {
    const pathArr = file.split('/');

    pathArr.reduce((acc, path, index) => {
      const exists = acc.find( x => x.name === path )

      if (!exists) {
        const newItem: any = {
          id: uuidv4(),
          path: pathArr.slice(0, index + 1).join('/'),
          name: path,
          isFolder: index !== pathArr.length - 1,
          items: []
        }
        acc.push(newItem)

        return newItem.items
      } else {
        return exists.items;
      }

    }, tree)

    return tree
  }, [])

  return result;
}

// ============ INSDERT NODE ===========

const addItemInRightOrder = (arr, path, name, isFolder) => {
  const newItem = {
    id: uuidv4(),
    name,
    path: path + '/' + name,
    isFolder,
    items: []
  }

  let index = arr.findIndex(
    item => item.isFolder === isFolder && item.name.localeCompare(name) > 0
  )

  if (index < 0) {
    index = !isFolder
      ? arr.length
      : arr.findIndex(item => !item.isFolder)
  }

  arr.splice(index, 0 , newItem);

  return newItem;
}

const checkInsert = (context, name, isFolder, destinationId) => {
  let newNode;

  if (context.id === destinationId && context.isFolder) {
    return addItemInRightOrder(context.items, context.path, name, isFolder)
  } else {
    for (const item of context.items) {
      newNode = checkInsert(item, name, isFolder, destinationId);
      if (newNode) {
        return newNode;
      }
    }
  }
}

export const insertNode = (fileTree, name, isFolder, destinationId) => {
  const newTree = [...fileTree]
  let newNode;

  for (const item of newTree) {
    newNode = checkInsert(item, name, isFolder, destinationId)
  }

  return [newTree, newNode];
}



// ==============

// const items =
//     [
//       {
//         "id": "03347b43-47ca-4c20-b01d-a704cff59f0b",
//         "path": "app",
//         "name": "app",
//         "isFolder": true,
//         "items": [
//           {
//             "id": "7a6a84e0-a5f0-4d3c-beeb-a73d0bf55c9f",
//             "path": "app/src",
//             "name": "src",
//             "isFolder": true,
//             "items": [
//               {
//                 "id": "dcb5f51a-aa61-4e6e-a8db-e6edfa567a22",
//                 "path": "app/src/App.tsx",
//                 "name": "App.tsx",
//                 "isFolder": false,
//                 "items": []
//               },
//               {
//                 "id": "cead21d9-daca-4ac4-874a-2d971a00ce0b",
//                 "path": "app/src/WidgetList",
//                 "name": "WidgetList",
//                 "isFolder": true,
//                 "items": [
//                   {
//                     "id": "98cce205-3bfd-40c5-9fca-7c866cae29fe",
//                     "path": "app/src/WidgetList/Widget.tsx",
//                     "name": "Widget.tsx",
//                     "isFolder": false,
//                     "items": []
//                   },
//                   {
//                     "id": "64bc7fef-131b-4e7c-b4e1-79b2d3fc48d6",
//                     "path": "app/src/WidgetList/WidgetList.tsx",
//                     "name": "WidgetList.tsx",
//                     "isFolder": false,
//                     "items": []
//                   }
//                 ]
//               }
//             ]
//           },
//           {
//             "id": "7c0efe1f-09bc-4bab-a69c-10a5eff1d7ad",
//             "path": "app/data",
//             "name": "data",
//             "isFolder": true,
//             "items": [
//               {
//                 "id": "de30e31a-0815-41c9-aff3-d8719a1a5284",
//                 "path": "app/data/featuredWidgets.js",
//                 "name": "featuredWidgets.js",
//                 "isFolder": false,
//                 "items": []
//               },
//               {
//                 "id": "b9d00323-e317-4387-89d5-2cb87054f7f3",
//                 "path": "app/data/discontinuedWidgets.js",
//                 "name": "discontinuedWidgets.js",
//                 "isFolder": false,
//                 "items": []
//               },
//               {
//                 "id": "31bc6a1f-6820-4664-9be3-1f39dca75604",
//                 "path": "app/data/clearanceWidgets.js",
//                 "name": "clearanceWidgets.js",
//                 "isFolder": false,
//                 "items": []
//               }
//             ]
//           },
//           {
//             "id": "b0558ab4-46e4-4aeb-9dec-1177babb42c2",
//             "path": "app/style.css",
//             "name": "style.css",
//             "isFolder": false,
//             "items": []
//           },
//           {
//             "id": "6d263329-4fd1-4534-a2f0-4da9d1e0a5b1",
//             "path": "app/index.html",
//             "name": "index.html",
//             "isFolder": false,
//             "items": []
//           }
//         ]
//       }
//     ]
//
// const sortItems = (items) => {
//   return items.sort((a, b) => {
//     const name1 = a.name;
//     const name2 = b.name;
//
//     if (a.isFolder && !b.isFolder) {
//       return -1
//     }
//     if (!a.isFolder && b.isFolder) {
//       return 1;
//     }
//
//     return name1.localeCompare(name2)
//   })
// }
//
// const sortAll2 = (items) => {
//
//   sortItems(items);
//   for (const item of items) {
//     if (item.items.length) {
//       sortAll2(item.items)
//     }
//   }
// }
//
// sortAll2(items)
//
// console.log(JSON.stringify(items, null, 4))
