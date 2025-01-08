import express from "express";

function Test(_: express.Request, res: express.Response) {
  res.send("Hello World!");
}

export default {
  Test,
};
