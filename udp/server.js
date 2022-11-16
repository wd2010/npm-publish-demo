import dgram from "dgram";
import {PORT, HOST} from '../utils.js';

const socket = dgram.createSocket("udp4");

socket.on("message", (msg, info) => {
  const str = msg.toString().toUpperCase()
  const { address, port } = info
  socket.send(str, port, address)
});

socket.on("listening", () => {
  const address = socket.address();
  console.log(
    "UDP Server listening on " + address.address + ":" + address.port
  );
});
socket.bind(PORT, HOST);
