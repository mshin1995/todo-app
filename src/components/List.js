import React from 'react';

class List extends React.Component {
    constructor() {
        super()
        this.state={
            tasks:[],
            currentTask:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    

    handleChange = (e) => {
        this.setState({
            currentTask: e.target.value
        })
    }

    addTask = (e) => {
        e.preventDefault();
        let newTask = this.state.currentTask;
        if (newTask !== '') {
            this.setState({
                tasks: [...this.state.tasks, newTask],
                currentTask:''
            })
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.addTask}>
                    <input type='text' placeholder='Enter Task' onChange={this.handleChange} />
                    <button type='submit'>Add</button>
                </form>
            </div>
        )
    }
}

export default List