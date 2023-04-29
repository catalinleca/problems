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

// sortAll2(items);

/**
 *   ##### FlATTEN TREE #####
 */
const flattenTree1 = (items, parentId, obj = {}) => {
  for(const node of items) {
    const childIds = node.items.map(({id}) => id)

    obj[node.id] = {
      id: node.id,
      parentId: parentId,
      name: node.name,
      path: node.path,
      isFolder: node.isFolder,
      childIds: childIds
    }

    flattenTree1(node.items, node.id, obj)
  }

  return obj;
}

const flattenTree2 = (items) => {
  const obj = {};

  const worker = (items, parentId) => {
    for(const node of items) {
      const childIds = node.items.map(({id}) => id)

      obj[node.id] = {
        id: node.id,
        parentId: parentId,
        name: node.name,
        path: node.path,
        isFolder: node.isFolder,
        childIds: childIds
      }

      worker(node.items, node.id)
    }

    return obj;
  }

  worker(items)

  return obj;
}


// const obj = flattenTree1(items);
const obj = flattenTree2(items);

/**
 *   ##### ADD NODE #####
 */

const addItem = (items, parentId, nodeData) => {

}

console.log(obj);
