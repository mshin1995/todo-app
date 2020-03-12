import React from 'react';
import ListTasks from './ListTasks'

class List extends React.Component {
    constructor() {
        super()
        this.state={
            tasks:[],
            currentTask: {
                text:'',
                key: '',
                checked: false
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    componentWillMount = () => {
        this.fetchTasks()
    }

    fetchTasks = () => {
        fetch('/http://localhost:3001/all')
        .then(resp => resp.json())
        .then(data => this.setState({
            tasks: data
        }))
    }

    handleChange = (e) => {
        this.setState({
            currentTask: {
                text: e.target.value,
                key: Date.now(),
                checked: false
            }
        })
    }

    addTask = (e) => {
        e.preventDefault();
        let newTask = this.state.currentTask;
        if (newTask !== '') {
            this.setState({
                tasks: [...this.state.tasks, newTask],
            })
        }
        console.log(JSON.stringify({
            task: this.state.currentTask
        }))
        fetch('http://localhost:3001/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task: this.state.currentTask
            })
          })

    }

    deleteTask = (task) => {
        let tasks = this.state.tasks.slice();
        tasks.splice(task, 1);
        this.setState({
            tasks: tasks,
        });
    }

    complete = (key) => {
        let tasks = this.state.tasks.slice();
        tasks.forEach((task) => {
            if (task.key === key) {
                task.checked = !task.checked;
            }
        })
        this.setState({
            tasks: tasks
        })
    }

    changeStatus = key =>{
        const tempItems = this.state.items.slice()
    
        tempItems.forEach((item) => {
          if (item.key===key){
            item.completed = !item.completed;
          }
    
        })
        this.setState({
          items: tempItems,
        })
      } 

        

    render() {
        return (
            <div>
                <form onSubmit={this.addTask}>
                    <input type='text' placeholder='Enter Task' onChange={this.handleChange} />
                    <button type='submit'>Add</button>
                </form>
                <ListTasks tasks={this.state.tasks} complete={this.complete} delete={this.deleteTask} />
            </div>
        )
    }
}

export default List