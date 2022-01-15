import React from "react";


class TaskItem extends React.Component {

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id); //có thể thay id bằng name, status, ,...
    }
    onDelete = () => {
        this.props.onDelete(this.props.task.id);
    }
    onUpdateItem = () => {
        this.props.onUpdateItem(this.props.task.id)
    }
  render() {
      var {task, index} = this.props
    return (
          <tr>
            <td>{index + 1}</td>
            <td>{task.name}</td>
            <td className="text-center">
              <span className={task.status === true ? "label label-success" : "label label-danger"}
              onClick={this.onUpdateStatus}>
                  {task.status===true ? "Kich hoat" : "An"}
              </span>
            </td>
            <td className="text-center">
              <button className="btn btn-warning" onClick={this.onUpdateItem}>
                <i className="fa fa-pencil" /> Sua
              </button> &nbsp;
              <button className="btn btn-warning" onClick={this.onDelete}>
              <i className="far fa-trash-alt"></i> Xoa
              </button>
            </td>
          </tr>
    );
  }
}

export default TaskItem;