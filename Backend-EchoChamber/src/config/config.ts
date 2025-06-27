import { config } from "dotenv";
config();

export const dotEnv = {
  port: process.env.PORT,
};
