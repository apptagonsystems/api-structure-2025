import express, { Application, Express, Request, Response } from "express";
import cors from "cors";

import { createServer } from "http";

// LOGGING
import logger from "./utils/logger";
import morgan from "morgan";
import router from "./routes";
import { errorMiddleware } from "./middleware/error.middleware";
import { PORT } from "./utils/secrets";
import { connectDatabase } from "./config/database";

import {prisma} from "./utils/prisma";
import { configureSocket } from "./socket/configureSocket";
import authMiddleware from "./middleware/auth.middleware";

const morganFormat = ":method :url :status :response-time ms";


// Initialize Express and HTTP server
const app:Application = express();
const server = createServer(app);

// Cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// LOGGING
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// Routes
app.use("/api", router);

// Configure Socket.IO
const io = configureSocket(server);

app.set("io", io); // using set method to mount the `io` instance on the app to avoid usage of `global`

// Error handling
// app.use(authMiddleware);
app.use(errorMiddleware);


// Database connection
connectDatabase()
  .catch((error) => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});



server.listen(PORT, () => {console.log("Server is running on port 3000")});

