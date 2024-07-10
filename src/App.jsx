import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [count, setCount] = useState(0)
  const [Todo, setTodo] = useState('');
  const [Todos, setTodos] = useState([]);
  const [showRemain, setshowRemain] = useState(false)
  const [buttonText, setbuttonText] = useState('Show Remaining Todos')

  // const saveToLS = () => {
  //   localStorage.setItem("Todos", JSON.stringify(Todos))

  // }

  // useEffect(() => {
  //   let stringLength = localStorage.getItem("Todos")
  //   if (stringLength) {
  //     let todos = JSON.parse(stringLength);
  //     setTodos(todos)
  //   }

  // }, [])


  const handleChange = (e) => {
    setTodo(e.target.value)

  }

  const handleAdd = () => {
    setTodos([...Todos, { Todo, isCompleted: false, id: uuidv4() }])
    setTodo('')
    // saveToLS()

  }

  const handleEdit = (e, id) => {
    let index = Todos.findIndex(item => {
      return item.id === id;

    })
    setTodo(Todos[index].Todo);
    let newTodos = Todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos)
    // saveToLS()

  }
  const handleDelete = (e, id) => {
    let newTodos = Todos.filter(item => {
      return item.id !== id;
    })

    setTodos(newTodos)

    // saveToLS()

  }
  const handleChecked = (e, id) => {
    let index = Todos.findIndex(item => {
      return item.id === id;

    })
    let newTodos = [...Todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    // saveToLS()
  }

  const handleShowRemain = () => {

    setshowRemain(!showRemain)
    if (!showRemain) {
      setbuttonText('Show All Todos')
    }
    else if (showRemain) {
      setbuttonText('Show Remaining Todos')
    }
  }

  




  return (
    <>
      <Navbar />
      <div className="md:w-1/2 w-full mx-auto h-[80vh] bg-orange-200 border-4 rounded-lg my-8 border-blue-500 ">
        <div className='flex justify-center gap-1'>

          <input type="text" value={Todo} onChange={handleChange} className='w-2/3 py-2 m-2 rounded-md' />
          <button onClick={handleAdd} disabled={Todo.length < 3} className=' hover:bg-orange-900 border h-[90%] my-auto px-2 py-1 rounded-md bg-orange-700 text-white font-bold disabled:bg-orange-500'>Save</button>
        </div>
        <p className='text-xl font-semibold text-center'>Your Todos</p>
        <button onClick={handleShowRemain} className='hover:bg-orange-900 border my-auto px-2 py-1 rounded-md bg-orange-700 text-white text-sm font-bold'>{buttonText}</button>

        {Todos.map(item => {
          if (showRemain == false) {

            return (
              <div key={item.id} className='mainContainer flex justify-between my-7 px-2 border-1 border-black'>
                <div className='flex gap-3'>

                  <input type="checkbox" onChange={(e) => { handleChecked(e, item.id) }} checked={item.isCompleted} />
                  <div className={!item.isCompleted ? '' : "line-through"}>{item.Todo}</div>
                </div>
                <div className="buttons flex gap-1">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='hover:bg-orange-900 border my-auto px-2 py-1 rounded-md bg-orange-700 text-white font-bold'>Edit</button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='hover:bg-orange-900 border my-auto px-2 py-1 rounded-md bg-orange-700 text-white font-bold'>Delete</button>
                </div>
              </div>

            )
          }
          else if (showRemain == true && item.isCompleted == false) {

            return (
              <div key={item.id} className='mainContainer flex justify-between my-7 px-2 border-1 border-black'>
                <div className='flex gap-3'>
                  <input type="checkbox" onChange={(e) => { handleChecked(e, item.id) }} checked={item.isCompleted} />
                  <div>{item.Todo}</div>
                </div>
                <div className="buttons flex gap-1">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='hover:bg-orange-900 border my-auto px-2 py-1 rounded-md bg-orange-700 text-white font-bold'>Edit</button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='hover:bg-orange-900 border my-auto px-2 py-1 rounded-md bg-orange-700 text-white font-bold'>Delete</button>
                </div>
              </div>
            )
          }

        })}
      </div>
    </>
  )
}

export default App
