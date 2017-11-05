import React, { Component } from 'react';
import logo from './logo.svg';
import PropTypes from 'prop-types';
import ReactDraggable from 'react-draggable';
import SearchInput, {createFilter} from 'react-search-input';
import './style.css';

class Note extends Component {
  componentWillMount() {
    var colors = ['#549477', '#14745f', '#6d6e71'];
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

const KEYS_TO_FILTERS = ['title', 'description','level', 'age']

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
    notes:[],
    searchTerm: '',
    aptBodyVisible: false
    }
    this.searchUpdated = this.searchUpdated.bind(this)
  }


  changeVisibility = () => {
      this.setState({aptBodyVisible: !this.state.aptBodyVisible})
  }
  nextId = () => {
    this.uniqueId = this.uniqueId || 0
    return this.uniqueId++
  }
  handleSearch = () => {

  }

  add = () => {
    var notes = [
      ...this.state.notes,
      {
        id:this.nextId(),
        title:this.refs.title.value,
        description:this.refs.description.value,
        date: this.refs.date.value,
        age: this.refs.age.value,
        level: this.refs.level.value,
        contact: this.refs.contact.value
      }
    ]
    this.refs.title.value=''
    this.refs.description.value=''
    this.refs.date.value=''
    this.refs.level.value='Child'
    this.refs.level.value='Recreational'
    this.refs.contact.value=''
    this.setState({notes})
    this.changeVisibility()
  }
  eachNote = (note) => {
    return (
      <Note key={note.id} id={note.id}>
      <div>{note.title}</div>
      <div>{note.description}</div>
      <div>{note.date}</div>
      <div>{note.age}</div>
      <div>{note.level}</div>
      <a href="">{note.contact}</a>
      </Note>
    )
  }
  render() {
    var notes = this.state.notes
    const filteredNotes = notes.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

    return (
      <div className="board">

      <div className="container-fluid">
      <div className="row justify-content-end align-items-center head">
        <img className="logo" src={logo} alt="logo" width="200"/>
        <form className="form-inline my-2 my-lg-0 search">
            <SearchInput placeholder="Filter" className="search-input" onChange={this.searchUpdated} />
        </form>
        <button className="btn btn-circle btn-lg btn-info" onClick={()=> this.changeVisibility()}><i className="fa fa-thumb-tack" aria-hidden="true"></i></button>
      </div>
      </div>
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
              <label htmlFor="exampleFormControlSelect1">Age group</label>
              <select className="form-control" id="exampleFormControlSelect1" ref="age">
                <option>Child</option>
                <option>Teen</option>
                <option>Adult</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect2">Level of play</label>
              <select className="form-control" id="exampleFormControlSelect2" ref="level">
                <option>Recreational</option>
                <option>Competitive</option>
              </select>
            </div>
            <div className="form-group">
            <label htmlFor="textInput2">Contact information</label>
            <input ref="contact" type="text" className="form-control" id="textInput2" aria-describedby="emailHelp" placeholder="Contact" />
            </div>
            <button className="btn btn-md btn-dark btn-block" onClick={()=> this.add()}>Add</button>
          </div>
        </div>
        <div className="notes">

          {filteredNotes.map(note => { return (
          <Note key={note.id} id={note.id}>
            <div>{note.title}</div>
            <div>{note.description}</div>
            <div>{note.date}</div>
            <div>{note.age}</div>
            <div>{note.level}</div>
            <a href="">{note.contact}</a>
          </Note>
          ) })}
        </div>
      </div>
    )
  }
  searchUpdated (term) {
    this.setState({searchTerm: term})
  }
}

Board.propTypes = {
  count: PropTypes.number
}

export default Board;
