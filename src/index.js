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
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
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
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    // Get the game history...
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // Get the last entry....
    const current = history[history.length - 1];
    // call .slice() to copy the squares array instead of mutating the existing array
    const squares = current.squares.slice();
    // Don't do anything if there is already a winner or the square has a value aleady
    if (calculateWinner(squares) || squares[i]) { return; }
    // Set value within squares Array
    squares[i] = this.setSquareValue();
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  setSquareValue() {
    return this.state.xIsNext ? 'X' : 'O';
  }

  jumpTo(step) {
    this.setState({ stepNumber: step, xIsNext: (step % 2) === 0 });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? `${getOrdinal(move)} move` : 'Game Start';
      return (
        <span key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </span>
      );
    })

    let status = winner ? `Winner: ${winner}` : `Next Player: ${this.setSquareValue()}`;

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>Go To:</div>
          <div>{moves}</div>
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
// Helpers

function getOrdinal(num) {
  var s = ['th','st','nd','rd'],
  v = num % 100;
  return num + (s[(v - 20) % 10] || s[v] || s[0]);
 }

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
