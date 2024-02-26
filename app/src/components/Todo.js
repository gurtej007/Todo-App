import React, { useState, useEffect } from 'react';
import deleteicon from '../icons/delete.png';
import updateicon from '../icons/update.png';
import { useNavigate } from 'react-router-dom';

function Todo() {
    
   
   let navigate = useNavigate();
    const [TodoArray, setTodoArray] = useState([]);
    const [Msg, setMsg] = useState({ Todo: '' });
    const [editedTodoId, setEditedTodoId] = useState(null); 
    const [editedTodo, setEditedTodo] = useState('');
    //create
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await fetch("http://localhost:3400/Todos/create", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token':JSON.parse(localStorage.getItem('token'))
                },
                body: JSON.stringify({ Todo: Msg.Todo })
            });

            const res = await data.json();
            setTodoArray([...TodoArray, res]);
            setMsg({ Todo: '' });
        } catch (err) {
            console.error(err);
        }
    }
    //Delte
    const handleDelete = async (id) => {
        try {
            await fetch("http://localhost:3400/Todos/delete", {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token':JSON.parse(localStorage.getItem('token'))
                },
                body: JSON.stringify({ id: id })
            });
            const updated = TodoArray.filter(note => note._id !== id);
            setTodoArray(updated);
        } catch (err) {
            console.error(err);
        }
    }
    //update
    const handleUpdate = async (id, updatedTodo) => {
        try {
            const data = await fetch("http://localhost:3400/Todos/update", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token':JSON.parse(localStorage.getItem('token'))
                },
                body: JSON.stringify({ id: id, Todo: updatedTodo })
            });

            if (!data.ok) {
                throw new Error('Failed to update todo');
            }

            const res = await data.json();

            setTodoArray(prev => prev.map(note => {
                if (note._id === id) {
                    return { ...note, Todo: res.Todo };
                }
                return note;
            }));

            setEditedTodoId(null); // Reset editedTodoId after update
            setEditedTodo('')
        } catch (err) {
            console.error(err);
        }
    }

    const onChange = (e) => {
        setMsg({ ...Msg, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        
        const fetchdata = async () => {
            
            const token=JSON.parse(localStorage.getItem('token'));
            if(!token){
               
                navigate('/Login');
                return ;
            }
            try{
                const response = await fetch("http://localhost:3400/Todos/todo", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token':JSON.parse(localStorage.getItem('token'))
                    }
                });
                const data = await response.json();
                setTodoArray(data);
                
            }
            catch(err){
                console.log(err);
            }
           
        }
        fetchdata();
        
    }, );
   
    return (
        <div className="my-3">
            <span className='mx-5'>
                <input type="text" placeholder="Enter a Task" name="Todo" value={Msg.Todo} onChange={onChange} />
                {' '}
                <button onClick={handleSubmit} disabled={Msg.Todo.length === 0}>Save</button>
            </span>
            <div className="d-flex justify-content-center my-2"><h2>Todo's</h2></div>
            <div className="container">
                <div className="row">
                    {TodoArray && TodoArray.map((note) => (
                        <div key={note._id} className="col-md-4 my-1">
                            <span>
                                {editedTodoId === note._id ? (
                                    <>
                                        <input
                                            type="text"
                                            name="Todo"
                                            value={editedTodo}
                                            onChange={(e) => setEditedTodo(e.target.value)}
                                        />
                                        <button onClick={() => handleUpdate(note._id, editedTodo)}>Save</button>
                                    </>
                                ) : (
                                    <div>
                                        <span>{note.Todo}</span>
                                        <img
                                            src={deleteicon}
                                            alt="delete"
                                            onClick={() => handleDelete(note._id)}
                                            style={{ cursor: "pointer" }}
                                        />
                                        <img
                                            src={updateicon}
                                            alt="update"
                                            onClick={() =>{ 
                                                setEditedTodoId(note._id)
                                                setEditedTodo(note.Todo)
                                                
                                            }}// Set the ID of the todo being edited
                                            style={{ cursor: "pointer" }}
                                        />
                                    </div>
                                )}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Todo;
