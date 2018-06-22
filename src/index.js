import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/game.js';
import './index.css';

export default function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
