import dgram from 'dgram'
import inquirer from 'inquirer'
import {PORT, HOST, rl} from '../utils.js';



const socket = dgram.createSocket('udp4')


socket.on('message', (msg, info) => {
  console.log('收到msg:',msg.toString());
})

let answer = ''

while(answer = await rl.question('')) {

  socket.send(answer, PORT, HOST)
}




