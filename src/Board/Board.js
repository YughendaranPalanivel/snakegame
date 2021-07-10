import React, {useState, useEffect} from 'react';
import './Board.css';

const boardSize = [15, 15];
const refreshTime = 175;
var snake = [[5, 5]];
var food = [2,2];
var adder = [0, 1];
var count = 0;

const Board = () => {
    //React variables
    var [start, setStart] = useState(false);
    var [board, setBoard] = useState(new Array(boardSize[0]).fill(0).map(row => new Array(15).fill(boardSize[0])));
    var [sectionCard, setSectionCard] = useState(false);
    var [score, setScore] = useState(0);

    // Function
    // Handling restart request
    const handleRestart = () => {
        count = 0;
        setStart(!start);
        setScore(0);
        setSectionCard(false);
    }

    // Changind cell state to empty, snake and food
    const createCell = (snake) => {
        var temp = new Array(15).fill(boardSize[0]).map(row => new Array(boardSize[0]).fill(0));
        temp[food[0]][food[1]] = 2;
        for(var i = 0; i < snake.length; i++){
            temp[snake[i][0]][snake[i][1]] = 1;
        }
        setBoard(temp);
    }

    // Creating random food cell
    const randomCell = (food, snake, min, max) => {
        do{
            food[0] = Math.ceil(Math.random()*(max-1));
            food[1] = Math.ceil(Math.random()*(min-1));
        }while(snake.find(snakeCell => snakeCell[0] === food[0] && snakeCell[1] === food[1]))
    }
    
    // Setting adder value by using if-else block
    const setDirection = (direction) => {
        if (direction === 'ArrowUp'){
            adder = [-1, 0];
        }
        else if (direction === 'ArrowDown'){
            adder = [1, 0];
        }
        else if (direction === 'ArrowLeft'){
            adder = [0, -1];
        }
        else if (direction === 'ArrowRight'){
            adder = [0, 1];
        }
    }

    // Game logic 
    useEffect(()=>{

        // Reset values
        snake = [[5, 5]];
        food = [2,2];
        adder = [0, 1];

        window.addEventListener('keydown', (event)=>setDirection(event.key));

        const frame = setInterval(() => {
            var len = snake.length;
            for(var i = len-1; i > 0 ; i--){
                snake[i] = snake[i-1];
            }
            snake[0] = [snake[0][0]+adder[0], snake[0][1]+adder[1]];

            if(! (snake[0][0] === -1 || snake[0][1] === -1 || snake[0][0] === boardSize[0] || snake[0][1] === boardSize[1] )){
                createCell(snake);
                for(var j = 1; j < len; j++){
                    if(snake[0][0] === snake[j][0] && snake[0][1] === snake[j][1]){
                        clearInterval(frame);
                        setSectionCard(true);
                    }
                }
            }else{
                clearInterval(frame);
                setSectionCard(true);
            }
            if(snake[0][0] === food[0] &&  snake[0][1] === food[1]){
                setScore(++count);
                randomCell(food, snake, ...boardSize);
                snake = [...snake, [snake[len-1][0]-adder[0],snake[len-1][1]-adder[1]]]
            }
        }, refreshTime);

        return () =>{
            clearInterval(frame);
            window.removeEventListener("keydown", setDirection);
        }

    },[start])

    return(
        <React.Fragment>
        {/* Section card */}
        {sectionCard && 
            <div id="message">
                <div id="card">
                    <h1 className="card-heading">Score</h1>
                    <h2 className="card-value">{score}</h2>
                    <div className="restart button-space" onClick={handleRestart}></div>
                </div>
            </div>
        }
        {/* Display container */}
        <div id="display">
            <div id="score">
                <div id="apple-image"></div>
                <h3>{score}</h3>
            </div>
            <div className="restart" onClick={handleRestart}></div>
        </div>

        {/* Board */}
        <div id="board">
            {
                board.map((rowValue, rowIndex) =>{
                    return(<div key={rowIndex} className="row">
                        {rowValue.map((cellValue, cellIndex)=>{
                            return(<div key={cellIndex} className={`cell ${cellValue === 1 ? 'snake': cellValue === 2 ? 'food':''}`} ></div>)
                        })}
                    </div>)
                })
            }
        </div>
        {/* Controller */}
        <div id="controller">
                <div id="ArrowLeft" className="direction-button" onClick={()=>setDirection("ArrowLeft")}></div>
                <div id="ArrowUp" className="direction-button" onClick={()=>setDirection("ArrowUp")}></div>
                <div id="ArrowDown" className="direction-button" onClick={()=>setDirection("ArrowDown")}></div>
                <div id="ArrowRight" className="direction-button" onClick={()=>setDirection("ArrowRight")}></div>
        </div>
        {/* Info */}
        <div id="info">
            Controll movement by keyboard or virtual arrrows.
        </div>
        </React.Fragment>
    );
}

export default Board;