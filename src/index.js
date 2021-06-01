import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';





class Name extends React.Component {
   constructor(props){
      super(props);
      this.state = {
        c : ""
      }

  }
 handleClick(i){
  if(i === 0)
  {
    this.setState ({
      c : "blue"
    })
  }
  if(i === 1)
  {
    this.setState ({
      c : "red"
    })
  }
  if(i === 2)
  {
    this.setState ({
      c : "green"
    })
  }
 }
  render() {
    return (
      <div>
        <h1 style={{color:this.state.c}}>Henry Saver</h1> 
        <button onClick={() => this.handleClick(0)}>Blue</button>
        <button onClick={() => this.handleClick(1)}>Red</button>
        <button onClick={() => this.handleClick(2)}>Green</button>
      </div>
    );
  }
}

class Backg extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      c : ""
    }
  }
  colorHandler(i){
    this.setState({
      c : i
    })
  }
  render() {
    //alert(this.state.c)
    return (
        <div>
          <h1 style={{color:this.state.c}}>Hex Color Picker!</h1>
          <input type="text" id="col_hex" placeholder="Input a hex value"></input>
          <button value="Submit Color" onClick={() => this.colorHandler(document.getElementById("col_hex").value)}>Submit a Color in Hex</button>
        </div>
    );
  }
}
// The below code is part of the official REACT tutorial. Some is modified / my own additions
class Square extends React.Component {
    render() {
      return (
        <button className="square" onClick={() => this.props.onClick()}>
          {this.props.value}
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
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
          xNext: true,
        };
      }
    handleClick(i){
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if(calculateWinner(squares) || squares[i])
        {
            return;
        }
        squares[i] = this.state.xNext ? 'X' : 'O';
        this.setState({
        history: history.concat([{
            squares: squares,
        }]),
        xNext:!this.state.xNext,
        })
    }
    handleBtn(){
        this.setState({
            history: [{
              squares: Array(9).fill(null),
            }],
            xNext: true,
          })
    }
    // Ywins = 0;
    // Xwins = 0;
    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);
        let status;
        if (winner) 
        {
            status = 'Winner: ' + winner;
            // if(winner === 'X'){
            //   var w = 
            //   // this.setState({
            //   //   Xwins: w
            //   // })
            // }
        } 
        else 
        {
            status = 'Next player: ' + (this.state.xNext ? 'X' : 'O');
        }
      return (
      <div className='container'>
        <Name></Name>
        <div className="game">
          <div className="game-board">
            <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>
          </div>
          <div className="game-info">
            <div>{status}</div>
                <button onClick={() => this.handleBtn()}>Restart</button>
          </div>
        </div>
        <Backg />
      </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root'),
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
        return squares[a];
      }
    }
    return null;
  }
  //End of tic-tac-toe Tutorial js