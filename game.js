
const socket = io();
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let player = { x:400, y:250 };
let players = {};

document.addEventListener("mousemove", (e)=>{
    player.x = e.clientX - canvas.offsetLeft;
    player.y = e.clientY - canvas.offsetTop;

    socket.emit("move", player);
});

socket.on("state", (serverPlayers)=>{
    players = serverPlayers;
});

function loop(){
    ctx.clearRect(0,0,800,500);

    for(let id in players){
        let p = players[id];
        ctx.fillStyle = id === socket.id ? "red" : "white";
        ctx.fillRect(p.x-10, p.y-10, 20, 20);
    }

    requestAnimationFrame(loop);
}

loop();
