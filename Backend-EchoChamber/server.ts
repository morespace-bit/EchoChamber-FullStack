import { dotEnv } from "./src/config/config";
import "./src/database/connection";

import app from "./src/app";

const serverRun = () => {
  app.listen(dotEnv.port, () => {
    console.log(`The server is running on the port ${dotEnv.port}`);
  });
};

serverRun();
