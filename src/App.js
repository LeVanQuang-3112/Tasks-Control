import './App.css';
import React from "react"
import TaskForm from "./components/TaskForm"
import Control from "./components/TaskControl"
import TaskList from "./components/TaskList"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: "",
        status: -1
      },
    }
  }

  componentDidMount(){
    if(localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks'))
      this.setState({
        tasks: tasks
      });
    }
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  generateID() {
    return this.s4() + this.s4() + this.s4() + this.s4() + "-" + this.s4() + this.s4() ;
  }

  onToggleForm =() => {
    this.setState({
      isDisplayForm : true
    })
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm : false
    })
  }

  onSubmit = (data) => { 
    var {tasks} = this.state
    if(data.id === "") {
      // add work
      data.id = this.generateID()
      tasks.push(data)
    }
    else {
      // edit work
      var index = this.findIndex(data.id)
      tasks[index] = data
    }
    this.setState({
      tasks: tasks,
      taskEditing: null
    })
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }



  onUpdateStatus = (id) => {  // id là đối số của this.props.task.id trong taskitem.js
    var {tasks} = this.state
    var index = this.findIndex(id)
    if(index !== -1)  {
      tasks[index].status = !tasks[index].status
      this.setState({
        tasks: tasks,
      })
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }

  }

  findIndex = (id) => {
    var {tasks} = this.state
    var result = -1
    tasks.forEach((task, index) => {
      if(task.id === id) {
        result = index
      }
    })
    return result;
  }

  onDelete = (id) => {
    var {tasks} = this.state
    var index = this.findIndex(id)
    if(index !== -1)  {
      tasks.splice(index, 1)
      this.setState({
        tasks: tasks,
      })
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }
    this.onCloseForm()
  }

  onUpdateItem = (id) => {
    var index = this.findIndex(id)
      this.onToggleForm()
      var {tasks} = this.state
      var index = this.findIndex(id)
      var taskEditing = tasks[index]
      this.setState({
         taskEditing : taskEditing,
         isDisplayForm: true
      })
    }

    onFilterName = (filterName, filterStatus) => {
      filterStatus = parseInt(filterStatus, 10)
      this.setState({
          filter:  {
            name: filterName.toLowerCase(),
            status: filterStatus
          }
      })
    }

    onSearch = (keyword) => {
      this.setState({
        keyword: keyword,
      })
    }
    
    render() {
  
    var {tasks,isDisplayForm, taskEditing, filter, keyword} = this.state
    
    if(filter) {
    if(filter.name) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(filter.name) !== -1
      })
    }

    tasks = tasks.filter((task) => {
        if(filter.status === -1) {
          return task;
        }
        else {
          return task.status === (filter.status === 1 ? true : false)
        }
      })
    }

    if(keyword) {
      tasks = tasks.filter((task) => { 
        return task.name.toLowerCase().indexOf(this.state.keyword) !== -1
      })
    }

    var elmTaskForm = isDisplayForm ? <TaskForm 
          onSubmit = {this.onSubmit}
          onCloseForm = {this.onCloseForm}
          taskEditing={taskEditing}
                                                /> : "";


    return (
            <div className="container">
        <div className="text-center">
          <h1>Quan ly cong viec</h1>
        </div>
        <div className="row">
    <div className={isDisplayForm ? "col-4 col-sm-4 col-md-4 col-lg-4": ""}>
      {elmTaskForm}
    </div>
    <div className={isDisplayForm  ? "col-8 col-sm-8 col-md-8 col-lg-8" : "col-12 col-sm-12 col-md-12 col-lg-12"}>
      <button className="btn btn-primary" onClick={this.onToggleForm}>
        <i className="fas fa-plus-circle"></i> &nbsp;
      Them cong viec</button> &nbsp;
      {/* <button className="btn btn-danger" onClick={this.onGenerateData}>Generate Data</button> */}

       <Control onSearch = {this.onSearch}/>
       <div className="row mt-15">
       <div className="col-12 col-sm-12 col-md-12 col-lg-12">
         <TaskList tasks={tasks} 
         onUpdateStatus={this.onUpdateStatus}
         onDelete={this.onDelete}
         onUpdateItem={this.onUpdateItem}
         onChange={this.onChange}
         onFilterName={this.onFilterName}/>
      </div>
       </div>
      
    </div>
  </div>
</div>

 
    )
  }
}

export default App;
