import express from "express";

export function BeforeEach(req: express.Request) {
  req.body = {
    ...req.body,
    ...req.query,
  };
  console.log("Path:", req.path);
  if (req.body.debug) {
    console.log("Body:", req.body);
  }
}

export function AfterEach(req: express.Request, _: express.Response, resBody: any) {
  if (req.body.debug) {
    console.log("Res:", resBody, "\n");
  }
}
