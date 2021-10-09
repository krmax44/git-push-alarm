import WebSocket from 'ws';
import { spawn } from 'child_process';

const ws = new WebSocket(process.env.SERVER);

ws.on('open', () => console.log('connected!'));

ws.on('message', function incoming(message) {
  console.log('received', message);
  spawn('play', ['./alarm.wav']);
});
