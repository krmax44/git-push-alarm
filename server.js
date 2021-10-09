const Fastify = require('fastify');
const app = Fastify();
app.register(require('fastify-websocket'));

const connections = new Set();

app.all('/alarm', (request, reply) => {
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

app.listen(process.env.PORT || 3000).then(console.log);
