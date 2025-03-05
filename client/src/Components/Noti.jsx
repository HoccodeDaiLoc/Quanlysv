import { useEffect } from "react";
import { io } from "socket.io-client";

function Notifycation() {
  useEffect(() => {
    const socket = io("https://localhost:8080");
  }, []);
  return <></>;
}

export default Notifycation;
