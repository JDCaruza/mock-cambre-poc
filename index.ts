import WebSocket from "ws";
let numero = 0;
async function delayFunc(): Promise<void> {
    while(1){
        await new Promise(resolve => setTimeout(resolve, 2000));
        // Espera 5 segundos
        numero = numeroRandom();

        console.log(numero);
    }
}

function numeroRandom(): number {
    return Math.floor(Math.random() * 401); // Genera un número aleatorio entre 0 y 400
  }

// Initialize WebSocket server
const wss = new WebSocket.Server({ port: 8000 });

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
