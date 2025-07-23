import { config } from "dotenv";
config();

export const dotEnv = {
  port: process.env.PORT,
  dbName: process.env.DB_NAME,
  dbUserName: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbDialect: process.env.DB_DIALECT,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
};
