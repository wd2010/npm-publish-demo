import net from 'net'
import {PORT, HOST, rl} from '../utils.js';

const client = new net.Socket()

client.connect(PORT, HOST, async () => {
  let input = ''

  while(input = await rl.question('')) {
    client.write(input)
  }
})

client.on('data', data => {
  console.log(data.toString());
})

client.on('close', () => {
  console.log('client close');
})