import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    editing:false
    }
  }
  componentWillMount() {
    this.style = {
      right: this.randomBetween(0, window.innerWidth - 15, "px"),
      top: this.randomBetween(0, window.innerHeight - 15, "px"),
    }
  }
  randomBetween = (x, y, s) => {
    return (x + Math.ceil(Math.random() * (y-x)) + s)
  }
  edit = () => {
    this.setState({editing:true})
  }

  save = () => {
    this.props.onChange(this.refs.newText.value, this.props.id)
    this.setState({editing:false})
  }

  remove = () => {
    this.props.onRemove(this.props.id)
  }

  renderForm() {
    return (
      <div className="note"
      style={this.style}>
        <textarea ref="newText"></textarea>
        <button onClick={this.save}>SAVE</button>
      </div>
    );
  }
  renderDisplay() {
    return (
      <div className="note"
      style={this.style}>
        <p>{this.props.children}</p>
        <span>
        <button onClick={this.edit}>EDIT</button>
        <button onClick={this.remove}>X</button>
        </span>
      </div>
    );
  }
  render() {
    return (this.state.editing) ? this.renderForm() : this.renderDisplay()
  }
}

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
    notes:[]
    }
  }
  nextId = () => {
    this.uniqueId = this.uniqueId || 0
    return this.uniqueId++
  }
  add = (text) => {
    var notes = [
      ...this.state.notes,
      {
        id:this.nextId(),
        note:text
      }
    ]
    this.setState({notes})
  }

  update = (newText, id) => {
    var notes = this.state.notes.map(
      note => (note.id !== id) ?
      note:
      {
        ...note,
        note: newText
      }
    )
    this.setState({notes})
  }
  remove = (id) => {
    var notes = this.state.notes.filter(note => note.id !== id)
    this.setState({notes})
  }
  eachNote = (note) => {
    return (
      <App key={note.id}
            id={note.id}
            onChange={this.update}
            onRemove={this.remove}>
            {note.note}
      </App>
    )
  }
  render() {
    return (
        <div className="board">
        {this.state.notes.map(this.eachNote)}
        <button onClick={() => this.add('new note')}>+</button>
        </div>
    )
  }
}

Board.propTypes = {
  count: PropTypes.number
}


// customProp: function(props, propName, componentName) {
//     if (props[propName] > 100) {
//       return new Error(
//         'Invalid prop ' + props[propName] + 'too many'
//       );
//     }
//   }
export default Board;
