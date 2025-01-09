import express from "express";
import cors from "cors";
import handlers from "./handlers";
import { AfterEach, BeforeEach } from "./middleware";

const app = express();

// #################### Middleware ####################
app.use(express.json());
app.use(cors());

// Add hooks to execute code before and after each request
app.use((req, res, next) => {
  BeforeEach(req);
  let oldSend = res.send;
  res.send = function (body: any) {
    AfterEach(req, res, body);
    return oldSend.call(this, body);
  };
  next();
});

// #################### Routes ####################
app.get("/test", handlers.Test);

export default app;
