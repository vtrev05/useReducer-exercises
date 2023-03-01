import React, { useReducer, useRef } from 'react'

const ListaTareas = () => {
    let inputRef = useRef()

    //no nos serviría en nuestro ejemplo el useId() ya que nos genera UN ÚNICO id, no es algo "dinámico".
    /* const taskId = useId() */



    //en este ejemplo estamos creando la función reducer directamente. Por eso, no recibimos el segundo parámetro de initialState sino que lo inicializamos directamente en state = [].
    const [tasks, dispatch] = useReducer((state = [], action) => {
      switch (action.type) {
        case 'add_task': {
          return [
            ...state, {
              title: action.title, id: state.length
            }
          ]
        }
        case 'remove_task': {
           return state.filter((task , index) => index != action.index) 
        }
      
        default: {
          return state
        }
      }
       
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: 'add_task',
            title: inputRef.current.value

        })

       inputRef.current.value = ''
        
    }




  return (
    <div>
      <h1>Lista de tareas</h1>
      <form onSubmit={handleSubmit}>
        <label>Tarea</label>
        <input type="text" name="title" ref={inputRef}/>
        <input type="submit" value="Enviar"/>
      </form>

      <div>
        {tasks && tasks.map((task, index) => (
          <div key={index}>
              <p>{task.title}</p>
              <button onClick={() => dispatch({type: 'remove_task', index})}>Borrar tarea</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListaTareas