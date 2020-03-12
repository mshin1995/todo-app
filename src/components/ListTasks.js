import React from 'react';

function ListTasks(props) {

    let listTasks = props.tasks.map(task => {
        return(
            <div className='text-container'>
                <p className='task-text' key={task.key}>
                    <input type='checkbox' checked={task.checked} onChange={() => props.complete(task.key)} />
                    {task.text}
                    <button className='delete-button' type='submit' onClick={props.delete}>Delete</button>
                </p>
            </div>
            
         )
    })
    
    return(
        <div>
            {listTasks}
        </div>
    )
}

export default ListTasks