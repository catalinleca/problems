const { items } = require('./testTree')

const sortItems = (items) => {
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

const sortAll2 = (items) => {
  sortItems(items);

  for (const item of items) {
    if (item.items.length) {
      sortAll2(item.items)
    }
  }
}

sortAll2(items);

/**
 *   ##### FIND NODE #####
 */

const findNode1 = (tree, id) => {
  if (tree.id === id) {
    return tree
  }

  for (const node of tree.items) {
    const finalNode = findNode1(node, id)
    if (finalNode) {
      return finalNode
    }
  }
}

const findNode2 = (items, id) => {
  for (const node of items) {
    if (node.id === id) {
      return node
    } else {
      const finalNode = findNode2(node.items, id)

      if (finalNode) {
        return finalNode
      }
    }
  }
}

// const node = findNode1(items[0], "cead21d9-daca-4ac4-874a-2d971a00ce0b")
// const node = findNode2(items, "cead21d9-daca-4ac4-874a-2d971a00ce0b")

// console.log(node)

/**
 *   ##### DELETE NODE #####
 */

const checkIfParent = (items, id) => !!items.find( x => x.id === id )

const deleteNode1 = (tree, id) => {
  const isParent = checkIfParent(tree.items, id);

  if (isParent) {
    const newChildren = tree.items.filter( child => child.id !== id);
    delete tree.items;
    tree.items = newChildren;

    return true;
  } else {
    for (const node of tree.items) {
      const result = deleteNode1(node, id);
      if (result) {
        return result
      }
    }
  }
}

const deleteNode2 = (items, id) => {
  for (const node of items) {
    const isParent = checkIfParent(node.items, id);

    if (isParent) {
      const newChildren = node.items.filter( item => item.id !== id)
      delete node.items;
      node.items = newChildren

      return true
    } else {
      const result = deleteNode2(node.items, id);
      if (result) {
        return result;
      }
    }
  }
}

// deleteNode1(items[0], "cead21d9-daca-4ac4-874a-2d971a00ce0b")
// deleteNode2(items, "cead21d9-daca-4ac4-874a-2d971a00ce0b")
// console.log(JSON.stringify(items, null, 2));

/**
 *   ##### ADD NODE #####
 */

const addInOrder = (node, {name, isFolder}) => {
  const newNode = {
    id: Date.now(),
    path: `${node.path}/${name}`,
    name,
    isFolder,
    items: []
  }

  let index = node.items.findIndex( item => item.isFolder === isFolder && item.name.localeCompare(name) > 0)

  if (index < 0) {
    index = !isFolder
      ? node.items.length
      : node.items.findIndex( item => !item.isFolder)
  }

  const newChildren = [
    ...node.items.slice(0, index),
    newNode,
    ...node.items.slice(index)
  ]

  delete node.items;

  node.items = newChildren

  return newNode
}

const addNode1 = (tree, parentId, nodeData) => {
  if (tree.id === parentId) {
    return addInOrder(tree, nodeData)
  } else {
    for (const node of tree.items) {
      const result = addNode1(node, parentId, nodeData);
      if (result) {
        return result;
      }
    }
  }
}

const addNode2 = (items, parentId, nodeData) => {
  for (const node of items) {
    if (node.id === parentId) {
      return addInOrder(node, nodeData);
    } else {
      const result = addNode2(node.items, parentId, nodeData)
      if (result) {
        return result
      }
    }
  }
}

// addNode1(items[0], "cead21d9-daca-4ac4-874a-2d971a00ce0b", {name: "john.ts", isFolder: false})
// addNode2(items, "cead21d9-daca-4ac4-874a-2d971a00ce0b", {name: "john.ts", isFolder: false})
// console.log(JSON.stringify(items, null, 2));
