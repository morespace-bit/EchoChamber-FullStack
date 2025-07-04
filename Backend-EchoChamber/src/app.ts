import express, { Response, Request } from "express";

const app = express();
import authRoute from "./routes/auth.route";
import profileRoute from "./routes/profile.route";
import postRoute from "./routes/post.route";
import likeRoute from "./routes/like.route";
import cors from "cors";
// this is the cors function mean cross origin resource sharing a browser mechanism to prevent resource shareing to different webpages
// so to make it work we have to use this

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// this is done so that our express app can parse the incomming data that comes in the json format
app.use(express.json());

// app.use("/home", (req: Request, res: Response) => {
//   res.send("Hello");
// });

app.use("/api", authRoute);
app.use("/api", profileRoute);
app.use("/api", postRoute);
app.use("/api", likeRoute);
export default app;
