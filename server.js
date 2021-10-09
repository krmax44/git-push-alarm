import Fastify from 'fastify';
import websocket from 'fastify-websocket';

const app = Fastify();
app.register(websocket);

const connections = new Set();

app.get('/alarm', (request, reply) => {
  console.log('alarm');

  for (const connection of connections) {
    connection.socket.send('push!');
  }

  reply.send('ok');
});

app.get('/socket', { websocket: true }, connection => {
  connections.add(connection);

  connection.socket.on('message', () => {
    connection.socket.send('pong');
  });

  connection.on('close', () => connections.delete(connection));
});

app.listen(3000 || process.env.PORT);
