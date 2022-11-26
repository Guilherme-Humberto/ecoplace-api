import "dotenv/config";

import express from "express";
import morgan from "morgan";
import cors from "cors";
import { router } from "./routes";

class Application {
  public readonly express: express.Application;

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  private routes() {
    this.express.use("/", router);
  }

  private middlewares() {
    this.express.use(express.json());
    this.express.use(morgan("dev"));
    this.express.use(cors());
  }
}

export default new Application();
