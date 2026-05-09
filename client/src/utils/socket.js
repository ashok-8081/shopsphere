import { io } from "socket.io-client";

const socket = io("https://shopsphere-backend-ljzg.onrender.com", {
  autoConnect: false,
});

export default socket;
