# Snake Game In React 

## Description

Creating a snake game in react is extremely easy. I used react hooks to create function based components (You can also implement using class ) and done some CSS styling. 

## Getting Started

### Dependencies

* Make sure you have installed node js 
    Copy this command in your terminal to find node version
    ```
    node -v
    ```
* Install create react app package by 
    ```
    npm install -g create-react-app
    ```
    (or)
    ```
    sudo npm install -g create-react-app
    ```
* You can use your favourite text editor

### Creating React app 

* You can create new react app or just clone this repository 
    ```
    create-react-app snakegame
    ```

## Logic

The logic is very simple 
* Creating Board - You want to create a 2D Array in JS and use map method to create rows and cells. This array can take three possible values

[0] - Empty Cell
[1] - Snake Cell
[2] - Foode cell

* Creating food - Create a simple function using Math.randome to create a random array [x,y] indicating food position in 2D Array

* Creating snake - Create a sanke using array (var snake = [[x1,y1], [x1, y1-1]]). 

* Handling user input  - Create a keydown event listener and listen to key values and set an adder value representing row and column (var adder = [r,w] ) to be added at each interval and you can also create virtual keys for mobiles and do the same.

[ArrowUp] - [-1, 0] 
[ArrowDown] - [1, 0] 
[ArrowLeft] - [0, -1] 
[ArrowUp] - [0, 1]  

* setInterval - Create a setInterval. At each interval copy snake head in a temp variable (var temp = [x1,y1]) and right shift snake array and just add temp & adder and copy it to snake head
    snake[0] = [temp[0]+adder[0], temp[0]+adder[0]]

    Whenever the snake  position matches with the food postion (x === x1 && y === y1) just append [snake[snake.length-1][0]-adder[0],snake[snake.length-1][1]-adder[1]] in snake    array and call create random food method. Also increment the score by one

    We can check boundry condition if snake head [x1,y1] match this consiton (x1==0 || y1==0 || x1==board_size || y1 == board_size)

    We can also check if a snake byte itsef by if snake head [x1,y1] is present in the remaining array form 1 to snake.length 

    Now we want to update our 2D arry loop through snake array and set value as 1 at snake position and set value as 2 at food position.

* Using React Hooks - I use useState hook for snake board and for score so each time when you update it the UI get rendered        

## Authors

Contributors names and contact info

ex. Yughendaran P  
ex. [@Yughendaran](https://www.linkedin.com/in/yughendaran-palanivel-68a5a2211)
