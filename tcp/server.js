import net from 'net'
import {PORT, HOST} from '../utils.js'

const server = net.createServer(socket => {
  const { remoteAddress, remotePort } = socket

  socket.on('data', data => {
    const str = data.toString().toUpperCase()

    socket.write(str)
  })

  socket.on('close', data => {
    console.log('server close');
  })

})

server.listen(PORT, HOST)