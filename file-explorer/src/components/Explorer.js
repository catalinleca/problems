import {useCallback, useRef, useState} from "react";


function Explorer({ handleInsertNode, explorer }) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false
  });

  const inputRef = useRef();

  const toggleExpand = () => {
    setExpand(prevState => !prevState)
  }

  const handleNew = (e, isFolder) => {
    const name = inputRef.current.value
    handleInsertNode(name, explorer.id, isFolder)
  }

  if (explorer.isFolder) {
    return (
      <li style={{
        paddingLeft: '15px'
      }}>
        <div style={{width: '600px'}}>
          <div onClick={toggleExpand} style={{background: 'grey', display: 'inline-block', marginRight: "10px"}}>{explorer.name}</div>
          <span style={{ width: '300px'}}>
              <input ref={(node) => {
                inputRef.current = node;
              }} type="text"/>
              <button onClick={(e) => handleNew(e, true)}>Folder +</button>
              <button onClick={(e) => handleNew(e, false)}>File +</button>
          </span>
        </div>
        {
          expand && explorer.items.map( (item) => (
            <div key={`${item.id}${item.name}`}>
              <Explorer
                explorer={item}
                handleInsertNode={handleInsertNode}
              />
            </div>
          ))
        }
      </li>
    )
  } else {
    return (
      <li>
        <span
          style={{
            paddingLeft: "10px"
          }}
        >{explorer.name}</span>
      </li>
    )
  }


}

export default Explorer;
