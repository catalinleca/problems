import {useMemo, useState} from "react";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/use-traverse-tree";
import "./styles.css";
import explorer from "./data/folderData"
import Explorer from "./components/Explorer";
import {tree} from "./data/defaultTree";
import {flatItems} from "./flatItems";
import {newItems} from "./flatItems";
import {FlatItems} from "./components/FlatItems";

const itemsArr = [
  {
    id:"1",
    name: "root",
    isFolder: true,
    items: [
      {
        id:"2",
        name: "src",
        isFolder: true,
        items: [
          {
            id:"6",
            name: "public_nested_file",
            isFolder: false,
            items: []
          },
          {
            id:"3",
            name: "public nested 1",
            isFolder: true,
            items: [
              {
                id:"4",
                name: "index.html",
                isFolder: false,
                items: []
              },
              {
                id:"5",
                name: "hello.html",
                isFolder: false,
                items: []
              }
            ]
          },
        ]
      },
      {
        id:"7",
        name: "public",
        isFolder: true,
        items: [
          {
            id:"8",
            name: "styles.css",
            isFolder: false,
            items: []
          },
          {
            id:"9",
            name: "Index.js",
            isFolder: false,
            items: []
          },
          {
            id:"10",
            name: "App.js",
            isFolder: false,
            items: []
          },
          {
            id:"24",
            name: "ztyles",
            isFolder: false,
            items: []
          },
          {
            id:"25",
            name: "aylets",
            isFolder: false,
            items: []
          }
        ]
      },
      {
        id:"11",
        name: "package.json",
        isFolder: false,
        items: []
      }
    ]
  },
  {
    id:"12",
    name: "containers",
    isFolder: true,
    items: [
      {
        id:"13",
        name: "public",
        isFolder: true,
        items: [
          {
            id:"14",
            name: "public nested 1",
            isFolder: true,
            items: [
              {
                id:"15",
                name: "zndex.html",
                isFolder: false,
                items: []
              },
              {
                id:"16",
                name: "aello.html",
                isFolder: false,
                items: []
              }
            ]
          },
          {
            id:"17",
            name: "public_nested_file",
            isFolder: false,
            items: []
          }
        ]
      },
      {
        id:"18",
        name: "src",
        isFolder: true,
        items: [
          {
            id:"19",
            name: "App.js",
            isFolder: false,
            items: []
          },
          {
            id:"20",
            name: "Index.js",
            isFolder: false,
            items: []
          },
          {
            id:"21",
            name: "Indexes",
            isFolder: true,
            items: []
          },
          {
            id:"22",
            name: "styles.css",
            isFolder: false,
            items: []
          }
        ]
      },
      {
        id:"23",
        name: "package.json",
        isFolder: false,
        items: []
      }
    ]
  },
  {
    id: "24",
    name: "Button.js",
    isFolder: false,
    items: []
  }
]


export const sortItems = (items) => {
  return items.sort((a, b) => {
    const name1 = a.name;
    const name2 = b.name;

    if (a.isFolder && !b.isFolder) {
      return -1
    }
    if (!a.isFolder && b.isFolder) {
      return 1;
    }

    return name1.localeCompare(name2)
  })
}

const sortAll = (items) => {
  for (const item of items) {
    if (item.items.length) {
      sortItems(item.items)
      sortAll(item.items)
    }
  }

  sortItems(items);
}

const sortAll2 = (items) => {
  sortItems(items);

  for (const item of items) {
    if (item.items.length) {
      sortAll2(item.items)
    }
  }
}

// sortItems(itemsArr)
// sortAll(itemsArr);

// sortAll2(itemsArr)

const addItem = (items, name, isFolder) => {
  const newItem = {
    id: Date.now(),
    name,
    isFolder,
    items: []
  }

  let index = items.findIndex(item => item.isFolder === isFolder && item.name.localeCompare(name) > 0);

  if (index < 0) {
    index = !isFolder
      ? items.length
      : items.findIndex(item => !item.isFolder)
  }

  items.splice(index, 0, newItem)

  return items;
}


const checkInsert = (context, id, name, isFolder) => {
  console.log(context)
  if (context.id === id && context.isFolder) {
    return addItem(context.items, name, isFolder)
  }

  context.items.map( item => {
    return checkInsert(item, id, name, isFolder)
  })
}

const insertNode = (tree, id, name, isFolder) => {
  const newTree = [...tree]
  for (const item of newTree) {
    checkInsert(item, id, name, isFolder)
  }

  return newTree;
}

sortAll2(tree)

const getSortedChildren = (items) => {
  const sortedItems = [...items]

  return sortedItems.sort((a, b) => {
    const objA = flatItems[a]
    const objB = flatItems[b]

    if (objA.isFolder && !objB.isFolder) {
      return -1
    }
    if (!objA.isFolder && objB.isFolder) {
      return 1
    }
    return objA.name.localeCompare(objB.name)
  })
}

const sortFlat = (flatItems) => {
  const newItems = {}

  for(const id of Object.keys(flatItems)) {
    const object = flatItems[id];

    const sortedChildren = getSortedChildren(object.items)

    newItems[id] = {
      ...object,
      items: sortedChildren
    }
  }

  return newItems;
}

const sortedFlatItems = sortFlat(flatItems)

export default function App() {
  // // const [explorerData, setExplorerData] = useState(explorer);
  // const [items, setItems] = useState(tree);
  //
  // const handleInsertNode = (name, id, isFolder) => {
  //   const finalData = insertNode(items, id, name, isFolder)
  //
  //   console.log('finalData: ', finalData);
  //   setItems(finalData)
  // };

  const [items, setItems] = useState(sortedFlatItems);

  const addChildInRightOrder = (siblings, newNode) => {
    let index = siblings.findIndex( siblingId => {
      const sibling = items[siblingId];

      return sibling.isFolder === newNode.isFolder && sibling.name.localeCompare(newNode.name) > 0
    })

    if (index < 0) {
      index = newNode.isFolder
        ? siblings.findIndex( siblingId => !items[siblingId].isFolder)
        : siblings.length
    }

    return [
      ...siblings.slice(0, index),
      newNode.id,
      ...siblings.slice(index)
    ]
  }

  const insertNode = (id, name, isFolder) => {
    const newNodeId = Date.now();
    const newNode = {
      id: newNodeId,
      parentId: id,
      name: name,
      isFolder: isFolder,
      items: []
    }

    const currentParent = items[id];
    const newChildren = addChildInRightOrder(currentParent.items, newNode)
    const newParent = {
      ...currentParent,
      items: newChildren
    }
    const newItems = {
      ...items,
      [id]: newParent,
      [newNodeId]: newNode
    }

    setItems({
      ...newItems,
    })
  }

  const deleteNode = (id) => {
    const newItems = {}
    for (const itemId of Object.keys(items)) {
      const {items: currentChildren} = items[itemId];

      newItems[itemId] = {
        ...items[itemId],
        items: [...currentChildren]
      }
    }

    const parentId = newItems[id].parentId
    const parent = newItems[parentId]
    const newChildren = parent.items.filter(childId => childId !== id)
    const newParent = {
      ...parent,
      items: newChildren
    }
    newItems[parentId] = newParent

    deleteChildren(id)
    function deleteChildren(id) {
      for (const nestedId of newItems[id].items) {
        deleteChildren(nestedId)
      }

      delete newItems[id]
    }

    setItems(newItems)
  }

  const renameNode = (id, newName) => {
    const newItems = {
      ...items
    }
    const {name, path, items: children} = items[id]
    const newPath = path.replace(name, newName)

    for (const childId of children) {
      const child = newItems[childId]
      child.path = child.path.replace(name, newName)
    }

    setItems({
      ...newItems,
      [id]: {
        ...items[id],
        name: newName,
        path: newPath
      }
    })
  }
  
  return (
    <div className="App">
      {/*<Folder handleInsertNode={handleInsertNode} explorer={explorerData} />*/}
      <br />
      {/*{*/}
      {/*  items.map((item, key) => (*/}
      {/*    <ul key={`${item.name}${key}${item.id}`}>*/}
      {/*      <Explorer handleInsertNode={handleInsertNode} explorer={item} />*/}
      {/*    </ul>*/}
      {/*  ))*/}
      {/*}*/}
      <FlatItems
        items={items}
        handleInsertNode={insertNode}
        handleDeleteNode={deleteNode}
        handleRenameNode={renameNode}
      />
    </div>
  );
}

// fix connect script in latest video
