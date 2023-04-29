import {useRef, useState, useMemo} from "react";


const TreeItem = ({id, items, handleInsertNode, handleDeleteNode, handleRenameNode}) => {
  const inputRef = useRef();
  const renameInputRef = useRef();
  const [expand, setExpand] = useState(false);
  const [showOptions, setShowOptions] = useState(false)

  const item = items[id];

  const toggleExpand = () => {
    setExpand(prevState => !prevState)
  }
  const toggleOptions = () => {
    setShowOptions(prevState => !prevState)
  }

  const handleNew = (e, isFolder) => {
    const name = inputRef.current.value
    handleInsertNode(id, name, isFolder)
  }

  const handleRename = (id) => {
    const name = renameInputRef.current.value;
    handleRenameNode(id, name)
  }

  if (!item.isFolder) {
    return (
      <div style={{ display: 'flex'}}>
        <span style={{ paddingLeft: '15px' }}>
            {item.name}
        </span>
        <button className="menu-button" onClick={toggleOptions}> + </button>
        {
          showOptions && (
            <div>
              <button className="menu-button" onClick={(e) => handleDeleteNode(item.id)}> &#128465; </button>
              <input  className="menu-button" type="text" ref={(node) => renameInputRef.current = node}/>
              <button className="menu-button" onClick={(e) => handleRename(item.id)}>Rename</button>
            </div>
          )
        }
      </div>
    )
  } else {
    return (
      <div style={{ paddingLeft: '15px' }}>
        <div style={{ display: 'flex'}}>
          <div onClick={toggleExpand} style={{background: 'grey', cursor: "pointer", width: 'fit-content', marginRight: '10px'}}>
            {item.name}
          </div>
          <div style={{ display: 'flex' }}>
            <input type="text" ref={(node) => inputRef.current = node}/>
            <button className='menu-button' onClick={(e) => handleNew(e, true)}>Folder +</button>
            <button className='menu-button' onClick={(e) => handleNew(e, false)}>File +</button>

            <span>{` | `}</span>

            <button className="menu-button" onClick={toggleOptions}> + </button>
            {
              showOptions && (
                <div>
                  <button className="menu-button" onClick={(e) => handleDeleteNode(item.id)}> &#128465; </button>
                  <input  className="menu-button" type="text" ref={(node) => renameInputRef.current = node}/>
                  <button className="menu-button" onClick={(e) => handleRename(item.id)}>Rename</button>
                </div>
              )
            }
          </div>
        </div>
        {
          expand && item.items.map( childId => (
            <div key={childId}>
              <TreeItem
                id={childId}
                items={items}
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                handleRenameNode={handleRenameNode}
              />
            </div>
          ))
        }
      </div>
    )
  }
}

export const FlatItems = ({ items, handleInsertNode, handleDeleteNode, handleRenameNode }) => {
  const rootId = useMemo(() => Object.keys(items).find(id => !items[id].parentId), [])

  return (
    <div>
      <TreeItem
        id={rootId}
        items={items}
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleRenameNode={handleRenameNode}
      />
    </div>
  )

}
