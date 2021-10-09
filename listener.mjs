import WebSocket from 'ws';
import { spawn } from 'child_process';

const start = () => {
  const ws = new WebSocket(process.env.SERVER);
  ws.on('open', () => console.log('connected!'));

  ws.on('message', function incoming(message) {
    console.log('received', message.toString('utf-8'));
    spawn('play', ['./alarm.wav']);
  });

  ws.on('close', () => {
    console.log('disconected...');
    start();
  });
};

start();
