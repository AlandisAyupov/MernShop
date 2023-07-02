import { useState } from 'react'
import { useItemsContext } from '../hooks/useItemsContext'

const ItemForm = () => {
  const { dispatch } = useItemsContext()

  const [title, setTitle] = useState('')
  const [count, setCount] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const item = {title, count, description}
    
    const response = await fetch('/api/items', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setTitle('')
      setCount('')
      setDescription('')
      dispatch({type: 'CREATE_ITEM', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Item</h3>

      <label>Item Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Count:</label>
      <input 
        type="number" 
        onChange={(e) => setCount(e.target.value)} 
        value={count}
        className={emptyFields.includes('count') ? 'error' : ''}
      />

      <label>Description:</label>
      <input 
        type="text" 
        onChange={(e) => setDescription(e.target.value)} 
        value={description}
        className={emptyFields.includes('description') ? 'error' : ''}
      />

      <button>Add Item</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default ItemForm