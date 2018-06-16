import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    }
  }

  renderSquare(i) {
    return (
      <Square value={this.state.squares[i]}
            onClick={() => this.handleClick(i)} />
          );
  }

  handleClick(i) {
    // call .slice() to copy the squares array instead of mutating the existing array
    const squares = this.state.squares.slice();
    // Don't do anything if there is already a winner or the square has a value aleady
    if (calculateWinner(squares) || squares[i]) { return; }
    // Set value within squares Array
    squares[i] = this.setSquareValue();
    this.setState({squares: squares, xIsNext: !this.state.xIsNext});
  }

  setSquareValue() {
    return this.state.xIsNext ? 'X' : 'O';
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status = winner ? `Winner: ${winner}` : `Next Player: ${this.setSquareValue()}`;

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const winningLines = [
    [0, 1, 2], // Top Horz
    [3, 4, 5], // Middle Horz
    [6, 7, 8], // Bottom Horz
    [0, 3, 6], // Left Vert
    [1, 4, 7], // Middle Vert
    [2, 5, 8], // Right Vert
    [0, 4, 8], // Top Left Bottom Right Diag
    [2, 4, 6], // Top Right Bottom Left Diag
  ];
  // Loop through each array and determine if there is a winner
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // Return the winner's marker (X or O)
      return squares[a];
    }
  }
  // If there are no winning lines...
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
