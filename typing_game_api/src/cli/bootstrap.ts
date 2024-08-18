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

  interface UserProgress {
    username: string;
    wpm: string;
    completePercentage: string;
    id: string;
  }

  console.log(rooms, "this is rooms-->");
  // Initialize typingProgress as an array of UserProgress objects
  let typingProgress: UserProgress[] = [];

  io.on("connection", (socket) => {
    // console.log(`User Connected: ${socket.id}`);
    socket.on("join_room", (room, username) => {
      console.log("this is being called---->", username, room);
      io.to(room).emit("user_data", rooms, room);
      console.log(`joined user: ${username}`);
      if (rooms[room] && rooms[room].users.includes(username)) {
        io.to(socket.id).emit("already_inside_room", "You are already inside the room.");
      } else {
        socket.join(room);
        // io.to(room).emit("user_data", rooms, room);
        console.log(`user with ID: ${socket.id} joined room: ${room}`, username);

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
    socket.on("checkRoom", (roomId) => {
      if (!rooms[roomId]) {
        io.to(socket.id).emit("no_room_found", "No room found");
      } else {
        io.to(socket.id).emit("room_found", "Room found");
      }
    });

    socket.on("restart", (roomId) => {
      io.to(roomId).emit("restartStats");
    });

    socket.on("start_match", (room) => {
      io.to(room).emit("checkworking", "hello");
      io.to(room).emit("redirect");

      // Store typing progress for each user in the room

      // Emit match text to the specified room
      socket.on("match_text", (matchData) => {
        try {
          let matchTextData = {
            matchText: matchData.matchText,
            id: matchData.id,
            rooms: rooms,
          };

          socket.on("random_page_data", () => {
            io.to(room).emit("typing_text_data", matchTextData);
          });

          console.log("Typing text data emitted to room:", room);
        } catch (error) {
          console.error("Error emitting typing text data:", error);
        }
      });

      // Handle typing progress

      // Handle disconnect
      // socket.on("disconnect", () => {
      //   // Remove user's typing progress when they disconnect
      //   Object.keys(typingProgress).forEach((username) => {
      //     if (typingProgress[username].socketId === socket.id) {
      //       delete typingProgress[username];
      //     }
      //   });
      //   // Emit updated typing progress to all clients in the room
      //   console.log(typingProgress, "this is typing progress-->");
      //   io.to(room).emit("typing_progress_update", typingProgress);
      // });
    });
    // Define UserProgress type

    // Listen for typing progress updates from clients
    socket.on("typing_progress", (progress: UserProgress) => {
      console.log("this is being called typing_progress--->>>------------>", progress);
      // Check if the user is already in the typingProgress array
      const existingUserIndex = typingProgress.findIndex((user) => user.username === progress.username);
      console.log({ existingUserIndex });
      if (existingUserIndex !== -1) {
        // Update existing user progress
        typingProgress[existingUserIndex] = progress;
      } else {
        // Add new user progress
        typingProgress.push(progress);
      }

      // Emit updated typing progress to all clients in the room
      io.to(progress.id).emit("typing_progress_update", typingProgress);
    });
    

    socket.on("leave_room", (room, username) => {
      console.log("leave", rooms);
      if (rooms[room]) {
        rooms[room].users = rooms[room].users.filter((name) => name !== username);
        io.to(room).emit("user_left", rooms[room].users);
      }
    });

    socket.on("send_message", (messageData, room) => {
      console.log(rooms, "this is rooms message-->");
      socket.to(room).emit("receive_message", messageData);
    });

    socket.emit("user_data", rooms);

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);

      for (const room in rooms) {
        if (rooms[room].users.includes(socket.id)) {
          rooms[room].users = rooms[room].users.filter((id) => id !== socket.id);
          io.to(room).emit("user_left", rooms[room].users);
        }
      }
    });

    socket.on("clear_rooms", () => {
      // delete rooms;
      for (const room in rooms) {
        if (rooms[room].users.includes(socket.id)) {
          // Remove the socket ID from the users array
          rooms[room].users = rooms[room].users.filter((id) => id !== socket.id);
          // Emit a message to inform other users in the room that a user has left
          io.to(room).emit("user_left", rooms[room].users);
        }
      }
      rooms = {};
      // rooms.forEach((room) =>rooms.creator="", rooms.delete(room);
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
