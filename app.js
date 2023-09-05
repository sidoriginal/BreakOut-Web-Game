const grid=document.querySelector(".grid");
const blockWidth=100
const blockHeight=20
const boardWidth=560
const ballDiameter=20
const boardHeight=300
const scoreDisplay=document.querySelector("#score")
let timerId
let xD=2
let yD=2
let score=0

const userStart=[230,10]
let currentPosition= userStart

const ballStart=[270,40]
let ballCurrentPosition= ballStart
//drawing blocks
class Block{
    constructor(xAxis,yAxis){
        this.bottomLeft=[xAxis,yAxis]
        this.bottomRight=[xAxis+blockWidth,yAxis]
        this.topLeft=[xAxis,yAxis+blockHeight]
        this.topRight=[xAxis+blockWidth,yAxis+blockHeight]
    }
}

const blocks=[
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
]

function addBlocks(){

    for(let i=0;i<blocks.length;i++){
        const block=document.createElement("div")
        block.classList.add("block")
        block.style.left=blocks[i].bottomLeft[0]+'px'
        block.style.bottom=blocks[i].bottomLeft[1]+'px'
        grid.appendChild(block)
    }
}

addBlocks()

//adding user
const user=document.createElement("div")
user.classList.add("user")
drawUser()
grid.appendChild(user)

function drawUser(){
    user.style.left=currentPosition[0] + "px"
    user.style.bottom=currentPosition[1] + "px"
}



//moving user

function moverUser(e){
    switch(e.key){
        case "ArrowLeft":
            if(currentPosition[0] > 0){
            currentPosition[0]-=10
            drawUser()
            }
            break
        case "ArrowRight":
            if(currentPosition[0] < boardWidth-blockWidth){
            currentPosition[0]+=10
            drawUser()
            }
            break
    }
}

document.addEventListener("keydown", moverUser)


//adding ball
const ball=document.createElement("div")
ball.classList.add("ball")
drawBall()
grid.appendChild(ball)


function drawBall(){
    ball.style.left=ballCurrentPosition[0] + "px"
    ball.style.bottom=ballCurrentPosition[1] + "px"
}

//moving ball
function moveBall() {
    ballCurrentPosition[0]+= xD
    ballCurrentPosition[1]+= yD
    drawBall()
    checkForCollisions()
}

timerId=setInterval(moveBall, 30)

//checking for collisions
function checkForCollisions(){
    //block collision
    for(let i=0;i<blocks.length;i++){
        if(
            (ballCurrentPosition[0]>blocks[i].bottomLeft[0] && ballCurrentPosition[0]<blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1]+ballDiameter)>blocks[i].bottomLeft[1]&&ballCurrentPosition[1]<blocks[i].topLeft[1])
        ){
            const allBlocks = Array.from(document.querySelectorAll(".block"));
            allBlocks[i].classList.remove("block");
            blocks.splice(i,1)
            changeDirection()
            score++
            scoreDisplay.innerHTML=score

            //check win
            if(blocks.length==0){
                scoreDisplay.innerHTML="YOU WIN"
                clearInterval(timerId)
                document.removeEventListener("keydown", moverUser)
            }
        }
    }

    //user collision
    if(
        (ballCurrentPosition[0]>currentPosition[0]&& ballCurrentPosition[0]<currentPosition[0]+blockWidth)&&
        (ballCurrentPosition[1]>currentPosition[1]&& ballCurrentPosition[1]<currentPosition[1]+blockHeight)
    ){
        changeDirection()
    }

    //wall collision
    if(
        ballCurrentPosition[0]>=(boardWidth-ballDiameter)||
        ballCurrentPosition[1]>=(boardHeight-ballDiameter)||
        ballCurrentPosition[0]<=0
       ){
        changeDirection()
    }
    //game over
    if(ballCurrentPosition[1]<=0){
        clearInterval(timerId)
        scoreDisplay.innerHTML='YOU LOSE'
        document.removeEventListener("keydown", moverUser)
    }
}

function changeDirection(){
    if (xD === 2 && yD === 2){
        yD=-2
        return
    }
    if (xD === 2 && yD === -2){
        xD=-2
        return
    }
    if (xD === -2 && yD === -2){
        yD=2
        return
    }
    if (xD === -2 && yD === 2){
        xD=2
        return
    }
}
