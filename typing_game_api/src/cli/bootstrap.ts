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
  const io: SocketServer = new SocketServer(server);

  let rooms: { [key: string]: { creator: string; users: string[] } } = {};

  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // socket.on("join_room", (room, username) => {
    //   console.log(`joined user: ${username}`);
    //   if (rooms[room] && rooms[room].users.includes(username)) {
    //     io.to(socket.id).emit("already_inside_room", "You are already inside the room.");
    //   } else {
    //     socket.join(room);

    //     console.log(`user with ID: ${socket.id} joined room: ${room}`);

    //     if (!rooms[room]) {
    //       rooms[room] = { creator: username, users: [] };
    //       console.log(`rooms---> ${JSON.stringify(rooms)}`)
    //     } else {
    //       rooms[room].users.push(username);
    //     }

    //     io.to(room).emit("user_joined", rooms[room].users);
    //   }
    // });

    socket.on("join_room", (room, username) => {
      io.to(room).emit("user_data", rooms, room);
      console.log(`joined user: ${username}`);
      if (rooms[room] && rooms[room].users.includes(username)) {
        io.to(socket.id).emit("already_inside_room", "You are already inside the room.");
      } else {
        socket.join(room);

        console.log(`user with ID: ${socket.id} joined room: ${room}`);

        if (!rooms[room]) {
          rooms[room] = { creator: username, users: [username] };
          io.to(room).emit("user_data", rooms, room);

          console.log(`rooms---> ${JSON.stringify(rooms)}`);
        } else {
          rooms[room].users.push(username);
        }

        io.to(room).emit("user_joined", rooms[room].users);
      }
    });
    socket.on("start_match", (room) => {
      console.log("this side is backedn", room);
      // Assuming you have an event to start the match
      // Broadcast typing progress of each user in the room
      socket.on("typing_progress", (progress) => {
        console.log("this is typing", progress);
        io.to(room).emit("typing_progress_update", { username: progress.username, wpm: progress.wpm });
      });
    });
    socket.on("leave_room", (room, username) => {
      console.log("leave", rooms);
      if (rooms[room]) {
        rooms[room].users = rooms[room].users.filter((name) => name !== username);
        io.to(room).emit("user_left", rooms[room].users);
      }
    });

    socket.on("send_message", (messageData, room) => {
      console.log('this is sendmessage,', messageData, room);
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

    socket.on('clear_rooms', ()=>{
      // delete rooms;
      for (const room in rooms) {
        if (rooms[room].users.includes(socket.id)) {
            // Remove the socket ID from the users array
            rooms[room].users = rooms[room].users.filter((id) => id !== socket.id);
            // Emit a message to inform other users in the room that a user has left
            io.to(room).emit("user_left", rooms[room].users);
        }
    }
      // rooms={}
      console.log('rooms cleared', rooms)
      // rooms.forEach((room) =>rooms.creator="", rooms.delete(room);
    })
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
