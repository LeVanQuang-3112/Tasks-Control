import React from "react";
import Search from "./TaskSearchControl"
import Sort from "./TaskSortControl"

class Control extends React.Component {
  render() {
    return (
       <div className="row mt-15">
          {/* search */}
          <Search onSearch={this.props.onSearch} />
          {/* Sort */}
          <Sort/>
        
       </div>
    )
  }
}

export default Control;