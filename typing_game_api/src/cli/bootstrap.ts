import { Server, type ServerOptions } from "http";

import express, { type Application, type Router } from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import { Socket, Server as SocketServer } from "socket.io";

import { authenticate } from "../middlewares";
import urlpatterns from "../routes";
import { MONGO_URI } from "../settings";

export function getRequestListener(): Application {
  const application: Application = express();
  application.use(helmet());
  application.use(express.urlencoded({ extended: true }));
  application.use(express.json());
  application.use(morgan("combined"));
  application.use(authenticate);

  urlpatterns.forEach((router: Router, prefix: string) => {
    application.use(prefix, router);
  });

  return application;
}

export function createSocketConnection(server: Server) {
  console.log("This is being called");
  const io: SocketServer = new SocketServer(server);

  const rooms: { [key: string]: { creator: string; users: string[] } } = {};

  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (room, username) => {
      if (rooms[room] && rooms[room].users.includes(username)) {
        io.to(socket.id).emit("already_inside_room", "You are already inside the room.");
      } else {
        socket.join(room);
        console.log("this is being called", rooms);

        console.log(`user with ID: ${socket.id} joined room: ${room}`);

        if (!rooms[room]) {
          rooms[room] = { creator: username, users: [username] };
        } else {
          rooms[room].users.push(username);
        }

        io.to(room).emit("user_joined", rooms[room].users);
      }
    });

    socket.on("leave_room", (room, username) => {
      console.log("leave", rooms);
      if (rooms[room]) {
        rooms[room].users = rooms[room].users.filter((name) => name !== username);
        io.to(room).emit("user_left", rooms[room].users);
      }
    });

    socket.on("send_message", (messageData, room) => {
      socket.to(room).emit("receive_message", messageData);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);

      for (const room in rooms) {
        if (rooms[room].users.includes(socket.id)) {
          rooms[room].users = rooms[room].users.filter((id) => id !== socket.id);
          io.to(room).emit("user_left", rooms[room].users);
        }
      }
    });
  });
}

export default async function bootstrap(port: number, host: string): Promise<void> {
  const requestListener: Application = getRequestListener();

  const options: ServerOptions = {};
  const server: Server = new Server(options, requestListener);

  await mongoose.connect(MONGO_URI);
  server.listen(port, host, () => {
    console.log(server.address());
  });
  createSocketConnection(server);
}
