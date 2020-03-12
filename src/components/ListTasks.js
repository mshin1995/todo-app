import React from 'react';

function ListTasks(props) {

    let listTasks = props.tasks.map(task => {
        return(
            <p key={task.key}>
                <input type='checkbox' checked={task.checked} onChange={() => props.complete(task.key)} />
                {task.text}
                <button type='submit' onClick={props.delete}>Delete</button>
            </p>
            
         )
    })
    
    return(
        <div>
            {listTasks}
        </div>
    )
}

export default ListTasks