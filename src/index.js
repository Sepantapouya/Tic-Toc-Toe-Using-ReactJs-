import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'
var WINNER=new Array(3);
let END = 0;


function Square(props) {


  return (
    <div className='d-inline' onClick={props.onClick}>
      <div className='d-inline'  >
        <button className="square"
        
          style={
            ( props.end === 1 && (props.Key === WINNER[0] ||
              props.Key === WINNER[1] || 
              props.Key === WINNER[2])) ? {background :'RGBA(17,255,156,0.4)' }  :{}
              

              &&

            (props.end === 1 && ( props.Key !== WINNER[0] ||
              props.Key !== WINNER[1] || 
              props.Key !== WINNER[2]))
              ? {backgroundColor:'rgb(251, 185, 113)' } : {}

              &&
            (props.Key === WINNER[0] ||
            props.Key === WINNER[1] || 
            props.Key === WINNER[2]) ? {background :'RGBA(17,255,156,0.4)' } :{} 
      
           }
  
  
           >                                    
          <div >
            
            <span style={(props.value === "X")?{}:{color:'red'}}>
            {props.value}
            </span>
          </div>                           
        </button >
    </div>
  </div>       
      
      
    );


}

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const Squares = this.state.squares.slice();
    if (calculateWinner(Squares) || Squares[i]) {
      return;
    }
    Squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: Squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)
        }
        Key = {i} 
        end= {END}
        
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    
    if (this.state.squares[0] != null &&
      this.state.squares[1] != null &&
      this.state.squares[2] != null &&
      this.state.squares[3] != null &&
      this.state.squares[4] != null &&
      this.state.squares[5] != null &&
      this.state.squares[6] != null &&
      this.state.squares[7] != null &&
      this.state.squares[8] != null) {
      END = 1;
    }
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if (END === 1) {

      status = "its a draw !"
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status   btn-info">{status}</div>
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
          <h5 className="mt-3 btn btn-lg btn-dark"> Created by Sepanta Pooya</h5>
          <h6  > learned in Reactjs.org</h6>

        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      WINNER[0]=a;
      WINNER[1]=b;
      WINNER[2]=c;
      return squares[a];
      
      
    }
  }
  return null;
}
