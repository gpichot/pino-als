import express from "express";
import logger from "./logger";

const app = express();

let requestCounter = 0;

app.use((req, _res, next) => {
  req.requestId = crypto.randomUUID();
  req.requestNumber = ++requestCounter;

  next();
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const callDb = async () => {
  await sleep(200);
  logger.info("DB call");
};
const callMs = async () => {
  await sleep(200);
  logger.info("MS call");
};

app.get("/", async (req, res) => {
  const f = req.requestNumber % 2 === 0 ? 1 : 2;

  await callDb();

  await sleep(f * 400);

  await callMs();

  logger.info(
    { requestId: req.requestId, requestNumber: req.requestNumber },
    "Request finished",
  );
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
