import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDraggable from 'react-draggable';
import './style.css';

class Note extends Component {

  componentWillMount() {
    var colors = ['#FCBCB8', '#C7EAE4', '#A7E8BD', '#FFD972'];
    var random_color = colors[Math.floor(Math.random() * colors.length)];
    this.style = {
      right: this.randomBetween(0, window.innerWidth - 15, "px"),
      top: this.randomBetween(0, window.innerHeight - 15, "px"),
      background: random_color
    }
  }

  randomBetween = (x, y, s) => {
    return (x + Math.ceil(Math.random() * (y-x)) + s)
  }

  renderDisplay() {
    return (
      <div className="note"
      style={this.style}>
        <div>{this.props.children}</div>
        <span>

        </span>
      </div>
    );
  }
  render() {
    return (<ReactDraggable>
      {this.renderDisplay()}
      </ReactDraggable>
    )
  }
}

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
    notes:[],
    data: [],
    aptBodyVisible: false
    }
  }

  componentWillMount() {
    return fetch('./data.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data:responseJson.movies,
        })
        console.log(this.state.data)
      })
    }

  nextId = () => {
    this.uniqueId = this.uniqueId || 0
    return this.uniqueId++
  }
  changeVisibility = () => {
      this.setState({aptBodyVisible: !this.state.aptBodyVisible})
  }
  add = (text) => {
    var notes = [
      ...this.state.notes,
      {
        id:this.nextId(),
        title:this.refs.title.value,
        description:this.refs.description.value,
        date: this.refs.date.value,
        level: this.refs.level.value
      }
    ]
    this.setState({notes})
    this.changeVisibility()
  }


  remove = (id) => {
    var notes = this.state.notes.filter(note => note.id !== id)
    this.setState({notes})
  }
  eachNote = (note) => {
    return (
      <Note key={note.id} id={note.id}>
      <div>{note.title}</div>
      <div>{note.description}</div>
      <div>{note.date}</div>
      <div>{note.level}</div>
      </Note>
    )
  }

  render() {
    return (
      <div className="board">
      <form className="form-inline my-2 my-lg-0">
     <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
     <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
   </form>
        <button className="btn btn-circle btn-lg btn-info" onClick={()=> this.changeVisibility()}><i className="fa fa-thumb-tack" aria-hidden="true"></i></button>
        <div className="container popup rounded" style={ this.state.aptBodyVisible ? {display: 'block'} : {display: 'none'}}>
        <div className="x"><i onClick={()=> this.changeVisibility()} className="pull-right fa fa-times" aria-hidden="true"></i></div>
          <div className="inner-popup">
          <div className="form-group">
            <label htmlFor="textInput1">Activity</label>
            <input ref="title" type="text" className="form-control" id="textInput1" aria-describedby="emailHelp" placeholder="Enter activity name" />
          </div>
          <div className="form-group">
            <label htmlFor="textInput2">Description</label>
            <textarea ref="description" className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Enter description"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Start Date</label>
            <input type="date" className="form-control" id="aptDate" ref="date" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Level of play</label>
            <select className="form-control" id="exampleFormControlSelect1" ref="level">
          <option>Recreational</option>
          <option>Competitive</option>
        </select>
          </div>
          <button className="btn btn-md btn-dark btn-block" onClick={()=> this.add()}>Add</button>
        </div>
        </div>
        <div className="notes">
           {this.state.notes.map(this.eachNote)}
        </div>
      </div>
    )
  }
}

Board.propTypes = {
  count: PropTypes.number
}

export default Board;
