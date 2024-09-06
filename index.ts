import Express from "express";
import WebSocket from "ws";
const App = Express();
let numero = 0;
async function delayFunc(): Promise<void> {
    while(1){
        await new Promise(resolve => setTimeout(resolve, 2000));
        // Espera 5 segundos
        numero = numeroRandom();

        console.log(numero);
    }
}

App.get("/", (req, res)=>{
   return res.status(200).json({mensaje: "prueba"});
});

function numeroRandom(): number {
    return Math.floor(Math.random() * 401); // Genera un número aleatorio entre 0 y 400
  }
//App.listen(3000, "", () =>{console.log("funcionando")});

// Initialize WebSocket server
const wss = new WebSocket.Server({ port: 8080 , path: '/Maquina' });

// WebSocket event handling
wss.on('connection', (ws) => {
  console.log('A new client connected.');

  // Event listener for incoming messages
  ws.on('message', (message) => {
    console.log('Received message:', "Dame el número!");

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(numero);
      }
    });
  });

  // Event listener for client disconnection
  ws.on('close', () => {
    console.log('A client disconnected.');
  });
});

// Start the server
const port = 3000;
App.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
  delayFunc();
});
