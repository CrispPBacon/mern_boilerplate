import "./config/environment.js";

import express from "express";
import cors from "cors";
import session from "express-session";

import { connect } from "./config/db.js";
import { corsConfig } from "./config/cors.js";
import { sessionConfig, sessionLog } from "./config/session.js";
import { errorHandlerMiddleware } from "./middlewares/error-handler.js";

import router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

// ? EXPRESS MIDDLEWARES SETUP ? //
app.use([
  express.json(),
  express.urlencoded({ extended: true }),
  cors(corsConfig),
  session(sessionConfig),
  sessionLog,
  router,
  errorHandlerMiddleware,
]);

// app.use("/api", router, errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server listening at http://${HOST}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV.toUpperCase()}`);
  connect();
});
