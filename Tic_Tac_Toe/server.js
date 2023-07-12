const { Socket } = require('engine.io');
const express = require('express');   // importing express
const app = express();               // storing express
const http = require('http').createServer(app);     // importing http and creating server using express

const PORT = process.env.PORT || 3000 ;   // storing port number either enviroment port or 3000

let online_users = 0;
let turn = "X";

http.listen(PORT, () => {                  // listen request at given port
    console.log(`Listing on port ${PORT}`);
})

app.use(express.static(__dirname + "/public"));     // node express will know about other resource like css js and imgs

app.get('/', (req,res)=>{              // '/' is used to denote webpage if ask for any requests then 
    // res.send('hello world');           // req means request and res means responce (as a responce send hello world to webpage)
    res.sendFile(__dirname + "/index.html");           // sending index.html at port
});


// Socket.io

const io = require('socket.io')(http);          // importing socket.io and using it in http server

io.on("connection",(socket)=>{
    console.log("user Joined"); 
    online_users++;
    if(online_users==2){
        console.log("playersready");
        socket.emit("playersReady",true);
        socket.broadcast.emit("playersReady",true);
    }

    console.log(online_users);
 
    socket.on("move",(id,turn)=>{
        console.log(id);
        socket.broadcast.emit("playerMove",id,turn);
    })

   socket.on("reset",(t)=>{
    socket.broadcast.emit("doReset",true);
   })



    socket.on('disconnect',()=>{
        online_users--;
    });

});










