import React from "react";
import TaskItem from "./TaskItem";


class TaskList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filterName: "",
      filterStatus: true,
    }
  }

  onChange = (event) => {
    var target = event.target
    var value = target.value
    var name = target.name
    this.setState({
       [name]: value
    })
    this.props.onFilterName(
      name === "filterName" ? value : this.state.filterName,
      name === "filterStatus" ? value : this.state.filterStatus
    )
  }
  render() {
      var {tasks} = this.props
      var {filterName, filterStatus} = this.state

      var elmTasks = tasks.map((task, index) => {
          return <TaskItem index={index} key={task.id} task={task}
          onUpdateStatus={this.props.onUpdateStatus} 
          onDelete={this.props.onDelete}
          onUpdateItem = {this.props.onUpdateItem}
          
          />
      })
    return (
        <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th className="text-center">stt</th>
            <th className="text-center">ten</th>
            <th className="text-center">trang thai</th>
            <th className="text-center">hanh dong</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td />
            <td>
              <input type="text" className="form-control" name="filterName" value={filterName} onChange={this.onChange}/>
            </td>
            <td>
              <select name="filterStatus" className="form-control" value={filterStatus} onChange={this.onChange}>
                <option value="-1">Tat ca</option>
                <option value="0">An</option>
                <option value="1">Kich hoat</option>
              </select>
            </td>
            <td />
          </tr>
          
          {elmTasks}
        </tbody>
      </table>
    );
  }
}

export default TaskList;