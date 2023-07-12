const socket = io();

console.log('Welcome to Tic Tac Toe');

// let music = new Audio("bg.mp3")
let move = new Audio("move.mp3")
let gameover = new Audio("game_over.mp3")

let game_over = false;
let turn = "X";
let playerMove = 1;

//function to change the turn
const changeTurn = ()=>{
    return turn === "X"?"0":"X";
}



socket.on("playersReady",()=>{
    console.log("players are ready");

    socket.on("playerMove",(id,turn1)=>{
        turn = turn1;
        document.getElementById(id).innerText = turn;
        turn = changeTurn();
        playerMove = 1;
        checkWin();
    })

    socket.on("doReset",(t)=>{
        gameReset();
    })

    
        console.log(playerMove);
        let boxes = document.getElementsByClassName("box");
        Array.from(boxes).forEach(element =>{
        let boxtext = element.querySelector(".boxtext");
        element.addEventListener("click",(e)=>{
            if(boxtext.innerText === ""){
                if(playerMove == 1){
                let id = boxtext.id;
                socket.emit("move",id,turn);
                boxtext.innerText = turn;
                turn = changeTurn();
                playerMove --;
                console.log(playerMove);
                move.play();
                checkWin();
                if(!game_over){
                    document.getElementsByClassName("info")[0].innerText = "Turn For "+ turn;
                }
            }
            }
        })
    })
    
    
    
    // }
    
})





// // Function to ckeck for win
const checkWin = ()=>{
    let boxtext = document.getElementsByClassName("boxtext");
    let wins = [
        [0,1,2,5,5,0],
        [3,4,5,5,15,0],
        [6,7,8,5,25,0],
        [0,3,6,-5,15,90],
        [1,4,7 , 5, 15, 90],
        [2,5,8,15,15,90],
        [0,4,8,0,15,45],
        [2,4,6,0,15,135]
    ]
    wins.forEach((e)=>{
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")){
            document.getElementsByClassName('info')[0].innerText = boxtext[e[0]].innerText + " Won";
            game_over = true;
            gameover.play();
            // document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "150px";
            document.querySelector(".imgbox").innerHTML ='<img src="giphy.webp" alt=""/>';
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            if(e[5] === 45 || e[5] === 135){
                document.querySelector(".line").style.width = "30vw";
            }
            else{
                document.querySelector(".line").style.width = "20vw";
            }
        }
    })
}

// // Game logic
// // music.play();

// add click listener to reset btn
reset.addEventListener("click",()=>{
    socket.emit("reset",true);
    gameReset();
}) 

function gameReset(){
    let boxtexts = document.querySelectorAll(".boxtext");
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
        document.querySelector(".imgbox").innerHTML ='';
        turn = "X";
        game_over = false;
        document.getElementsByClassName("info")[0].innerText = "Turn For "+ turn;
        document.querySelector(".line").style.width = "0vw";
    });
}