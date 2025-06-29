import express, { Response, Request } from "express";

const app = express();
import authRoute from "./routes/auth.route";

// this is done so that our express app can parse the incomming data that comes in the json format
app.use(express.json());

// app.use("/home", (req: Request, res: Response) => {
//   res.send("Hello");
// });
app.use("/api", authRoute);

export default app;
