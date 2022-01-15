import React from "react";


class Sort extends React.Component {
  render() {
    return (
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
         <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" 
              id="dropdownMenuButton" data-toggle="dropdown" 
              aria-haspopup="true" aria-expanded="false">
                Sap xep
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="/#">Ten A-Z</a> &nbsp;
                <a className="dropdown-item" href="/#">Ten Z-A</a>
              </div>
          </div>
        </div>
    )
  }
}

export default Sort;