import React from "react";


class TaskForm extends React.Component {
       constructor(props) {
         super(props);
         this.state = {
           name: "",
           status: true,
           id: "",
           isDisplayForm: false
         }
       }


  onCloseForm = () => {
    this.props.onCloseForm()
  }

  
  onChange = (event) => {
    var target = event.target
    var name = target.name
    var value = target.value
    if(value === "true" || value === "false") {
      value = target.value === "true" ? true : false
    }
    this.setState({
      [name]: value
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.onSubmit(this.state)
    this.onClear()
    this.onCloseForm()
  }

  onClear = () => {
    this.setState({
       name : "",
       status: true
    })
  }

  componentDidMount() {
    if(this.props.taskEditing) {
      this.setState({
        id: this.props.taskEditing.id,
        name: this.props.taskEditing.name,
        status: this.props.taskEditing.status
      })
    }
  }



  render() {

    return (
           <div>
             <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">{this.state.id === "" ? "Them cong viec" : "Cap nhat cong viec"}
            <i className="fa fa-times-circle text-right" onClick = {this.onCloseForm}/>
          </h3>
        </div>
      </div>
      <div className="panel-body">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Ten: </label>
            <input type="text" name="name" className="form-control" 
            value={this.state.name}
            onChange={this.onChange}/>
          </div>
          <select name="status" value={this.state.status} onChange={this.onChange}>
            <option value={true}>Kich hoat</option>
            <option value={false}>An</option>
          </select>
          <br />
          <div className="text-center">
            <button type="submit" className="btn btn-warning">
              Luu lai
            </button>
            <button type="button" className="btn btn-warning" onClick = {this.onClear}>Huy bo</button>
          </div>
        </form>
      </div>
           </div>
    );
  }
}

export default TaskForm;