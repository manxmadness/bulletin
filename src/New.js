import React, { Component } from 'react';

class New extends Component {
  constructor(props) {
    super(props)
    this.state = {
      aptBodyVisible: false
    }
  }

  showForm = () => {
    this.setState({aptBodyVisible: !this.state.aptBodyVisible})
  }

  render() {
    return (
      <div className="panel panel-primary" >
        <div className="panel-heading apt-addheading" onClick={this.showForm}>
        <span className="glyphicon glyphicon-plus"></span> Add Appointment</div>
        <div className="panel-body" style = {this.state.aptBodyVisible ? {display:'block'} : {display:'none'}}>
          <form className="add-appointment form-horizontal">
            <div className="form-group">
              <label className="col-sm-2 control-label" htmlFor="petName">Pet Name</label>
              <div className="col-sm-10">
                <input type="text" className="form-control"
                  id="petName" ref="inputPetName" placeholder="Pet's Name"/>
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label" htmlFor="petOwner">Pet Owner</label>
              <div className="col-sm-10">
                <input type="text" className="form-control"
                  id="petOwner" ref="inputOwnerName" placeholder="Owner's Name"/>
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label" htmlFor="aptDate">Date</label>
              <div className="col-sm-4">
                <input type="date" className="form-control"
                  id="aptDate" ref="inputAptDate"/>
              </div>
              <label className="col-sm-2 control-label" htmlFor="aptTime">Time</label>
              <div className="col-sm-4">
                <input type="time" className="form-control"
                  id="aptTime" ref="inputAptTime"/>
              </div>

            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label" htmlFor="aptNotes">Apt. Notes</label>
              <div className="col-sm-10">
                <textarea className="form-control" rows="4" cols="50"
                  id="aptNotes" ref="inputAptNotes" placeholder="Appointment Notes"></textarea>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-primary pull-right">Add Appointment</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default New;
