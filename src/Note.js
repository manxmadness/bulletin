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


export default ReactDraggable;
